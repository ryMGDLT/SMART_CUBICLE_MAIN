import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { EllipsisIcon } from "lucide-react";
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
export const ResourcesUsageChart = () => {
  const [resourceChartType, setResourceChartType] = useState("bar");

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold">Resources Usage</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 border border-gray-200">
              <EllipsisIcon className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setResourceChartType("bar")}>
              Bar Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setResourceChartType("line")}>
              Line Chart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full h-full flex-grow overflow-hidden">
        {resourceChartType === "bar" ? (
          <Bar
            data={resourcesChartData(resourceChartType)}
            options={{
              ...resourcesChartOptions,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        ) : (
          <Line
            data={resourcesChartData(resourceChartType)}
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
export const TrendsOverTimeChart = () => {
  const [trendsChartType, setTrendsChartType] = useState("line");

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold">Trends Over Time</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 border border-gray-200">
              <EllipsisIcon className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTrendsChartType("bar")}>
              Bar Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTrendsChartType("line")}>
              Line Chart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
export const UsageMonitoringChart = () => {
  const [usageChartType, setUsageChartType] = useState("line");

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold">Usage Monitor</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 border border-gray-200">
              <EllipsisIcon className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setUsageChartType("bar")}>
              Bar Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUsageChartType("line")}>
              Line Chart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative w-full h-full">
        {usageChartType === "bar" ? (
          <Bar data={usageData(usageChartType)} options={chartOptions} />
        ) : (
          <Line data={usageData(usageChartType)} options={chartOptions} />
        )}
      </div>
    </div>
  );
};
