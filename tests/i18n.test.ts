import assert from "node:assert/strict";
import test from "node:test";
import ts from "typescript";
import fs from "node:fs";
import { isLanguage, languages, translate, translations } from "../lib/i18n";
import { categories, products } from "../lib/catalog";
import { documents } from "../lib/policies";

test("only the three supported language codes are accepted", () => {
  assert.deepEqual(
    languages.map((language) => language.value),
    ["az", "ru", "en"],
  );
  for (const value of ["az", "ru", "en"]) assert.equal(isLanguage(value), true);
  for (const value of [null, undefined, "aze", "AZ", "", {}, "<script>"])
    assert.equal(isLanguage(value), false);
});
test("all translation entries retain their interpolation values in Azerbaijani and Russian", () => {
  const tokens = (text: string) =>
    [...new Set(text.match(/\{\w+\}/g) || [])].sort();
  for (const [source, targets] of Object.entries(translations)) {
    for (const target of targets) {
      assert.ok(target.trim(), source);
      // A few languages omit the English item/items token in favor of a complete phrase.
      assert.deepEqual(
        tokens(target),
        tokens(source).filter((token) => token !== "{items}"),
        source,
      );
    }
  }
  assert.equal(
    translate("Shopping bag, {count} {items}", "az", {
      count: 2,
      items: "items",
    }),
    "Səbət, 2 məhsul",
  );
  assert.equal(
    translate("{product} added to your bag", "en", {
      product: "iPhone 18 Pro",
    }),
    "iPhone 18 Pro added to your bag",
  );
  assert.equal(translate("512 GB · Burgundy", "az"), "512 GB · Bordo");
  assert.equal(translate("512 GB · Glacier", "ru"), "512 GB · Ледниковый");
  assert.equal(translate("iPhone 18 Pro", "az"), "iPhone 18 Pro");
});
test("storefront control copy and all policy text have both translations", () => {
  const files = fs
    .readdirSync("components")
    .filter((name) => name.endsWith(".tsx"))
    .map((name) => `components/${name}`)
    .concat(["app/error.tsx", "app/not-found.tsx"]);
  const missing = new Set<string>();
  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(node: ts.Node) {
      if (
        ts.isCallExpression(node) &&
        node.expression.getText(source) === "t" &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        const key = node.arguments[0].text;
        if (!translations[key] && !["AZN ₼", "USD $", "AED"].includes(key))
          missing.add(key);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  for (const category of categories)
    if (!translations[category]) missing.add(category);
  for (const product of products) {
    for (const color of product.colors)
      if (!translations[color.name]) missing.add(color.name);
    for (const spec of product.specs)
      if (!translations[spec] && !/^(\d+ (GB|TB) SSD|Snapdragon)/.test(spec))
        missing.add(spec);
  }
  for (const document of Object.values(documents)) {
    for (const text of [
      document.title,
      document.intro,
      ...document.sections.flat(),
    ])
      if (!translations[text]) missing.add(text);
  }
  assert.deepEqual([...missing], []);
});
