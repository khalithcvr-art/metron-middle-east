export type Category = "hospitality" | "commercial" | "residential" | "venues";

/* A gallery entry is a plain path, or {src, caption} when the photo needs its own caption */
export type GalleryImage = string | { src: string; caption?: string };

export interface Project {
  id: string;
  title: string;
  category: Category;
  location: string;
  cover: string;
  gallery: GalleryImage[];
}

export const PROJECTS: Project[] = [
  {
    id: "sapia",
    title: "Zapia Al Ain Zoo",
    category: "venues",
    location: "Abu Dhabi",
    cover: "/images/AL_AIN_ZOO.jpeg",
    gallery: ["/images/AL_AIN_ZOO.jpeg"],
  },
  {
    id: "hilalco",
    title: "Hilalco Abu Dhabi",
    category: "commercial",
    location: "Abu Dhabi",
    cover: "/images/hilalco_logo.jpg",
    gallery: ["/images/hilalco_logo.jpg"],
  },
  {
    id: "qasr",
    title: "Qasr Al Watan",
    category: "venues",
    location: "Abu Dhabi",
    cover: "/images/qasr_al_watan__abu_dhabi.jpeg",
    gallery: [
      "/images/qasr_al_watan__abu_dhabi.jpeg",
      "/images/IMG-20190209-WA0028.jpg",
      "/images/IMG-20190209-WA0030.jpg",
      "/images/IMG-20190209-WA0031.jpg",
      "/images/IMG-20190209-WA0033.jpg"
    ],
  },
  {
    id: "velodrome",
    title: "Velodrome",
    category: "commercial",
    location: "Abu Dhabi",
    cover: "/images/velodrome_main.jpg",
    gallery: [
      "/images/velodrome_main.jpg",
      "/images/VELODROME_PIC_1.jpg",
      "/images/VELODROME_PIC_2.jpg",
      "/images/VELODROME_PIC_3.jpg",
    ],
  },
  {
    id: "floating-villa",
    title: "Floating Villa Abu Dhabi",
    category: "residential",
    location: "Abu Dhabi",
    cover: "/images/floating_villa.jpg",
    gallery: ["/images/floating_villa.jpg"],
  },
  {
    id: "etihad-arena",
    title: "Etihad Arena",
    category: "venues",
    location: "Abu Dhabi",
    cover: "/images/etihad_arena.jpg",
    gallery: [
      "/images/etihad_arena.jpg",
      "/images/etihad_arena_2.png",
      "/images/etihad_arena_3.png"
    ],
  },
  {
    id: "hilton-ad",
    title: "Yas Bay Abu Dhabi",
    category: "hospitality",
    location: "Abu Dhabi",
    cover: "/images/yas_bay_1.jpg",
    gallery: ["/images/yas_bay_1.jpg", "/images/yas_bay_2.jpg", "/images/yas_bay_3.jpg"],
  },
  {
    id: "opera",
    title: "Opera Dubai",
    category: "venues",
    location: "Dubai",
    cover: "/images/OPERA_1.png",
    gallery: ["/images/OPERA_1.png"],
  },
  {
    id: "burj",
    title: "Burj Vista",
    category: "residential",
    location: "Dubai",
    cover: "/images/burj_vista_tower.jpg",
    gallery: ["/images/burj_vista_tower.jpg"],
  },
  {
    id: "wade",
    title: "Wade Adams Dubai",
    category: "commercial",
    location: "Dubai",
    cover: "/images/wade_adams_logo.png",
    gallery: ["/images/wade_adams_logo.png"],
  },
  {
    id: "modon",
    title: "Modon Abu Dhabi",
    category: "commercial",
    location: "Abu Dhabi",
    cover: "/images/modon_logo.jpg",
    gallery: ["/images/modon_logo.jpg"],
  },
  {
    id: "broadway",
    title: "8th Broadway London",
    category: "hospitality",
    location: "London",
    cover: "/images/No_8TH.jpeg",
    gallery: ["/images/No_8TH.jpeg", "/images/No_8th_3rd.jpeg"],
  },
  {
    id: "santanna-island",
    title: "Santanna Enorme Island Hotel",
    category: "hospitality",
    location: "Greece",
    cover: "/images/Santanna_Enorme_Island_Hotel_1.jpg",
    gallery: [
      "/images/Santanna_Enorme_Island_Hotel_1.jpg",
      "/images/Santanna_Enorme_Island_Hotel_2.jpg",
    ],
  },
  {
    id: "santanna-beach",
    title: "Santanna Enorme Beach Resort",
    category: "hospitality",
    location: "Greece",
    cover: "/images/Santanna_Enorme_Beach_Resort__IMAGE_1.jpg",
    gallery: [
      "/images/Santanna_Enorme_Beach_Resort__IMAGE_1.jpg",
      "/images/Santanna_Enorme_Beach_Resort_IMAGE_2_.jpg",
    ],
  },
  {
    id: "royal-blue",
    title: "The Royal Blue Resort",
    category: "hospitality",
    location: "Greece",
    cover: "/images/royal_blue_1.jpg",
    gallery: [
      "/images/royal_blue_1.jpg",
      "/images/royal_blue_2.jpg",
      "/images/royal_blue_3.jpg",
      "/images/royal_blue_4.jpg",
      "/images/royal_blue_5.jpg",
    ],
  },
  {
    id: "conrad-corfu",
    title: "Conrad Corfu",
    category: "hospitality",
    location: "Greece",
    cover: "/images/conrad_corfu.jpg",
    gallery: ["/images/conrad_corfu.jpg"],
  },
  {
    id: "alexandra-beach",
    title: "Alexandra Beach Hotel",
    category: "hospitality",
    location: "Greece",
    cover: "/images/alexandra_beach.jpg",
    gallery: ["/images/alexandra_beach.jpg"],
  },
  {
    id: "ritz-bahrain",
    title: "Jumeira Saray Resort Dubai",
    category: "hospitality",
    location: "Dubai",
    cover: "/images/jumeira_saray_2.jpg",
    gallery: [
      "/images/jumeira_saray_2.jpg",
      "/images/jumeira_saray_1.png",
      "/images/jumeira_saray_3.jpg",
      "/images/jumeira_saray_4.jpg",
    ],
  },
  {
    id: "private-yacht",
    title: "Private Yacht",
    category: "residential",
    location: "Global",
    cover: "/images/private_yacht.jpg",
    gallery: ["/images/private_yacht.jpg"],
  },
  {
    id: "private-london",
    title: "Private Apartments in London",
    category: "residential",
    location: "London",
    cover: "/images/private_london.jpg",
    gallery: ["/images/private_london.jpg"],
  },
  {
    id: "private-dubai",
    title: "Dubai Private Apartments",
    category: "residential",
    location: "Dubai",
    cover: "/images/private_dubai.jpg",
    gallery: ["/images/private_dubai.jpg"],
  },
];

