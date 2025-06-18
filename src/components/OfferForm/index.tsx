import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  OfferProduct,
  OfferData,
  FormState,
  DEFAULT_PRODUCT,
} from "@/types/offer";
import { useOfferStorage } from "@/hooks/useOfferStorage";
import ProductRow from "./ProductRow";
import ProductTemplates from "./ProductTemplates";
import { generateOfferPDF } from "../PDFGenerator";

const OfferForm: React.FC = () => {
  const { saveOffer, generateOfferId } = useOfferStorage();
  const [currentOfferId, setCurrentOfferId] = useState<string>("");

  const [formState, setFormState] = useState<FormState>({
    client: {
      name: "",
      email: "",
    },
    offer: {
      number: "",
      date: new Date().toISOString().split("T")[0],
      validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 20 days from now
    },
    products: [{ ...DEFAULT_PRODUCT, id: generateOfferId() }],
    notes: "",
  });

  useEffect(() => {
    const newOfferId = generateOfferId();
    setCurrentOfferId(newOfferId);

    // Generate offer number
    setFormState((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        number: `OFF-${new Date().getFullYear()}-${String(Date.now()).slice(
          -6
        )}`,
      },
    }));
  }, [generateOfferId]);

  // Memoize the offer data to prevent unnecessary re-renders
  const offerData = useMemo((): OfferData => {
    const totalAmount = formState.products.reduce(
      (sum, product) => sum + (product.totalPrice || 0),
      0
    );

    const data = {
      id: currentOfferId,
      clientName: formState.client.name,
      clientEmail: formState.client.email,
      offerNumber: formState.offer.number,
      date: formState.offer.date,
      validUntil: formState.offer.validUntil,
      products: formState.products,
      totalAmount: totalAmount,
      notes: formState.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("Offer data for PDF:", data);
    return data;
  }, [
    currentOfferId,
    formState.client.name,
    formState.client.email,
    formState.offer.number,
    formState.offer.date,
    formState.offer.validUntil,
    formState.products,
    formState.notes,
  ]);

  const addProduct = useCallback(() => {
    const newProduct: OfferProduct = {
      ...DEFAULT_PRODUCT,
      id: generateOfferId(),
    };
    setFormState((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
  }, [generateOfferId]);

  const addProductFromTemplate = useCallback(
    (template: Omit<OfferProduct, "id">) => {
      const newProduct: OfferProduct = {
        ...template,
        id: generateOfferId(),
      };
      setFormState((prev) => ({
        ...prev,
        products: [...prev.products, newProduct],
      }));
    },
    [generateOfferId]
  );

  const updateProduct = useCallback(
    (
      id: string,
      field: keyof OfferProduct,
      value: string | number | string[]
    ) => {
      setFormState((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === id ? { ...product, [field]: value } : product
        ),
      }));
    },
    []
  );

  const removeProduct = useCallback(
    (id: string) => {
      if (formState.products.length > 1) {
        setFormState((prev) => ({
          ...prev,
          products: prev.products.filter((product) => product.id !== id),
        }));
      }
    },
    [formState.products.length]
  );

  const handleClientChange = useCallback(
    (field: keyof FormState["client"], value: string) => {
      setFormState((prev) => ({
        ...prev,
        client: { ...prev.client, [field]: value },
      }));
    },
    []
  );

  const handleOfferChange = useCallback(
    (field: keyof FormState["offer"], value: string) => {
      setFormState((prev) => ({
        ...prev,
        offer: { ...prev.offer, [field]: value },
      }));
    },
    []
  );

  const saveCurrentOffer = useCallback(() => {
    saveOffer(offerData);
    alert("Oferta është ruajtur me sukses!");
  }, [saveOffer, offerData]);

  const resetForm = useCallback(() => {
    const newOfferId = generateOfferId();
    setCurrentOfferId(newOfferId);
    setFormState({
      client: { name: "", email: "" },
      offer: {
        number: `OFF-${new Date().getFullYear()}-${String(Date.now()).slice(
          -6
        )}`,
        date: new Date().toISOString().split("T")[0],
        validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      products: [{ ...DEFAULT_PRODUCT, id: generateOfferId() }],
      notes: "",
    });
  }, [generateOfferId]);

  const handleNotesChange = useCallback((value: string) => {
    setFormState((prev) => ({ ...prev, notes: value }));
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    try {
      await generateOfferPDF(offerData);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Ka ndodhur një gabim gjatë krijimit të PDF-së. Ju lutemi provoni përsëri."
      );
    }
  }, [offerData]);

  const exportToJSON = useCallback(() => {
    const dataStr = JSON.stringify(offerData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `oferta-${offerData.offerNumber}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }, [offerData]);

  const calculateStats = useMemo(() => {
    const productCount = formState.products.length;
    const totalAmount = offerData.totalAmount;
    const averagePrice = productCount > 0 ? totalAmount / productCount : 0;
    const totalItems = formState.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    return {
      productCount,
      totalAmount,
      averagePrice,
      totalItems,
    };
  }, [formState.products, offerData.totalAmount]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Krijimi i Ofertës
        </h1>
        <p className="text-gray-600">
          Plotësoni të dhënat për të krijuar një ofertë të re
        </p>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 font-medium">Produktet</div>
            <div className="text-2xl font-bold text-blue-700">
              {calculateStats.productCount}
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 font-medium">Totali</div>
            <div className="text-2xl font-bold text-green-700">
              €{calculateStats.totalAmount.toFixed(2)}
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 font-medium">Mesatarja</div>
            <div className="text-2xl font-bold text-purple-700">
              €{calculateStats.averagePrice.toFixed(2)}
            </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="text-sm text-orange-600 font-medium">Artikuj</div>
            <div className="text-2xl font-bold text-orange-700">
              {calculateStats.totalItems}
            </div>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Të dhënat e klientit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emri i klientit
            </label>
            <input
              type="text"
              value={formState.client.name}
              onChange={(e) => handleClientChange("name", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Shkruani emrin e klientit"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formState.client.email}
              onChange={(e) => handleClientChange("email", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="client@example.com"
            />
          </div>
        </div>
      </div>

      {/* Offer Information */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Të dhënat e ofertës
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numri i ofertës
            </label>
            <input
              type="text"
              value={formState.offer.number}
              onChange={(e) => handleOfferChange("number", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data e ofertës
            </label>
            <input
              type="date"
              value={formState.offer.date}
              onChange={(e) => handleOfferChange("date", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vlen deri më
            </label>
            <input
              type="date"
              value={formState.offer.validUntil}
              onChange={(e) => handleOfferChange("validUntil", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Product Templates */}
      <ProductTemplates onSelectTemplate={addProductFromTemplate} />

      {/* Products Section */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Produktet</h2>
            <button
              onClick={addProduct}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              type="button"
            >
              + Shto produkt
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="p-4">
          {formState.products.map((product, index) => (
            <div key={product.id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-700">
                  Produkti {index + 1}
                </h3>
                <span className="text-sm text-gray-500">
                  Total: €{(product.totalPrice || 0).toFixed(2)}
                </span>
              </div>
              <ProductRow
                product={product}
                onUpdate={updateProduct}
                onRemove={removeProduct}
              />
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">
              Totali i përgjithshëm:
            </span>
            <span className="text-2xl font-bold text-green-600">
              €{offerData.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {formState.products.length} produkt
            {formState.products.length !== 1 ? "e" : ""}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Shënime shtesë
        </h2>
        <textarea
          value={formState.notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Shënime shtesë për ofertën..."
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-end">
        <button
          onClick={resetForm}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Fillo përsëri
        </button>
        <button
          onClick={saveCurrentOffer}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Ruaj ofertën
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Shkarko PDF
        </button>
        <button
          onClick={exportToJSON}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Exporto JSON
        </button>
      </div>
    </div>
  );
};

export default OfferForm;
