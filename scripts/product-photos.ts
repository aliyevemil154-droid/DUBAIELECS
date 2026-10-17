import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";
import { products } from "../lib/catalog";
import { productPhotoAssets, type ProductPhotoAsset } from "../lib/product-photos";

// Downloads use curl's normal proxy/CA configuration. No proxy overrides,
// disabled TLS verification, alternate relays, or network-policy workarounds.
const officialHosts = new Set([
  "www.apple.com", "store.storeimages.cdn-apple.com", "images.samsung.com",
  "www.samsung.com", "dyson-h.assetsadobe2.com", "www.dyson.com",
  "gmedia.playstation.com", "www.playstation.com", "compass-ssl.xboxlive.com",
  "cdn-dynmedia-1.microsoft.com",
]);
const args = process.argv.slice(2);
const command = args.shift();
function option(name: string) {
  const index = args.indexOf(`--${name}`);
  if (index < 0 || !args[index + 1]) throw new Error(`Missing --${name}`);
  return args[index + 1];
}
function sourceUrl() {
  const url = new URL(option("source"));
  if (url.protocol !== "https:" || url.username || url.password || !officialHosts.has(url.hostname)) throw new Error("Use an original HTTPS manufacturer image URL from an approved host.");
  return url.toString();
}
function selectedFinish() {
  const product = products.find((item) => item.id === option("product"));
  const color = product?.colors.find((finish) => finish.name === option("color"));
  if (!product || !color) throw new Error("The product and exact color must exist in the catalog.");
  return { product, color, filename: `${product.id}-${color.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` };
}
async function inspect(buffer: Buffer) {
  const metadata = await sharp(buffer).metadata();
  if (!metadata.hasAlpha || !["png", "webp", "avif"].includes(metadata.format ?? "")) throw new Error("A genuine transparent PNG, WebP, or AVIF cutout is required; a CSS or format change cannot remove an embedded background.");
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let transparent = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] === 0) transparent++;
  if (transparent < info.width * info.height * .03) throw new Error("This asset has no meaningful transparent background. Replace the source photo.");
  // Fully opaque rectangular backdrops are rejected before any padding is added.
  const corners = [0, info.width - 1, (info.height - 1) * info.width, info.width * info.height - 1];
  if (corners.some((pixel) => data[pixel * 4 + 3] !== 0)) throw new Error("The source touches the image boundary. Review for cropping or an embedded background.");
  return { width: info.width, height: info.height };
}

async function main() {
  if (command === "audit") {
    const pending: { product: string; color: string }[] = [];
    const keys = new Set<string>();
    const paths = new Set<string>();
    for (const asset of productPhotoAssets) {
      const key = `${asset.productId}:${asset.color}`;
      if (keys.has(key)) throw new Error(`Duplicate photo mapping: ${key}`);
      keys.add(key);
      if (paths.has(asset.path)) throw new Error(`A photo cannot be shared across different model/finish mappings: ${asset.path}`);
      paths.add(asset.path);
      const product = products.find((item) => item.id === asset.productId);
      if (!product?.colors.some((color) => color.name === asset.color)) throw new Error(`Unknown photo mapping: ${key}`);
      if (!/^\/images\/products\/[a-z0-9-]+\.webp$/.test(asset.path)) throw new Error(`Invalid local asset path: ${asset.path}`);
      const buffer = await readFile(path.join("public", asset.path));
      const dimensions = await inspect(buffer);
      if (dimensions.width !== asset.width || dimensions.height !== asset.height) throw new Error(`Incorrect dimensions: ${key}`);
      if (createHash("sha256").update(buffer).digest("hex") !== asset.sha256) throw new Error(`Changed image requires re-review: ${key}`);
    }
    for (const product of products) for (const color of product.colors) if (!keys.has(`${product.id}:${color.name}`)) pending.push({ product: product.name, color: color.name });
    console.log(JSON.stringify({ approvedLocalPhotos: keys.size, pendingPhotos: pending.length, pending }, null, 2));
    if (args.includes("--strict") && pending.length) process.exitCode = 1;
    return;
  }
  if (command !== "download" && command !== "approve") throw new Error("Use audit [--strict], download, or approve. See docs/product-photography.md.");
  const { product, color, filename } = selectedFinish();
  const source = sourceUrl();
  if (command === "download") {
    const directory = "work/photo-review";
    await mkdir(directory, { recursive: true });
    const file = `${directory}/${filename}.source`;
    const response = spawnSync("curl", ["--fail", "--silent", "--show-error", "--location", "--proto", "=https", "--proto-redir", "=https", "--max-time", "40", "--max-filesize", "15728640", "--output", file, source], { encoding: "utf8", maxBuffer: 1024 * 1024 });
    if (response.error || response.status !== 0) throw new Error(`Download failed. Check the cloud allowlist for ${new URL(source).hostname}. ${response.stderr || response.error?.message || ""}`);
    const dimensions = await inspect(await readFile(file));
    console.log(`Staged ${product.name} / ${color.name}: ${file} (${dimensions.width} × ${dimensions.height}). Visually inspect the exact model, finish, entire outline, and background before approval.`);
    return;
  }
  if (!args.includes("--reviewed")) throw new Error("Visually inspect the source and supply --reviewed only after confirming its exact model/color, complete outline, and transparent background.");
  const input = await readFile(option("file"));
  const dimensions = await inspect(input);
  if (Math.max(dimensions.width, dimensions.height) < 1000) throw new Error("Use a source at least 1000 pixels on its longest side.");
  // Trim only fully transparent padding, preserve every subject pixel, and use
  // identical centered geometry. No tint, blend, background removal, or crop.
  const buffer = await sharp(input).trim({ background: "#00000000", threshold: 0 })
    .resize(1020, 1020, { fit: "contain", background: "#00000000" })
    .extend({ top: 90, bottom: 90, left: 90, right: 90, background: "#00000000" })
    .webp({ lossless: true }).toBuffer();
  const destination = `/images/products/${filename}.webp`;
  await mkdir("public/images/products", { recursive: true });
  await writeFile(`public${destination}`, buffer);
  const asset: ProductPhotoAsset = { productId: product.id, color: color.name, path: destination, sourceUrl: source, width: 1200, height: 1200, sha256: createHash("sha256").update(buffer).digest("hex") };
  const existing: ProductPhotoAsset[] = JSON.parse(await readFile("lib/product-photo-assets.json", "utf8"));
  const updated = existing.filter((item) => item.productId !== product.id || item.color !== color.name);
  updated.push(asset);
  await writeFile("lib/product-photo-assets.json", JSON.stringify(updated, null, 2) + "\n");
  console.log(`Approved local photo: ${destination}. Run npm run photos:audit and rebuild the frontend.`);
}
main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
