import assert from "node:assert/strict";
import test from "node:test";
import { products, getProduct, phoneColors } from "../lib/catalog";
import { priceCheckout, validateCheckout, stripeLineItems } from "../lib/checkout";

const details = {
  customer: { name: "Variant Customer", email: "variants@example.com", phone: "+994501234567" },
  address: { line1: "Nizami Street 10", city: "Baku", country: "AZ" },
};
test("every Pro storage/color SKU keeps the merchant price through payment", () => {
  assert.deepEqual(phoneColors.map((c) => c.name).sort(), ["Black", "Burgundy", "Glacier", "Silver"]);
  for (const id of ["iphone-18-pro", "iphone-18-pro-max"]) {
    for (let c = 0; c < phoneColors.length; c++) {
      for (let s = 0; s < 2; s++) {
        const sku = `${id}--${s}--${c}`;
        const product = getProduct(sku)!;
        assert.match(product.subtitle, new RegExp(phoneColors[c].name));
        assert.equal(product.image, phoneColors[c].image);
        assert.equal(product.registration, "QEYDIYYATSIZ");
        if (id === "iphone-18-pro-max" && s === 0) {
          assert.equal(product.available, false);
          assert.throws(() => validateCheckout({ ...details, items: [{ id: sku, quantity: 1 }] }), /no longer available/);
          assert.throws(() => priceCheckout({ items: [{ id: sku, quantity: 1 }] }, {}), /no longer available/);
        } else {
          const expected = id === "iphone-18-pro-max" ? 2179 : s === 0 ? 1874 : 1950;
          const quote = priceCheckout(validateCheckout({ ...details, items: [{ id: sku, quantity: 1, price: 1 }] }), {});
          assert.equal(quote.subtotal, expected);
          assert.equal(stripeLineItems(quote.items)[0].price_data?.unit_amount, expected * 100);
          assert.equal(quote.items[0].product.id, sku);
        }
      }
    }
  }
});
test("invalid variants cannot silently fall back to a different product", () => {
  for (const id of ["iphone-18-pro--9--0", "iphone-18-pro--0--9", "iphone-18-pro--00--0", "missing--0--0"]) assert.equal(getProduct(id), undefined);
});
test("Dyson costs 489 AZN and rejects quantities above four on the server", () => {
  assert.equal(getProduct("dyson-hair-dryer")?.price, 489);
  const input = { ...details, items: [{ id: "dyson-hair-dryer", quantity: 4 }] };
  assert.equal(priceCheckout(validateCheckout(input), {}).subtotal, 1956);
  assert.throws(() => validateCheckout({ ...input, items: [{ id: "dyson-hair-dryer", quantity: 5 }] }));
  assert.throws(() => priceCheckout({ items: [{ id: "dyson-hair-dryer", quantity: 5 }] }, {}));
});
test("sale prices are exactly half the previous catalog price, including minor units", () => {
  const sale = products.filter((p) => p.originalPrice);
  assert.equal(sale.length, 6);
  for (const product of sale) {
    assert.equal(product.price * 2, product.originalPrice);
    const line = stripeLineItems([{ product, quantity: 1 }])[0];
    assert.equal(line.price_data?.unit_amount, Math.round(product.price * 100));
  }
});
