"use client";
import React, { useState } from "react";
import OfferForm from "@/components/OfferForm";
import OfferList from "@/components/OfferList";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">
                  Nura - Sistem Ofertash
                </h1>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("create")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "create"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Krijo Ofertë
                </button>
                <button
                  onClick={() => setActiveTab("list")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "list"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Ofertat e ruajtura
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="py-8">
        {activeTab === "create" ? <OfferForm /> : <OfferList />}
      </main>
    </div>
  );
};

export default HomePage;
