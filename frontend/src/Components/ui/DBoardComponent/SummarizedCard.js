import React from "react";

export default function SummarizedReport({
  selectedPeriod,
  setSelectedPeriod,
  allMetrics,
  selectedMetrics,
  toggleMetric,
  showDropdown,
  setShowDropdown,
  dropdownRef, // Add dropdownRef prop
}) {
  return (
    <div>
      <div className="flex flex-col space-y-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold">Summarized Report</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {/* Period Selector */}
            <div className="flex gap-2">
              <div className="flex space-x-0">
                {["Daily", "Weekly", "Monthly"].map((period, index) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 text-sm transition-colors ${
                      selectedPeriod === period
                        ? "bg-teal-600 text-white hover:bg-teal-800"
                        : "border border-gray-300 hover:bg-gray-300"
                    } ${
                      index === 0
                        ? "rounded-l-md"
                        : index === 2
                        ? "rounded-r-md"
                        : ""
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Dropdown */}
            <div className="relative" ref={dropdownRef}> {/* Add ref here */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" />
                </svg>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {allMetrics.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                      onClick={() => toggleMetric(item)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(item)}
                        readOnly
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div
          className={`flex ${
            selectedMetrics.length < 5
              ? "justify-center"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          } gap-4`}
        >
          {[
            {
              id: "Usage Peak Hour",
              title: "Usage Peak Hours",
              values: {
                Daily: "12:00",
                Weekly: "2:00",
                Monthly: "3:00",
              },
              unit: "PM",
            },
            {
              id: "Total Cleaning Time",
              title: "Total Cleaning Time",
              values: { Daily: "4.5", Weekly: "32", Monthly: "128" },
              unit: "Hours",
            },
            {
              id: "Recommended Cleaning Time",
              title: (
                <>
                  <span className="text-red-600">Recommended</span>{" "}
                  <span className="text-black">Cleaning</span>
                </>
              ),
              values: {
                Daily: "3:00",
                Weekly: "4:00",
                Monthly: "2:00",
              },
              unit: "PM",
            },
            {
              id: "Total Resources Restocked",
              title: "Resources Restocked",
              values: { Daily: "30", Weekly: "210", Monthly: "900" },
              unit: "L",
            },
            {
              id: "Recommended Resources",
              title: (
                <>
                  <span className="text-red-600">Recommended</span>{" "}
                  <span className="text-black">Restock</span>
                </>
              ),
              values: {
                Daily: "5:00",
                Weekly: "3:00",
                Monthly: "1:00",
              },
              unit: "PM",
            },
          ]
            .filter((card) => selectedMetrics.includes(card.id))
            .map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col"
              >
                <div className="text-sm font-bold">{card.title}</div>
                <div className="flex items-baseline mt-1">
                  <span className="text-xl font-semibold">
                    {card.values[selectedPeriod]}
                  </span>
                  <span className="text-gray-500 ml-1">{card.unit}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}