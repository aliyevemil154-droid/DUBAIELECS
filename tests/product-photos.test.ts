import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import baseline from "./fixtures/catalog-commercial.json";
import { products, variantProduct, type Product } from "../lib/catalog";
import { productPhoto, productPhotoAssets } from "../lib/product-photos";

test("the image refactor preserves every product's commercial information", () => {
  const commercial = products.map((product) => Object.fromEntries(Object.entries(product)
    .filter(([key]) => !["image", "photoNote"].includes(key))
    .map(([key, value]) => [key, key === "colors" ? product.colors.map(({ image: _image, ...color }) => color) : value])));
  assert.deepEqual(commercial, baseline);
});

test("every product and finish resolves exclusively to an exact local photo or an explicit absence", () => {
  const keys = new Set<string>();
  const paths = new Set<string>();
  for (const asset of productPhotoAssets) {
    const key = `${asset.productId}:${asset.color}`;
    assert(!keys.has(key), `Duplicate mapping: ${key}`);
    keys.add(key);
    assert(!paths.has(asset.path), `Photo shared across different model/finish mappings: ${asset.path}`);
    paths.add(asset.path);
    assert.match(asset.path, /^\/images\/products\/[a-z0-9-]+\.webp$/);
    const product = products.find((item) => item.id === asset.productId);
    assert(product?.colors.some((color) => color.name === asset.color), key);
  }
  for (const product of products) {
    assert.equal(product.image, productPhoto(product.id, product.colors[0].name));
    for (const [index, color] of product.colors.entries()) {
      const image = productPhoto(product.id, color.name);
      assert.equal(color.image, image);
      const variant = variantProduct(product, Math.max(0, product.storage?.findIndex((storage) => storage.available) ?? 0), index);
      assert.equal(variant.image, image, `${product.name} / ${color.name}`);
      assert(!image || image.startsWith("/images/products/"), "No remote image dependency at runtime");
    }
  }
  assert.equal(productPhoto("iphone-18-pro-max", "Not a real finish"), "");
});

test("a missing variant image cannot fall back to the default color", () => {
  const product: Product = { ...products[0], image: "/red.webp", colors: [{ name: "Red", value: "#f00", image: "/red.webp" }, { name: "Blue", value: "#00f" }] };
  assert.equal(variantProduct(product, 0, 1).image, "");
  assert.equal(variantProduct({ ...product, storage: undefined }, 0, 1).image, "");
  assert.equal(variantProduct(product, 0, 0).image, "/red.webp");
});

test("every approved bundled asset has intact transparency, centered padding, and an unchanged digest", async () => {
  assert(productPhotoAssets.length > 0);
  for (const asset of productPhotoAssets) {
    const buffer = await readFile(path.join("public", asset.path));
    assert.equal(createHash("sha256").update(buffer).digest("hex"), asset.sha256, asset.path);
    const metadata = await sharp(buffer).metadata();
    assert.equal(metadata.hasAlpha, true, asset.path);
    assert.equal(metadata.width, asset.width);
    assert.equal(metadata.height, asset.height);
    assert.equal(asset.width, asset.height);
    assert(asset.width >= 640);
    const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let left = info.width, right = 0, top = info.height, bottom = 0;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
      const alpha = data[(y * info.width + x) * 4 + 3];
      if (alpha) { left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y); }
      const margin = Math.floor(info.width / 16);
      if (x < margin || y < margin || x >= info.width - margin || y >= info.height - margin) assert.equal(alpha, 0, `${asset.path}: product must clear every edge`);
    }
    assert(left < right && top < bottom);
    assert(Math.abs(left - (info.width - 1 - right)) <= 2, `${asset.path}: horizontally centered`);
    assert(Math.abs(top - (info.height - 1 - bottom)) <= 2, `${asset.path}: vertically centered`);
  }
});
