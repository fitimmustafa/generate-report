import React from "react";
import { OfferProduct, DEFAULT_PRODUCT } from "@/types/offer";

interface ProductTemplatesProps {
  onSelectTemplate: (template: Omit<OfferProduct, "id">) => void;
}

const PRODUCT_TEMPLATES = [
  {
    name: "Derë e mbrendshme standard",
    price: 350.0,
    template: {
      ...DEFAULT_PRODUCT,
      category: "dera-mbrendshme" as const,
      productType: "me elektomotor",
      hapjaRoletneteve: "Bardh",
      ngjyraRoletneteve: "Antrazit-Bardh",
      fletezateRoletneteve: "Antrazit",
      profili: "Alumin",
      ngjyraProfilit: "Sigjenja",
      mekanizmat: "Hoppe",
      dorzat: "Pvc GEALAN S9000 German profiles",
      mbushja: "Pvc Panel",
      llavjetBraves: "Lloji i braves",
      mekanizmatBraves: "Mekanizmat i braves",
      qelsat: "3 cope",
      bagjlamat: "Marc",
      quantity: 1,
      qmimi: 350.0,
      unitPrice: 350.0,
      totalPrice: 350.0,
    },
  },
  {
    name: "Derë e Hyrjes",
    price: 650.0,
    template: {
      ...DEFAULT_PRODUCT,
      category: "dera-hyrjes" as const,
      productType: "Profili",
      hapjaRoletneteve: "Antrazit-Bardh",
      ngjyraRoletneteve: "Antrazit",
      fletezateRoletneteve: "Golden Oak",
      profili: "Alumin",
      ngjyraProfilit: "Antrazit-Bardh",
      mekanizmat: "PSK Panel",
      dorzat: "Pvc Panel",
      mbushja: "Pvc Panel",
      llavjetBraves: "2 cope",
      mekanizmatBraves: "Pvc Panel zbukurues i trafshët",
      qelsat: "3 cope",
      bagjlamat: "Të koduar 5 Cope",
      quantity: 1,
      qmimi: 650.0,
      unitPrice: 650.0,
      totalPrice: 650.0,
    },
  },
  {
    name: "Derë e Garazhës",
    price: 850.0,
    template: {
      ...DEFAULT_PRODUCT,
      category: "dera-garazhes" as const,
      productType: "Alumin-Panel",
      hapjaRoletneteve: "Bardh",
      ngjyraRoletneteve: "Bardh",
      fletezateRoletneteve: "Bardh",
      profili: "Alumin-Panel",
      ngjyraProfilit: "Bardh",
      mekanizmat: "Sendvic Panel 40 mm",
      dorzat: "2 cope",
      mbushja: "Sendvic Panel 40 mm",
      llavjetBraves: "2 cope",
      mekanizmatBraves: "Sendvic Panel 40 mm",
      qelsat: "2 cope",
      bagjlamat: "Telekomanda",
      quantity: 1,
      qmimi: 850.0,
      unitPrice: 850.0,
      totalPrice: 850.0,
    },
  },
  {
    name: "Derë e mbrendshme MDF",
    price: 280.0,
    template: {
      ...DEFAULT_PRODUCT,
      category: "dera-mbrendshme-mdf" as const,
      productType: "MDF 40mm+6mm",
      hapjaRoletneteve: "Spas doelloss",
      ngjyraRoletneteve: "AGB",
      fletezateRoletneteve: "GEALAN S9000 German profiles",
      profili: "MDF",
      ngjyraProfilit: "Spas doelloss",
      mekanizmat: "AGB",
      dorzat: "Cilinder",
      mbushja: "MDF",
      llavjetBraves: "Mbyllja e braves",
      mekanizmatBraves: "Cilinder: Magnet",
      qelsat: "3D",
      bagjlamat: "Të bllokuara",
      quantity: 1,
      qmimi: 280.0,
      unitPrice: 280.0,
      totalPrice: 280.0,
    },
  },
];

const ProductTemplates: React.FC<ProductTemplatesProps> = ({
  onSelectTemplate,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border border-blue-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        📋 Shabllonet e produkteve
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Zgjidhni një shablon për të shtuar shpejt një produkt të paracaktuar me
        çmim dhe specifikime
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCT_TEMPLATES.map((item) => (
          <button
            key={item.name}
            onClick={() => onSelectTemplate(item.template)}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left shadow-sm hover:shadow-md group"
          >
            <div className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700">
              {item.name}
            </div>
            <div className="text-xs text-gray-500 mb-3 line-clamp-2">
              {item.template.productType}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">
                €{item.price.toFixed(2)}
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Shto
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Kategoria: {item.template.category.replace("-", " ")}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Këshillë:</strong> Mund të modifikoni çdo fushë pas shtimit
          të shabllonit, përfshirë çmimin.
        </p>
      </div>
    </div>
  );
};

export default ProductTemplates;
