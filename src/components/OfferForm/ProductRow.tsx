import React, { useEffect, useState } from "react";
import {
  OfferProduct,
  PRODUCT_CATEGORIES,
  PRODUCT_OPTIONS,
} from "@/types/offer";
import ImageUploader from "@/components/ImageUploader.tsx";

interface ProductRowProps {
  product: OfferProduct;
  onUpdate: (
    id: string,
    field: keyof OfferProduct,
    value: string | number | string[]
  ) => void;
  onRemove: (id: string) => void;
}

interface MultiSelectDropdownProps {
  field: keyof OfferProduct;
  options: readonly string[];
  placeholder: string;
  value: string;
  onUpdate: (field: keyof OfferProduct, value: string) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  field,
  options,
  placeholder,
  value,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Parse existing value into selected items
  useEffect(() => {
    if (value) {
      setSelectedItems(value.split(", ").filter(Boolean));
    }
  }, [value]);

  const toggleOption = (option: string) => {
    const newItems = selectedItems.includes(option)
      ? selectedItems.filter((item) => item !== option)
      : [...selectedItems, option];

    setSelectedItems(newItems);
    onUpdate(field, newItems.join(", "));
  };

  const addCustomValue = () => {
    if (customValue.trim() && !selectedItems.includes(customValue.trim())) {
      const newItems = [...selectedItems, customValue.trim()];
      setSelectedItems(newItems);
      onUpdate(field, newItems.join(", "));
      setCustomValue("");
    }
  };

