import React from "react";
import { Bar, Line } from 'react-chartjs-2';
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
import { Pencil, ChevronUp, ChevronDown, Printer } from 'heroicons-react';
import { JANITOR_SCHEDULE_DATA, DEFAULT_PROFILE_IMAGE } from '../../../data/placeholderData';
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

  // First, add more table data for testing
  const tableData = [
    {
      timeStamp: '2025-01-16 08:00 AM',
      capacity: { value: '85%', status: 'High Capacity', color: 'text-red-500' },
      waterLevel: { value: '25%', status: 'Low', color: 'text-orange-500' },
      odor: { value: 'Moderate', color: 'text-yellow-500' },
      temperature: { value: '75°F', status: 'Normal', color: 'text-green-500' },
      actionRequired: 'Restock water resources soon'
    },
    // Add duplicate entries to ensure scrolling
    {
      timeStamp: '2025-01-16 09:00 AM',
      capacity: { value: '82%', status: 'High Capacity', color: 'text-red-500' },
      waterLevel: { value: '23%', status: 'Low', color: 'text-orange-500' },
      odor: { value: 'Moderate', color: 'text-yellow-500' },
      temperature: { value: '76°F', status: 'Normal', color: 'text-green-500' },
      actionRequired: 'Restock water resources soon'
    },
    // Add more entries...
  ];

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
        <div className="bg-white rounded-lg shadow-md p-4 h-[50vh]">
          <div className="flex flex-col h-full">
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex justify-between items-center">
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

            {/* Scrollable container - matching fourth division format */}
            <div className="flex-1 overflow-auto overflow-y-auto">
              <table className="w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-2 py-2 text-left font-medium text-gray-900 text-xs">TIME STAMP</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-900 text-xs">CAPACITY</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-900 text-xs">WATER LEVEL</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-900 text-xs">ODOR</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-900 text-xs">TEMPERATURE</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-900 text-xs">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs">
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 whitespace-nowrap">{row.timeStamp}</td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className={row.capacity.color}>
                          {row.capacity.value}
                          <div className="text-xs">({row.capacity.status})</div>
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className={row.waterLevel.color}>
                          {row.waterLevel.value}
                          <div className="text-xs">({row.waterLevel.status})</div>
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className={row.odor.color}>{row.odor.value}</div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className={row.temperature.color}>
                          {row.temperature.value}
                          <div className="text-xs">({row.temperature.status})</div>
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs">{row.actionRequired}</td>
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

            {/* Scrollable container */}
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
                      <td className="px-2 py-2 text-right whitespace-nowrap">
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
