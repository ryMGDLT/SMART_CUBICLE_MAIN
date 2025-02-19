import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

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
export const ResourcesUsageChart = ({ chartType, setChartType }) => {
  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Resources Usage</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            {chartType === "bar" ? "Bar Chart" : "Line Chart"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setChartType("bar")}>
              Bar Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChartType("line")}>
              Line Chart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
  setTrendsChartType,
}) => {
  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Trends Over Time</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            {trendsChartType === "bar" ? "Bar Chart" : "Line Chart"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTrendsChartType("bar")}>
              Bar Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTrendsChartType("line")}>
              Line Chart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
