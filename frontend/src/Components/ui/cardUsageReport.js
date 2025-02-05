import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'heroicons-react';
import { USAGE_CARD_REPORT_DATA } from '../../data/placeholderData';

function CardUsageReport({ isMobile = false }) {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = isMobile ? 3 : 6; // Show 3 cards in single column for mobile, 6 for desktop
  const totalPages = Math.ceil(USAGE_CARD_REPORT_DATA.length / cardsPerPage);
  
  const startIndex = currentPage * cardsPerPage;
  const visibleCards = USAGE_CARD_REPORT_DATA.slice(startIndex, startIndex + cardsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Navigation buttons */}
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 0}
          className={`p-1 rounded ${currentPage === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs text-gray-600">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button 
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`p-1 rounded ${currentPage === totalPages - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of cards */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 overflow-y-auto`}>
        {visibleCards.map((report, index) => (
          <div key={startIndex + index} className="bg-white rounded-lg shadow p-2">
            {/* Live indicator */}
            {report.isLive && (
              <div className="text-red-600 font-semibold text-xs mb-1">
                LIVE!
              </div>
            )}
            
            {/* Title */}
            <div className="text-black font-semibold text-sm mb-0.5">
              {report.title}
            </div>

            {/* Count */}
            <div className="text-xl font-bold text-black mb-2">
              {report.count} People
            </div>

            {/* View Report Button */}
            <button className="flex items-center justify-between w-full bg-Icpetgreen text-white py-1 px-2 rounded text-xs hover:bg-opacity-90">
              <span>View Report</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardUsageReport;
