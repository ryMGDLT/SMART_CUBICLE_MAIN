import React from "react";
import { ArrowRight } from "lucide-react";
import { USAGE_CARD_REPORT_DATA } from "../../data/placeholderData";

export default function CardUsageReport() {
  return (
    <div className="h-full overflow-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-2 p-2 h-full overflow-y-auto xl:overflow-none 2xl:overflow-none ">
        {USAGE_CARD_REPORT_DATA.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-lg p-2 flex flex-col justify-between border border-gray-200 2xl:min-h-full min-h-[130px]"
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-start">
                <div className="text-xs text-gray-500">
                  {card.isLive ? "LIVE!" : "Total"}
                </div>
                {card.isLive && (
                  <div className="text-red-600 font-semibold text-[10px] bg-red-50 px-1.5 py-0.5 rounded">
                    LIVE!
                  </div>
                )}
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {card.title}
              </div>
              <div className="text-base font-bold text-gray-900">
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
