import { phonePhotos, proMaxHero, airPhotos, macProPhotos, samsungPhoto, dysonPhoto, playstationPhoto } from "./product-photos";

export const categories = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Gaming",
  "Hair care",
  "Cameras",
  "Wearables",
  "Home cinema",
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
  storage?: { name: string; price: number | null; originalPrice?: number; available: boolean }[];
  optionLabel?: string;
  photoNote?: string;
  illustration?: boolean;
  baseId?: string;
  stock?: number;
}

// Merchant prices in AZN. Official Pro colors verified against Apple Newsroom,
// September 9, 2026. Product photography is documented in public/images/SOURCES.md.
// https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/
export const phoneColors = [
  { name: "Burgundy", value: "#722f46", image: phonePhotos.Burgundy },
  { name: "Black", value: "#292c32", image: phonePhotos.Black },
  { name: "Silver", value: "#c2c6cd", image: phonePhotos.Silver },
  { name: "Glacier", value: "#d0e1e7", image: phonePhotos.Glacier },
];

export const proMaxColors = phoneColors.map((color) => ({
  ...color, image: color.name === "Burgundy" ? proMaxHero : color.image,
}));

// Money is calculated in integer qepik and rounded once per unit.
export function discountedPrice(original: number, percent = 30): number {
  return Math.round(Math.round(original * 100) * (100 - percent) / 100) / 100;
}
export function discountPercent(product: Pick<Product, "price" | "originalPrice">): number {
  return product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
}
function usdReference(amount: number): number { return Math.round(amount * 170) / 100; }
function configurations(entries: [string, number][]) {
  return entries.map(([name, usd]) => {
    const originalPrice = usdReference(usd);
    return { name, originalPrice, price: discountedPrice(originalPrice), available: true };
  });
}
function finishes(prefix: string, entries: [string, string][]) {
  return entries.map(([name, value]) => {
    const image = prefix === "s25-ultra" ? samsungPhoto("s25", name)
      : prefix === "s26-ultra" ? samsungPhoto("s26", name)
      : prefix === "macbook-air" ? airPhotos[name as keyof typeof airPhotos]
      : macProPhotos[name as keyof typeof macProPhotos];
    return { name, value, image };
  });
}
const s25Colors = finishes("s25-ultra", [
  ["Titanium Silverblue", "#a7b7c7"], ["Titanium Black", "#42454a"],
  ["Titanium Gray", "#9b9790"], ["Titanium Whitesilver", "#d8dcdb"],
  ["Titanium Jetblack", "#242527"], ["Titanium Jadegreen", "#b4c5b4"], ["Titanium Pinkgold", "#d8bfb9"],
]);
const s26Colors = finishes("s26-ultra", [
  ["Cobalt Violet", "#7b7492"], ["Sky Blue", "#b1cbdc"], ["Black", "#303136"],
  ["White", "#ecece7"], ["Silver Shadow", "#b5b8bf"], ["Pink Gold", "#dcbdb2"],
]);
const airColors = finishes("macbook-air", [["Sky Blue", "#b6cad9"], ["Midnight", "#303c49"], ["Starlight", "#e5dac9"], ["Silver", "#cfd0d2"]]);
const macProColors = finishes("macbook-pro", [["Space Black", "#424344"], ["Silver", "#cfd0d2"]]);
function configuredProduct(id: string, name: string, category: ProductCategory, storage: ReturnType<typeof configurations>, colors: ReturnType<typeof finishes>, specs: string[], optionLabel = "Storage"): Product {
  return { id, name, category, subtitle: `${storage[0].name} · ${colors[0].name}`, price: storage[0].price, originalPrice: storage[0].originalPrice,
    image: colors[0].image, badge: "30% OFF", colors, storage, specs, optionLabel, featured: true };
}

