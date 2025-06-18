import { useState, useEffect, useCallback, useMemo } from "react";
import { OfferData } from "@/types/offer";

const STORAGE_KEY = "nura-offers";

export const useOfferStorage = () => {
  const [offers, setOffers] = useState<OfferData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load offers from localStorage on mount
  useEffect(() => {
    try {
      const storedOffers = localStorage.getItem(STORAGE_KEY);
      if (storedOffers) {
        const parsedOffers = JSON.parse(storedOffers);
        setOffers(parsedOffers);
      }
    } catch (error) {
      console.error("Error loading offers from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save offers to localStorage whenever offers change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
      } catch (error) {
        console.error("Error saving offers to localStorage:", error);
      }
    }
  }, [offers, isLoading]);

  const saveOffer = useCallback((offerData: OfferData) => {
    setOffers((prev) => {
      const existingIndex = prev.findIndex(
        (offer) => offer.id === offerData.id
      );
      if (existingIndex >= 0) {
        // Update existing offer
        const updated = [...prev];
        updated[existingIndex] = {
          ...offerData,
          updatedAt: new Date().toISOString(),
        };
        return updated;
      } else {
        // Add new offer
        return [
          ...prev,
          {
            ...offerData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
      }
    });
  }, []);

  const deleteOffer = useCallback((offerId: string) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== offerId));
  }, []);

  const getOffer = useCallback(
    (offerId: string): OfferData | undefined => {
      return offers.find((offer) => offer.id === offerId);
    },
    [offers]
  );

  const generateOfferId = useCallback((): string => {
    return `offer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Memoize the sorted offers to prevent unnecessary re-sorting
  const sortedOffers = useMemo(() => {
    return offers.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [offers]);

  return {
    offers: sortedOffers,
    isLoading,
    saveOffer,
    deleteOffer,
    getOffer,
    generateOfferId,
  };
};