  const removeItem = (item: string) => {
    const newItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newItems);
    onUpdate(field, newItems.join(", "));
  };

  return (
    <div className="relative">
      {/* Selected items display */}
      <div
        className="w-full p-2 border border-gray-300 rounded text-sm min-h-[40px] cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItems.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedItems.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
              >
                {item}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item);
                  }}
                  className="ml-1 hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {/* Custom input */}
          <div className="p-2 border-b border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="Shtoni vlerë të re..."
                className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded"
                onKeyPress={(e) => e.key === "Enter" && addCustomValue()}
              />
              <button
                onClick={addCustomValue}
                className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
              >
                Shto
              </button>
            </div>
          </div>

          {/* Predefined options */}
          <div className="max-h-40 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  selectedItems.includes(option)
                    ? "bg-blue-50 text-blue-700"
                    : ""
                }`}
              >
                <span className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(option)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {option}
                </span>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Mbyll
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onUpdate,
  onRemove,
}) => {
  const handleInputChange = (
    field: keyof OfferProduct,
    value: string | number | string[]
  ) => {
    onUpdate(product.id, field, value);
  };

  // Calculate total price when quantity or qmimi changes
  useEffect(() => {
    const qmimi = product.qmimi || 0;
    const quantity = product.quantity || 1;
    const totalPrice = qmimi * quantity;

    if (totalPrice !== product.totalPrice) {
      onUpdate(product.id, "totalPrice", totalPrice);
      onUpdate(product.id, "unitPrice", qmimi); // Keep unitPrice in sync with qmimi
    }
  }, [
    product.qmimi,
    product.quantity,
    product.totalPrice,
    product.id,
    onUpdate,
  ]);

  const createMultiSelectDropdown = (
    field: keyof OfferProduct,
    options: readonly string[],
    placeholder: string,
    value: string
  ) => (
    <MultiSelectDropdown
      field={field}
      options={options}
      placeholder={placeholder}
      value={value}
      onUpdate={handleInputChange}
    />
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Row 1: Category, Product Type, and Basic Info */}
        <div className="lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Roletnet
              </label>
              <select
                value={product.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(PRODUCT_CATEGORIES).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tipi i Produktit
              </label>
              {createMultiSelectDropdown(
                "productType",
                PRODUCT_OPTIONS.productTypes[product.category] || [],
                "Zgjidhni tipin",
                product.productType
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Hapja Roletneteve
              </label>
              {createMultiSelectDropdown(
                "hapjaRoletneteve",
                PRODUCT_OPTIONS.hapjaRoletneteve,
                "Zgjidhni hapjen",
                product.hapjaRoletneteve
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Profili
              </label>
              {createMultiSelectDropdown(
                "profili",
                PRODUCT_OPTIONS.profili,
                "Zgjidhni profilin",
                product.profili
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Colors and Specifications */}
        <div className="lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Ngjyra e Roletneteve
              </label>
              {createMultiSelectDropdown(
                "ngjyraRoletneteve",
                PRODUCT_OPTIONS.ngjyraRoletneteve,
                "Zgjidhni ngjyrën",
                product.ngjyraRoletneteve
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Fletëzat e Roletneteve
              </label>
              {createMultiSelectDropdown(
                "fletezateRoletneteve",
                PRODUCT_OPTIONS.fletezateRoletneteve,
                "Zgjidhni fletëzat",
                product.fletezateRoletneteve
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Ngjyra e Profilit
              </label>
              {createMultiSelectDropdown(
                "ngjyraProfilit",
                PRODUCT_OPTIONS.ngjyraProfilit,
                "Zgjidhni ngjyrën",
                product.ngjyraProfilit
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Mekanizmat
              </label>
              {createMultiSelectDropdown(
                "mekanizmat",
                PRODUCT_OPTIONS.mekanizmat,
                "Zgjidhni mekanizmat",
                product.mekanizmat
              )}
            </div>
          </div>
        </div>

        {/* Row 3: Mechanisms and Hardware */}
        <div className="lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Dorzat
              </label>
              {createMultiSelectDropdown(
                "dorzat",
                PRODUCT_OPTIONS.dorzat,
                "Zgjidhni dorzat",
                product.dorzat
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Mbushja
              </label>
              {createMultiSelectDropdown(
                "mbushja",
                PRODUCT_OPTIONS.mbushja,
                "Zgjidhni mbushjen",
                product.mbushja
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Llavjet e Braves
              </label>
              {createMultiSelectDropdown(
                "llavjetBraves",
                PRODUCT_OPTIONS.llavjetBraves,
                "Zgjidhni llavjet",
                product.llavjetBraves
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Mekanizmat e Braves
              </label>
              {createMultiSelectDropdown(
                "mekanizmatBraves",
                PRODUCT_OPTIONS.mekanizmatBraves,
                "Zgjidhni mekanizmat",
                product.mekanizmatBraves
              )}
            </div>
          </div>
        </div>

        {/* Row 4: Final Details, Quantity, Price, and Actions */}
        <div className="lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Qelsat
              </label>
              {createMultiSelectDropdown(
                "qelsat",
                PRODUCT_OPTIONS.qelsat,
                "Zgjidhni qelsat",
                product.qelsat
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Bagjlamat
              </label>
              {createMultiSelectDropdown(
                "bagjlamat",
                PRODUCT_OPTIONS.bagjlamat,
                "Zgjidhni bagjlamat",
                product.bagjlamat
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Sasia
              </label>
              <input
                type="number"
                placeholder="Sasia"
                value={product.quantity}
                onChange={(e) =>
                  handleInputChange("quantity", parseInt(e.target.value) || 1)
                }
                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Qmimi (€)
              </label>
              <input
                type="number"
                placeholder="Qmimi"
                value={product.qmimi || ""}
                onChange={(e) =>
                  handleInputChange("qmimi", parseFloat(e.target.value) || 0)
                }
                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Totali (€)
              </label>
              <input
                type="text"
                value={`€${(product.totalPrice || 0).toFixed(2)}`}
                readOnly
                className="w-full p-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Imazhet
              </label>
              <ImageUploader
                images={product.images || []}
                onImagesChange={(images) => handleInputChange("images", images)}
                maxImages={2}
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => onRemove(product.id)}
                className="w-full px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                type="button"
              >
                Fshi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRow;