export const products: Product[] = [
  {
    id: "iphone-18-pro", name: "iPhone 18 Pro", subtitle: "256 GB · Burgundy",
    category: "Smartphones", price: 1874, image: phoneColors[0].image,
    badge: "New arrival", registration: "QEYDIYYATSIZ", colors: phoneColors,
    storage: [
      { name: "256 GB", price: 1874, available: true },
      { name: "512 GB", price: 1950, available: true },
    ],
    specs: ["Choose 256 GB or 512 GB", "6.3-inch Super Retina XDR display", "QEYDIYYATSIZ · Device registration not included"],
    featured: true,
  },
  {
    id: "iphone-18-pro-max", name: "iPhone 18 Pro Max", subtitle: "512 GB · Burgundy",
    category: "Smartphones", price: 2179, image: proMaxColors[0].image,
    badge: "New arrival", registration: "QEYDIYYATSIZ", colors: proMaxColors,
    storage: [
      { name: "256 GB", price: null, available: false },
      { name: "512 GB", price: 2179, available: true },
    ],
    photoNote: "Official Apple Pro series finish imagery. Regional packaging may vary.",
    specs: ["256 GB unavailable", "6.9-inch Super Retina XDR display", "QEYDIYYATSIZ · Device registration not included"],
    featured: true,
  },
  {
    id: "dyson-hair-dryer", name: "Dyson Supersonic Nural", subtitle: "Intelligent hair dryer",
    category: "Hair care", price: 489, image: dysonPhoto,
    badge: "Limited stock", stock: 4, colors: [{ name: "Ceramic Pink / Rose Gold", value: "#d69fa6" }],
    specs: ["Scalp protect mode", "Automatic pause detection", "Intelligent heat control"],
    featured: true,
  },
  configuredProduct("galaxy-s25-ultra", "Samsung Galaxy S25 Ultra", "Smartphones",
    configurations([["256 GB", 1299.99], ["512 GB", 1419.99], ["1 TB", 1659.99]]), s25Colors,
    ["6.9-inch Dynamic AMOLED 2X display", "200 MP main camera", "S Pen included", "Samsung.com-exclusive finishes included"]),
  configuredProduct("galaxy-s26-ultra", "Samsung Galaxy S26 Ultra", "Smartphones",
    configurations([["256 GB", 1299.99], ["512 GB", 1499.99], ["1 TB", 1799.99]]), s26Colors,
    ["256 GB, 512 GB or 1 TB", "200 MP main camera", "Built-in S Pen", "Six official finishes, including online-exclusive colors"]),
  configuredProduct("macbook-air-13-m5", "MacBook Air 13-inch M5", "Laptops",
    configurations([["16 GB / 512 GB", 1099], ["16 GB / 1 TB", 1299], ["24 GB / 1 TB", 1499]]), airColors,
    ["13.6-inch Liquid Retina display", "Apple M5 chip", "Fanless aluminum design", "Four official finishes"], "Memory & storage"),
  configuredProduct("macbook-air-15-m5", "MacBook Air 15-inch M5", "Laptops",
    configurations([["16 GB / 512 GB", 1299], ["16 GB / 1 TB", 1499], ["24 GB / 1 TB", 1699]]), airColors,
    ["15.3-inch Liquid Retina display", "Apple M5 chip", "Six-speaker sound system", "MagSafe charging"], "Memory & storage"),
  configuredProduct("macbook-pro-14-m5", "MacBook Pro 14-inch M5", "Laptops",
    configurations([["16 GB / 1 TB", 1699], ["24 GB / 1 TB", 1899], ["32 GB / 1 TB", 2099]]), macProColors,
    ["14.2-inch Liquid Retina XDR display", "Apple M5 chip", "Standard display", "Space Black or Silver"], "Memory & storage"),
  configuredProduct("macbook-pro-16-m5-pro", "MacBook Pro 16-inch M5 Pro", "Laptops",
    configurations([["24 GB / 1 TB", 2699], ["48 GB / 1 TB", 3099]]), macProColors,
    ["16.2-inch Liquid Retina XDR display", "Apple M5 Pro chip", "Standard display", "Space Black or Silver"], "Memory & storage"),
  {
    id: "macbook-pro-m2",
    name: "MacBook Pro M2",
    subtitle: "13-inch · 8 GB / 256 GB",
    category: "Laptops",
    price: 1749.3,
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
    subtitle: "Slim Disc edition · 1 TB",
    category: "Gaming",
    price: 549.5,
    originalPrice: 1099,
    image: playstationPhoto,
    colors: [{ name: "White", value: "#e6e7e9" }],
    specs: [
      "1 TB SSD",
      "Ultra HD Blu-ray disc drive",
      "DualSense wireless controller",
      "4K gaming support",
    ],
    featured: true,
  },
  {
    "id": "canon-eos-r5",
    "name": "Canon EOS R5",
    "subtitle": "45 MP full-frame mirrorless camera",
    "category": "Cameras",
    "price": 4758.81,
    "originalPrice": 6798.3,
    "image": "/images/catalog/canon-r5.png",
    "badge": "30% OFF",
    "colors": [
      {
        "name": "Black",
        "value": "#28282b"
      }
    ],
    "specs": [
      "45 MP full-frame sensor",
      "8K video recording",
      "RF lens mount"
    ],
    "featured": false,
    "photoNote": "Camera body; lens and accessories sold separately."
  },
  {
    "id": "sony-wf-1000xm4",
    "name": "Sony WF-1000XM4",
    "subtitle": "Wireless noise-cancelling earbuds",
    "category": "Audio",
    "price": 333.19,
    "originalPrice": 475.98,
    "image": "/images/catalog/sony-earbuds.png",
    "badge": "30% OFF",
    "colors": [
      {
        "name": "Black",
        "value": "#252827"
      }
    ],
    "specs": [
      "Active noise cancellation",
      "Wireless charging case",
      "Bluetooth audio"
    ],
    "featured": false
  },
  {
    "id": "asus-rog-g16",
    "name": "ASUS ROG Zephyrus G16",
    "subtitle": "16-inch gaming laptop",
    "category": "Laptops",
    "price": 2617.99,
    "originalPrice": 3739.98,
    "image": "/images/catalog/asus-g16.png",
    "badge": "30% OFF",
    "colors": [
      {
        "name": "Eclipse Gray",
        "value": "#55565d"
      }
    ],
    "specs": [
      "16-inch display",
      "ROG gaming laptop",
      "Backlit keyboard"
    ],
    "featured": false,
    "photoNote": "Exact processor, graphics and memory configuration to be confirmed."
  },
  {
    "id": "garmin-smartwatch",
    "name": "Garmin GPS smartwatch",
    "subtitle": "Fitness & everyday activity",
    "category": "Wearables",
    "price": 475.99,
    "originalPrice": 679.98,
    "image": "/images/catalog/garmin-watch.png",
    "badge": "30% OFF",
    "colors": [
      {
        "name": "Black",
        "value": "#303238"
      }
    ],
    "specs": [
      "GPS activity tracking",
      "Heart rate monitoring",
      "Touchscreen"
    ],
    "featured": false,
    "photoNote": "Regional model and included accessories to be confirmed."
  },
  {
    "id": "samsung-freestyle",
    "name": "Samsung The Freestyle",
    "subtitle": "Portable smart projector",
    "category": "Home cinema",
    "price": 951.99,
    "originalPrice": 1359.98,
    "image": "/images/catalog/samsung-freestyle.png",
    "badge": "30% OFF",
    "colors": [
      {
        "name": "White",
        "value": "#ecebe5"
      }
    ],
    "specs": [
      "Full HD projection",
      "Compact adjustable design",
      "Built-in speaker"
    ],
    "featured": false
  },
  {
    "id": "xbox-wireless-controller",
    "name": "Xbox Wireless Controller",
    "subtitle": "Wireless controller · Robot White",
    "category": "Gaming",
    "price": 77.34,
    "originalPrice": 110.48,
    "image": "/images/catalog/xbox-controller.png",
    "badge": "30% OFF",
    "colors": [
      {
        "name": "Robot White",
        "value": "#e9e9e7"
      }
    ],
    "specs": [
      "Textured grip",
      "Dedicated Share button",
      "Bluetooth connectivity"
    ],
    "featured": false
  },
];

export function variantProduct(product: Product, storageIndex = 0, colorIndex = 0): Product {
  const storage = product.storage?.[storageIndex];
  const color = product.colors[colorIndex];
  if (!product.storage) {
    if (product.colors.length < 2 || !color) return product;
    return { ...product, id: `${product.id}--0--${colorIndex}`, baseId: product.id, image: color.image ?? product.image, colors: [color], subtitle: `${product.subtitle} · ${color.name}` };
  }
  if (!storage || !color) return { ...product, available: false };
  return {
    ...product,
    id: `${product.id}--${storageIndex}--${colorIndex}`,
    baseId: product.id,
    subtitle: `${storage.name} · ${color.name}`,
    price: storage.price ?? product.price,
    originalPrice: storage.originalPrice ?? product.originalPrice,
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
  if (!product || (!product.storage && storage !== 0) || (product.storage && !product.storage[storage]) || !product.colors[color]) return undefined;
  return variantProduct(product, storage, color);
}

export function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat("en-US", { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 }).format(amount)} AZN`;
}
