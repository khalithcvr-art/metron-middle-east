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
    title: "Sapia Al Ain Zoo",
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
    cover: "/images/hilalco.jpg",
    gallery: ["/images/hilalco.jpg"],
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
    title: "Velodrome Modern",
    category: "commercial",
    location: "Abu Dhabi",
    cover: "/images/VELODROME_PIC_1.jpg",
    gallery: [
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
    title: "Hilton Abu Dhabi",
    category: "hospitality",
    location: "Abu Dhabi",
    cover: "/images/hilton_abu_dhabi.jpg",
    gallery: ["/images/hilton_abu_dhabi.jpg"],
  },
  {
    id: "opera",
    title: "Opera Back House",
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
    cover: "/images/burj_vista_image_1.png",
    gallery: ["/images/burj_vista_image_1.png", "/images/BURJ_VISTA.png"],
  },
  {
    id: "wade",
    title: "Wade Adams Dubai",
    category: "commercial",
    location: "Dubai",
    cover: "/images/wade_adams.png",
    gallery: ["/images/wade_adams.png"],
  },
  {
    id: "modon",
    title: "Modon Abu Dhabi",
    category: "commercial",
    location: "Abu Dhabi",
    cover: "/images/modon.png",
    gallery: ["/images/modon.png"],
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
    title: "Ritz Carlton Bahrain",
    category: "hospitality",
    location: "Bahrain",
    cover: "/images/RITZ_CARLTON.png",
    gallery: [
      "/images/RITZ_CARLTON.png",
      "/images/ritz_bahrain_3.webp",
      "/images/ritz_bahrain_1.webp",
      "/images/ritz_bahrain_2.webp",
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
  { length: 66 },
  (_, i) => `/images/gallery/gallery_${String(i + 1).padStart(2, "0")}.jpg`,
);

export const PRODUCTS = [
  {
    img: "/images/PRODUCT_SECTION_FURNITURE_IMAGE_ICON.jpeg",
    title: "Furniture",
    desc: "Indoor, outdoor, and office furniture solutions",
  },
  {
    img: "/images/LIGHTING_SECTION_IMAGE.jpeg",
    title: "Lighting",
    desc: "Premium lighting fixtures and solutions",
  },
  {
    img: "/images/FLOOR_COVERING_SECTION_IMAGE.webp",
    title: "Floor Coverings",
    desc: "Wood, carpets, and premium rugs",
  },
  {
    img: "/images/DECORATIVE_SECTION_IMAGE.webp",
    title: "Decoratives",
    desc: "Wallpapers and decorative elements",
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
