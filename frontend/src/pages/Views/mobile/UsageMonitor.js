import React from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ChevronUp, ChevronDown, Printer } from 'heroicons-react';
import { JANITOR_SCHEDULE_DATA, DEFAULT_PROFILE_IMAGE, USAGE_MONITOR_DATA } from '../../../data/placeholderData';
import CardUsageReport from '../../../Components/ui/cardUsageReport';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function UsageMonitor() {
  // Complete usage data definition
  const usageData = {
    labels: [
      "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 NN",
      "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
    ],
    datasets: [
      {
        label: "Usage",
        data: [65, 15, 25, 20, 35, 18, 60, 22, 45, 50, 85, 40],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: function(context) {
          const index = context.dataIndex;
          const chart = context.chart;
          const peakDataset = chart.getDatasetMeta(1);
          if (!peakDataset.hidden && index === 10) {
            return "rgba(255, 99, 132, 1)";
          } else if (peakDataset.hidden && index === 10) {
            return "rgba(54, 162, 235, 1)";
          }
          return "rgba(54, 162, 235, 1)";
        },
        pointRadius: function(context) {
          const index = context.dataIndex;
          const chart = context.chart;
          const peakDataset = chart.getDatasetMeta(1);
          if (!peakDataset.hidden && index === 10) {
            return 6;
          } else if (peakDataset.hidden && index === 10) {
            return 4;
          }
          return 4;
        },
        tension: 0.4,
      },
      {
        label: "Peak Usage Point",
        data: [null, null, null, null, null, null, null, null, null, null, 85, null],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 6,
        borderWidth: 1,
        hidden: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const chart = tooltipItem.chart;
            const peakDataset = chart.getDatasetMeta(1);
            const isPeakShown = !peakDataset.hidden;
            const dataIndex = tooltipItem.dataIndex;

            if (isPeakShown && dataIndex === 10 && tooltipItem.dataset.label === "Usage") {
              return `Peak: ${tooltipItem.raw} Users`;
            }
            if (tooltipItem.dataset.label === "Peak Usage Point") {
              return null;
            }
            return `Usage: ${tooltipItem.raw} Users`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
    },
  };


  return (
    <div className="flex flex-col p-2 space-y-4">
      {/* Usage Monitor Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-2">
          <h1 className="font-bold text-lg">Usage Monitor</h1>
        </div>
        <div className="h-[40vh]">
          <Line data={usageData} options={chartOptions} />
        </div>
      </div>

      {/* Usage Reports Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <CardUsageReport isMobile={true} />
      </div>

      {/* Container for equal height divisions */}
      <div className="grid grid-cols-1 gap-4">
        {/* Inventory Table Section */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-[50vh]">
          {/* Header Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg">Inventory</h2>
              <div className="flex items-center gap-2">
                <button className="bg-teal-600 text-white px-2 py-1 text-sm rounded-lg hover:bg-teal-700">
                  Generate Graph
                </button>
                <button className="bg-white text-teal-600 p-1 rounded-lg hover:bg-teal-700">
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm">
              <ChevronUp className="w-4 h-4 text-gray-500 cursor-pointer" />
              <span className="text-gray-700 font-bold">June 2024</span>
              <ChevronDown className="w-4 h-4 text-gray-500 cursor-pointer" />
            </div>
          </div>

          {/* Table Container */}
          <div className="min-h-0 flex-1">
            <div className="h-full overflow-auto">
              <table className="w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-1.5 text-left font-medium text-gray-900 text-xs bg-gray-50">Time Stamp</th>
                    <th className="px-3 py-1.5 text-left font-medium text-gray-900 text-xs bg-gray-50">Capacity</th>
                    <th className="px-3 py-1.5 text-left font-medium text-gray-900 text-xs bg-gray-50">Water Level</th>
                    <th className="px-3 py-1.5 text-left font-medium text-gray-900 text-xs bg-gray-50">Odor</th>
                    <th className="px-3 py-1.5 text-left font-medium text-gray-900 text-xs bg-gray-50">Temperature</th>
                    <th className="px-3 py-1.5 text-left font-medium text-gray-900 text-xs bg-gray-50">Action Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {USAGE_MONITOR_DATA.map((row, index) => (
                    <tr key={index} className="text-xs hover:bg-gray-50">
                      <td className="px-3 py-1.5 whitespace-nowrap">{row.timeStamp}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <div>
                          <div className={row.capacity.color + " font-medium"}>{row.capacity.value}</div>
                          <div className={row.capacity.color + " text-[10px]"}>{row.capacity.status}</div>
                        </div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <div>
                          <div className={row.waterLevel.color + " font-medium"}>{row.waterLevel.value}</div>
                          <div className={row.waterLevel.color + " text-[10px]"}>{row.waterLevel.status}</div>
                        </div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <div className={row.odor.color}>{row.odor.value}</div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <div>
                          <div className={row.temperature.color + " font-medium"}>{row.temperature.value}</div>
                          <div className={row.temperature.color + " text-[10px]"}>{row.temperature.status}</div>
                        </div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <div className={
                          row.actionRequired.includes("Urgent") || row.actionRequired.includes("Immediate") ? "text-red-500" :
                          row.actionRequired.includes("soon") || row.actionRequired.includes("Schedule") ? "text-yellow-500" :
                          "text-green-500"
                        }>
                          {row.actionRequired}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Janitors Schedule Section */}
        <div className="bg-white rounded-lg shadow-md p-4 h-[50vh]">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Janitors Schedule</h2>
              <div className="flex items-center gap-1.5">
                <button className="bg-teal-600 text-white px-1 py-1 text-sm rounded-lg hover:bg-teal-700">
                  Generate Schedule
                </button>
                <button className="bg-white text-teal-600 p-1 rounded-lg hover:bg-teal-700">
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Janitor Schedule Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full divide-y divide-gray-200 bg-white text-xs">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-2 py-2 text-left font-medium text-gray-900">Name</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-900">Last Cleaning</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-900">Scheduled</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-900">Status</th>
                    <th className="px-2 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {JANITOR_SCHEDULE_DATA.map((row, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img src={DEFAULT_PROFILE_IMAGE} alt={row.janitor} className="w-6 h-6 rounded-full" />
                          <span>{row.janitor}</span>
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">{row.lastCleaning}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{row.scheduled}</td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className={
                          row.status === "Done" ? "text-green-500" :
                          row.status === "Overdue" ? "text-red-500" :
                          "text-yellow-500"
                        }>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-right whitespace-nowrap">s
                        <button className="text-gray-500 hover:text-gray-700">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
