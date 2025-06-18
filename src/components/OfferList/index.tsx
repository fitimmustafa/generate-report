import React, { useCallback } from "react";
import { useOfferStorage } from "@/hooks/useOfferStorage";
import { OfferData } from "@/types/offer";
import { generateOfferPDF } from "../PDFGenerator";

const OfferList: React.FC = () => {
  const { offers, deleteOffer, isLoading } = useOfferStorage();

  const handleDelete = useCallback(
    (offerId: string, offerNumber: string) => {
      if (
        confirm(
          `A jeni të sigurt që dëshironi të fshini ofertën ${offerNumber}?`
        )
      ) {
        deleteOffer(offerId);
      }
    },
    [deleteOffer]
  );

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("sq-AL");
  }, []);

  const handleDownloadPDF = useCallback(async (offer: OfferData) => {
    try {
      await generateOfferPDF(offer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Ka ndodhur një gabim gjatë krijimit të PDF-së. Ju lutemi provoni përsëri."
      );
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Duke u ngarkuar...</div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-500 mb-4">Nuk ka oferta të ruajtura</div>
        <p className="text-sm text-gray-400">
          Krijoni ofertën e parë për ta parë këtu
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ofertat e ruajtura
        </h1>
        <p className="text-gray-600">Menaxhoni ofertat e krijuara</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numri i ofertës
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klienti
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produktet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veprimet
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {offers.map((offer: OfferData) => (
                <tr key={offer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {offer.offerNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      Krijuar: {formatDate(offer.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {offer.clientName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {offer.clientEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(offer.date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Vlen deri: {formatDate(offer.validUntil)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {offer.products.length} produkte
                    </div>
                    <div className="text-sm text-gray-500">
                      Total:{" "}
                      {offer.products.reduce(
                        (sum, product) => sum + product.quantity,
                        0
                      )}{" "}
                      copë
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleDownloadPDF(offer)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Shkarko PDF
                    </button>
                    <button
                      onClick={() => handleDelete(offer.id, offer.offerNumber)}
                      className="text-red-600 hover:text-red-900 transition-colors ml-4"
                    >
                      Fshij
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OfferList;