/* Standalone photo reel shown by the "Our Projects Gallery" card on the
   Projects page. Sourced from the company's shared project album. */
export const GALLERY_IMAGES: string[] = Array.from(
  { length: 49 },
  (_, i) => `/images/gallery/gallery_${String(i + 1).padStart(2, "0")}.jpg`,
);

export interface ProductEntry {
  img: string;
  title: string;
  desc: string;
  /* Optional custom paragraph for the Expertise page; falls back to a
     generic partner-manufacturer blurb when omitted. */
  brief?: string;
  /* Set true to hide the "0N" numeral on the Expertise page. */
  hideNumber?: boolean;
}

export const PRODUCTS: ProductEntry[] = [
  {
    img: "/images/furniture_twins.jpg",
    title: "Furniture",
    desc: "Indoor, outdoor, and office furnishings",
    brief:
      "Working with the world's most renowned furniture manufacturers and artisan workshops, we deliver exclusive, custom-made pieces that combine superior craftsmanship with contemporary elegance. From luxurious residential interiors to prestigious commercial and hospitality developments, every detail is carefully considered to achieve a flawless result.",
    hideNumber: true,
  },
  {
    img: "/images/lighting_noctambule.jpg",
    title: "Lighting",
    desc: "Premium lighting fixtures",
    brief:
      "From elegant decorative fixtures to custom-made statement pieces, every product is selected or designed to complement the unique character of each space.",
    hideNumber: true,
  },
  {
    img: "/images/floor_covering_rug.jpg",
    title: "Floor Coverings",
    desc: "Wood, carpets, and premium rugs",
    brief:
      "We supply premium floor covering solutions for residential, commercial, hospitality, and corporate environments. Our product portfolio includes carefully selected rugs, carpets, and wood flooring that meet the highest standards of quality, durability, and design.",
    hideNumber: true,
  },
  {
    img: "/images/decoratives_wallpaper.jpg",
    title: "Decoratives",
    desc: "Wallpapers and decorative elements",
    brief:
      "wallpapers, wall décor, mirrors, artwork, decorative accessories, and interior accents. Every product is carefully selected for its quality, durability, and refined finish.",
    hideNumber: true,
  },
];

export const FILTERS: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "hospitality", label: "Hospitality" },
  { key: "commercial", label: "Commercial" },
  { key: "residential", label: "Residential" },
  { key: "venues", label: "Venues" },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  hospitality: "Hospitality",
  commercial: "Commercial",
  residential: "Residential",
  venues: "Venues",
};
