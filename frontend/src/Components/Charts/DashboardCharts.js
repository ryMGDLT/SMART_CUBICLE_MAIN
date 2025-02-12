import React from "react";
import { Bar, Line } from "react-chartjs-2";

// Import chart data and options
import {
  resourcesChartData,
  trendsChartData,
  usageData,
  chartOptions,
  resourcesChartOptions,
  trendsChartOptions,
} from "../../data/ChartData";

// Resources Usage Chart Component
export const ResourcesUsageChart = ({
  chartType,
  setShowChartDropdown,
  showChartDropdown,
  setChartType,
  dropdownRef,
}) => {
  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Resources Usage</h2>
        <div className="relative" ref={dropdownRef}>
          {/* Dropdown Toggle Button */}
          <button
            onClick={() => setShowChartDropdown(!showChartDropdown)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
          {/* Dropdown Menu */}
          {showChartDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#23897D] rounded-md shadow-lg py-1 z-10">
              {["Bar Chart", "Line Chart"].map((type, index) => (
                <React.Fragment key={index}>
                  <div
                    className="px-4 py-2 hover:bg-[#1a6b5f] flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setChartType(type.toLowerCase().split(" ")[0]);
                      setShowChartDropdown(false);
                    }}
                  >
                    <span className="text-sm text-white">{type}</span>
                  </div>
                  {index < ["Bar Chart", "Line Chart"].length - 1 && (
                    <div className="h-[1px] bg-white mx-[-10px]"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Chart Section */}
      <div className="w-full h-full flex-grow overflow-hidden">
        {chartType === "bar" ? (
          <Bar
            data={resourcesChartData(chartType)}
            options={{
              ...resourcesChartOptions,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        ) : (
          <Line
            data={resourcesChartData(chartType)}
            options={{
              ...resourcesChartOptions,
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 6,
                  hoverRadius: 8,
                  hitRadius: 10,
                  borderWidth: 2,
                  fill: true,
                  backgroundColor: "transparent",
                  borderColor: (context) => {
                    const chart = context.chart;
                    const { datasetIndex } = context.dataPoint;
                    return chart.data.datasets[datasetIndex].borderColor;
                  },
                },
                pointStyle: "circle",
              },
            }}
          />
        )}
      </div>
    </div>
  );
};
// Trends Over Time Chart Component
export const TrendsOverTimeChart = ({
  trendsChartType,
  setShowTrendsDropdown,
  showTrendsDropdown,
  setTrendsChartType,
  dropdownRef,
}) => {
  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Trends Over Time</h2>
        <div className="relative" ref={dropdownRef}>
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setShowTrendsDropdown(!showTrendsDropdown)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
          {showTrendsDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#23897D] rounded-md shadow-lg py-1 z-10">
              {["Bar Chart", "Line Chart"].map((type, index) => (
                <React.Fragment key={index}>
                  <div
                    className="px-4 py-2 hover:bg-[#1a6b5f] flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setTrendsChartType(type.toLowerCase().split(" ")[0]);
                      setShowTrendsDropdown(false);
                    }}
                  >
                    <span className="text-sm text-white">{type}</span>
                  </div>
                  {index < ["Bar Chart", "Line Chart"].length - 1 && (
                    <div className="h-[1px] bg-white mx-[-10px]"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Chart Section */}
      <div className="w-full h-full flex-grow overflow-hidden">
        {trendsChartType === "bar" ? (
          <Bar
            data={trendsChartData(trendsChartType)}
            options={{
              ...trendsChartOptions,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        ) : (
          <Line
            data={trendsChartData(trendsChartType)}
            options={{
              ...trendsChartOptions,
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 6,
                  hoverRadius: 8,
                  hitRadius: 10,
                  borderWidth: 2,
                  fill: true,
                  backgroundColor: "transparent",

                  borderColor: (context) => {
                    const chart = context.chart;
                    const { datasetIndex } = context.dataPoint;
                    return chart.data.datasets[datasetIndex].borderColor;
                  },
                },
                pointStyle: "circle",
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

// Usage Monitoring Chart Component
export const UsageMonitoringChart = ({ showHeading = true }) => {
  return (
    <div className="flex flex-col h-full">
      {showHeading && (
        <h2 className="text-xl font-bold mb-5">Usage Monitoring</h2>
      )}
      <div className="relative w-full h-full">
        <Line
          data={usageData}
          options={{
            ...chartOptions,
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 20,
                right: 20,
                bottom: 10,
                left: 10,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  drawBorder: false,
                },
                ticks: {
                  padding: 10,
                },
              },
              x: {
                grid: {
                  drawBorder: false,
                },
                ticks: {
                  padding: 10,
                },
              },
            },
            elements: {
              point: {
                radius: 4,
                hoverRadius: 6,
                hitRadius: 8,
                borderWidth: 2,
                backgroundColor: "white",
              },
              line: {
                tension: 0.3,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  boxWidth: 15,
                  padding: 15,
                  usePointStyle: true,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
