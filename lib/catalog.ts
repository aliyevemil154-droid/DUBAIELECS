export const categories = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Gaming",
  "Hair care",
] as const;

export type ProductCategory = (typeof categories)[number];

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  colors: { name: string; value: string; image?: string }[];
  specs: string[];
  featured: boolean;
  registration?: "QEYDIYYATSIZ";
  available?: boolean;
  storage?: { name: string; price: number | null; available: boolean }[];
  illustration?: boolean;
  baseId?: string;
  stock?: number;
}

// Merchant prices in AZN. Official Pro colors verified against Apple Newsroom,
// September 9, 2026. Local SVGs are illustrative, not official product photographs.
// https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/
export const phoneColors = [
  { name: "Burgundy", value: "#722f46", image: "/images/phone-burgundy.svg" },
  { name: "Black", value: "#292c32", image: "/images/phone-black.svg" },
  { name: "Silver", value: "#c2c6cd", image: "/images/phone-silver.svg" },
  { name: "Glacier", value: "#d0e1e7", image: "/images/phone-glacier.svg" },
];

export const products: Product[] = [
  {
    id: "iphone-18-pro", name: "iPhone 18 Pro", subtitle: "256 GB · Burgundy",
    category: "Smartphones", price: 1874, image: phoneColors[0].image,
    badge: "New arrival", registration: "QEYDIYYATSIZ", colors: phoneColors,
    storage: [
      { name: "256 GB", price: 1874, available: true },
      { name: "512 GB", price: 1950, available: true },
    ],
    specs: ["Choose 256 GB or 512 GB", "Color preview follows your selection", "QEYDIYYATSIZ · Device registration not included"],
    featured: true, illustration: true,
  },
  {
    id: "iphone-18-pro-max", name: "iPhone 18 Pro Max", subtitle: "512 GB · Burgundy",
    category: "Smartphones", price: 2179, image: phoneColors[0].image,
    badge: "New arrival", registration: "QEYDIYYATSIZ", colors: phoneColors,
    storage: [
      { name: "256 GB", price: null, available: false },
      { name: "512 GB", price: 2179, available: true },
    ],
    specs: ["256 GB unavailable", "512 GB · 2,179 AZN", "QEYDIYYATSIZ · Device registration not included"],
    featured: true, illustration: true,
  },
  {
    id: "dyson-hair-dryer", name: "Dyson Supersonic Nural", subtitle: "Intelligent hair dryer",
    category: "Hair care", price: 489, image: "/images/dyson-dryer.svg",
    badge: "Limited stock", stock: 4, colors: [{ name: "Ceramic Pink / Rose Gold", value: "#d69fa6" }],
    specs: ["Scalp protect mode", "Automatic pause detection", "Intelligent heat control"],
    featured: true, illustration: true,
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    subtitle: "256 GB · Natural Titanium",
    category: "Smartphones",
    price: 1199.5,
    originalPrice: 2399,
    image: "/images/hero-generated.png",
    badge: "50% OFF",
    registration: "QEYDIYYATSIZ",
    colors: [{ name: "Natural Titanium", value: "#b9b2a7" }],
    specs: [
      "6.3-inch Super Retina XDR display",
      "A18 Pro chip",
      "256 GB storage",
      "48 MP Fusion camera",
    ],
    featured: true,
  },
  {
    id: "macbook-pro-m2",
    name: "MacBook Pro M2",
    subtitle: "13-inch · 8 GB / 256 GB",
    category: "Laptops",
    price: 1249.5,
    originalPrice: 2499,
    image: "/images/macbook.png",
    colors: [{ name: "Space Gray", value: "#8d8f91" }],
    specs: [
      "13.3-inch Retina display",
      "Apple M2 chip",
      "8 GB unified memory",
      "256 GB SSD",
    ],
    featured: true,
  },
  {
    id: "bose-qc45",
    name: "Bose QuietComfort 45",
    subtitle: "Wireless noise-cancelling headphones",
    category: "Audio",
    price: 274.5,
    originalPrice: 549,
    image: "/images/headphones.png",
    colors: [{ name: "Midnight Blue", value: "#303848" }],
    specs: [
      "Active noise cancellation",
      "Bluetooth wireless audio",
      "Up to 24 hours of battery life",
      "USB-C charging",
    ],
    featured: true,
  },
  {
    id: "galaxy-s23",
    name: "Samsung Galaxy S23",
    subtitle: "128 GB · Lavender",
    category: "Smartphones",
    price: 699.5,
    originalPrice: 1399,
    image: "/images/samsung.png",
    colors: [{ name: "Lavender", value: "#beb2cc" }],
    specs: [
      "6.1-inch Dynamic AMOLED 2X display",
      "128 GB storage",
      "50 MP wide camera",
      "Snapdragon 8 Gen 2 for Galaxy",
    ],
    featured: true,
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    subtitle: "Wireless earbuds · USB-C case",
    category: "Audio",
    price: 224.5,
    originalPrice: 449,
    image: "/images/airpods.png",
    colors: [{ name: "White", value: "#f5f5f4" }],
    specs: [
      "Active noise cancellation",
      "Adaptive Audio",
      "USB-C MagSafe charging case",
      "Up to 6 hours of listening time",
    ],
    featured: true,
  },
  {
    id: "playstation-5-disc",
    name: "PlayStation 5",
    subtitle: "Disc edition · 825 GB",
    category: "Gaming",
    price: 549.5,
    originalPrice: 1099,
    image: "/images/playstation.png",
    colors: [{ name: "White", value: "#e6e7e9" }],
    specs: [
      "825 GB SSD",
      "Ultra HD Blu-ray disc drive",
      "DualSense wireless controller",
      "4K gaming support",
    ],
    featured: true,
  },
];

export function variantProduct(product: Product, storageIndex = 0, colorIndex = 0): Product {
  const storage = product.storage?.[storageIndex];
  const color = product.colors[colorIndex];
  if (!product.storage || !storage || !color) return product;
  return {
    ...product,
    id: `${product.id}--${storageIndex}--${colorIndex}`,
    baseId: product.id,
    subtitle: `${storage.name} · ${color.name}`,
    price: storage.price ?? product.price,
    available: storage.available,
    image: color.image ?? product.image,
    colors: [color],
  };
}

export function getProduct(id: string): Product | undefined {
  const direct = products.find((product) => product.id === id);
  if (direct) return direct;
  const match = /^([a-z0-9-]+)--(\d)--(\d)$/.exec(id);
  if (!match) return undefined;
  const product = products.find((p) => p.id === match[1]);
  const storage = Number(match[2]), color = Number(match[3]);
  if (!product?.storage?.[storage] || !product.colors[color]) return undefined;
  return variantProduct(product, storage, color);
}

export function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(amount)} AZN`;
}
