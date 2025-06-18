export interface OfferProduct {
  id: string;
  category:
    | "dera-mbrendshme"
    | "dera-hyrjes"
    | "dera-garazhes"
    | "dera-mbrendshme-mdf";
  productType: string;
  hapjaRoletneteve: string;
  ngjyraRoletneteve: string;
  fletezateRoletneteve: string;
  profili: string;
  ngjyraProfilit: string;
  mekanizmat: string;
  dorzat: string;
  mbushja: string;
  llavjetBraves: string;
  mekanizmatBraves: string;
  qelsat: string;
  bagjlamat: string;
  quantity: number;
  qmimi?: number; // Price per unit in Albanian (qmimi means price)
  unitPrice?: number;
  totalPrice?: number;
  images?: string[]; // Base64 encoded images or image URLs
}

export interface OfferData {
  id: string;
  clientName: string;
  clientEmail: string;
  offerNumber: string;
  date: string;
  validUntil: string;
  products: OfferProduct[];
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormState {
  client: {
    name: string;
    email: string;
  };
  offer: {
    number: string;
    date: string;
    validUntil: string;
  };
  products: OfferProduct[];
  notes: string;
}

export const PRODUCT_CATEGORIES = {
  "dera-mbrendshme": "Derë e mbrendshme",
  "dera-hyrjes": "Derë e Hyrjes",
  "dera-garazhes": "Derë e Garazhës",
  "dera-mbrendshme-mdf": "Derë e mbrendshme MDF",
} as const;

// Comprehensive dropdown options based on the image
export const PRODUCT_OPTIONS = {
  productTypes: {
    "dera-mbrendshme": [
      "me elektomotor",
      "me shirk-litar",
      "Antrazit",
      "Golden Oak",
    ],
    "dera-hyrjes": [
      "Profili",
      "Alumin",
      "Alumin Termo",
      "GEALAN S9000 German profiles",
    ],
    "dera-garazhes": ["Profili", "Alumin-Panel"],
    "dera-mbrendshme-mdf": ["Profili", "MDF 40mm+6mm"],
  },
  hapjaRoletneteve: [
    "Bardh",
    "Antrazit-Bardh",
    "Antrazit",
    "Golden Oak",
    "Spas doelloss",
  ],
  ngjyraRoletneteve: [
    "Bardh",
    "Antrazit-Bardh",
    "Antrazit",
    "Golden Oak",
    "AGB",
    "Cilinder",
    "Çeles-Magnet",
    "Cilinder: Magnet",
  ],
  fletezateRoletneteve: [
    "Bardh",
    "Antrazit-Bardh",
    "Antrazit",
    "Golden Oak",
    "GEALAN S9000 German profiles",
  ],
  profili: ["Alumin", "Alumin-Panel", "MDF"],
  ngjyraProfilit: [
    "Bardh",
    "Antrazit-Bardh",
    "Antrazit",
    "Golden Oak",
    "Sigjenja",
    "PSK SISTEM",
    "HS SISTEM",
    "Spas doelloss",
  ],
  mekanizmat: [
    "Sigjenja",
    "PSK SISTEM",
    "HS SISTEM",
    "Hoppe",
    "PSK Panel",
    "Sendvic Panel 40 mm",
    "AGB",
  ],
  dorzat: [
    "Hoppe",
    "Pvc GEALAN S9000 German profiles",
    "Pvc Panel",
    "Pvc Panel 2gjukrues",
    "Pvc Panel zbukurues i trafshët",
    "2 gjukrues",
    "2 cope",
    "Cilinder",
    "Çeles-Magnet",
  ],
  mbushja: ["Pvc Panel", "Sendvic Panel 40 mm", "MDF"],
  llavjetBraves: ["Lloji i braves", "Mbyllja e braves", "2 cope"],
  mekanizmatBraves: [
    "Mekanizmat i braves",
    "Pvc Panel zbukurues i trafshët",
    "Sendvic Panel 40 mm",
    "Cilinder: Magnet",
  ],
  qelsat: ["Qelsat", "3 cope", "2 cope", "3D"],
  bagjlamat: [
    "Marc",
    "Stubina",
    "Me 3 mbyllje",
    "Të koduar 5 Cope",
    "Telekomanda",
    "2 cope",
    "Të bllokuara",
    "Të doellossa 3D",
  ],
} as const;

export const DEFAULT_PRODUCT: Omit<OfferProduct, "id"> = {
  category: "dera-mbrendshme",
  productType: "",
  hapjaRoletneteve: "",
  ngjyraRoletneteve: "",
  fletezateRoletneteve: "",
  profili: "",
  ngjyraProfilit: "",
  mekanizmat: "",
  dorzat: "",
  mbushja: "",
  llavjetBraves: "",
  mekanizmatBraves: "",
  qelsat: "",
  bagjlamat: "",
  quantity: 1,
  qmimi: 0,
  unitPrice: 0,
  totalPrice: 0,
  images: [],
};
