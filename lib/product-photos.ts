import assets from "./product-photo-assets.json";

export interface ProductPhotoAsset {
  productId: string;
  color: string;
  path: string;
  sourceUrl: string;
  width: number;
  height: number;
  sha256: string;
}

export const productPhotoAssets: readonly ProductPhotoAsset[] = assets;
const photos = new Map(productPhotoAssets.map((asset) => [`${asset.productId}:${asset.color}`, asset.path]));

// Exact model AND finish matching. Never borrow an image from another finish,
// another screen size, or a related model. Empty means an honest unavailable state.
export function productPhoto(productId: string, color: string): string {
  return photos.get(`${productId}:${color}`) ?? "";
}
export const phonePhotos = {
  Burgundy: productPhoto("iphone-18-pro", "Burgundy"),
  Black: productPhoto("iphone-18-pro", "Black"),
  Silver: productPhoto("iphone-18-pro", "Silver"),
  Glacier: productPhoto("iphone-18-pro", "Glacier"),
};
export const airPhotos = {
  "Sky Blue": productPhoto("macbook-air-13-m5", "Sky Blue"),
  Midnight: productPhoto("macbook-air-13-m5", "Midnight"),
  Starlight: productPhoto("macbook-air-13-m5", "Starlight"),
  Silver: productPhoto("macbook-air-13-m5", "Silver"),
};
