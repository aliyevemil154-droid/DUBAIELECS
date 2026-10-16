// Original manufacturer photo URLs. No generated or recolored product imagery.
// See public/images/SOURCES.md for provenance and deployment notes.
const apple = "https://www.apple.com/v/iphone-18-pro/c/images/overview/product-viewer/";
export const phonePhotos = {
  Burgundy: `${apple}color_burgundy__f95it7a6dnyq_large.jpg`,
  Black: `${apple}color_black__dseo2tvypuc2_large.jpg`,
  Silver: `${apple}color_silver__c0oudn0fzw4m_large.jpg`,
  Glacier: `${apple}color_glacier__fkxlpbz0ruy6_large.jpg`,
};
export const proMaxHero = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-18-pro-202609?.v=M0dlUVBobHVpY1h1dmlaR3RZekpEMEhRUmlKNkhhdE80VTZIL1ZUdjd2eUpxQWhXdDZiUERGcnlNZW9hNkhxRmJPbDJJWDFrVGJEYlIxTitTcHhVWldHUUw4RnF3MmwyMUVGYm13ODRTWXlINUhveGhFc1lXWld4RkQ2dkFBMi8&fmt=png-alpha&hei=512&wid=400";
export const dysonPhoto = "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary-locale/en_US/598973-01.png?fmt=png-alpha&wid=800";
export const airPhotos = {
  "Sky Blue": "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_skyblue__eepkvlvjzcia_large.jpg",
  Midnight: "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_midnight__fvf2p6124tqq_large.jpg",
  Starlight: "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_starlight__dtojfd6ibywm_large.jpg",
  Silver: "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_silver__dcf8hwixw2uu_large.jpg",
};
export const macProPhotos = {
  "Space Black": "https://www.apple.com/v/macbook-pro/ax/images/overview/product-viewer/pv_colors_spaceblack__dwfpyrbaf4cy_large.jpg",
  Silver: "https://www.apple.com/v/macbook-pro/ax/images/overview/product-viewer/pv_colors_silver__doa20s4tupaq_large.jpg",
};
export function samsungPhoto(series: "s25" | "s26", color: string) {
  const root = "https://images.samsung.com/is/image/samsung/assets/uk/";
  return series === "s25"
    ? `${root}2501/smartphones/galaxy-s25-ultra/specs/p3_163x346_${color.replaceAll(" ", "")}.jpg`
    : `${root}s2602/mpdp/Galaxy-S26-Ultra_${color.replaceAll(" ", "-")}_163x346.jpg`;
}
export const playstationPhoto = "https://gmedia.playstation.com/is/image/SIEPDC/ps5-overview-console-blue-background-desktop-03-en-05nov25?fmt=webp&wid=900";
