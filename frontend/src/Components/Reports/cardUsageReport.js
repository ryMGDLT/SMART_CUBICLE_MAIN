import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "heroicons-react";
import { USAGE_CARD_REPORT_DATA } from "../../data/placeholderData";

export default function CardUsageReport() {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(USAGE_CARD_REPORT_DATA.length / cardsPerPage);

  const startIndex = currentPage * cardsPerPage;
  const visibleCards = USAGE_CARD_REPORT_DATA.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`p-1.5 rounded hover:bg-gray-100 ${
            currentPage === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-600 font-medium">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`p-1.5 rounded hover:bg-gray-100 ${
            currentPage === totalPages - 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {visibleCards.map((card, index) => (
          <div
            key={startIndex + index}
            className="bg-white shadow-sm rounded-lg p-4 flex flex-col h-[130px] border border-gray-200"
          >
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div className="text-gray-900 font-medium text-sm">
                  {card.title}
                </div>
                {card.isLive && (
                  <div className="text-red-600 font-semibold text-xs bg-red-50 px-2 py-0.5 rounded">
                    LIVE!
                  </div>
                )}
              </div>
              <div className="text-xl font-bold text-gray-900">
                {card.count} People
              </div>
            </div>
            <button className="flex items-center justify-between w-full bg-Icpetgreen text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-opacity-90 transition-colors">
              <span>View Report</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
