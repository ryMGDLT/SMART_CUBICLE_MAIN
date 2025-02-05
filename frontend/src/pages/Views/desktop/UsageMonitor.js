import React from 'react';
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
  // Usage Monitoring Chart Data
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
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          const datasetMeta = ci.getDatasetMeta(index);
          datasetMeta.hidden = !datasetMeta.hidden;
          ci.update();
        },
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
      },
      x: {
        grid: {
          display: true,
        },
        offset: true,
        ticks: {
          maxRotation: 0,
          minRotation: 0
        }
      },
    },
  };

  // Update the table data to match the image
  const tableData = [
    {
      timeStamp: '2025-01-16 08:00 AM',
      capacity: { value: '85%', status: 'High Capacity', color: 'text-red-500' },
      waterLevel: { value: '25%', status: 'Low', color: 'text-orange-500' },
      odor: { value: 'Moderate', color: 'text-yellow-500' },
      temperature: { value: '75°F', status: 'Normal', color: 'text-green-500' },
      actionRequired: 'Restock water resources soon'
    },
    // Duplicate entries to match image
    {
      timeStamp: '2025-01-16 08:00 AM',
      capacity: { value: '85%', status: 'High Capacity', color: 'text-red-500' },
      waterLevel: { value: '25%', status: 'Low', color: 'text-orange-500' },
      odor: { value: 'Moderate', color: 'text-yellow-500' },
      temperature: { value: '75°F', status: 'Normal', color: 'text-green-500' },
      actionRequired: 'Restock water resources soon'
    },
    {
      timeStamp: '2025-01-16 08:00 AM',
      capacity: { value: '85%', status: 'High Capacity', color: 'text-red-500' },
      waterLevel: { value: '25%', status: 'Low', color: 'text-orange-500' },
      odor: { value: 'Moderate', color: 'text-yellow-500' },
      temperature: { value: '75°F', status: 'Normal', color: 'text-green-500' },
      actionRequired: 'Restock water resources soon'
    },
    {
      timeStamp: '2025-01-16 08:00 AM',
      capacity: { value: '85%', status: 'High Capacity', color: 'text-red-500' },
      waterLevel: { value: '25%', status: 'Low', color: 'text-orange-500' },
      odor: { value: 'Moderate', color: 'text-yellow-500' },
      temperature: { value: '75°F', status: 'Normal', color: 'text-green-500' },
      actionRequired: 'Restock water resources soon'
    }
  ];



  return (
    <div className="flex p-4 rounded-lg shadow-md bg-white min-h-screen">
      <div className="grid grid-cols-3 gap-4 p-4 h-full">
        {/* Top Left Division - Spans 2 columns */}
        <div className="col-span-2 shadow-md bg-white rounded-lg p-4 border h-[45vh]">
          <div className="mb-2">
            <h1 className="font-bold text-xl">Usage Monitor</h1>
          </div>
          <div className="h-[calc(100%-2rem)]">
            <Line data={usageData} options={chartOptions} />
          </div>
        </div>

        {/* Top Right Division - Spans 1 column */}
        <div className="shadow-md bg-white rounded-lg p-4 border h-[45vh]">
          <div className="h-full">
            <CardUsageReport />
          </div>
        </div>

        {/* Bottom Left Division - Spans 2 columns */}
        <div className="col-span-2 shadow-md bg-white rounded-lg p-4 border h-[45vh]">
          {/* Header section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Inventory</h2>
            
            {/* Month Navigation */}
            <div className="flex items-center gap-2">
              <ChevronUp className="w-5 h-5 text-gray-500 cursor-pointer" />
              <span className="text-gray-700 font-bold">June 2024</span>
              <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
            </div>

            {/* Generate Graph and Print Buttons */}
            <div className="flex items-center gap-0">
              <button className="bg-teal-600 text-white px-2 py-1 rounded-lg hover:bg-teal-700">
                Generate Graph
              </button>
              <button className="bg-white text-teal-600 p-2 rounded-lg hover:bg-teal-700">
                <Printer className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Table section with fixed height and scroll */}
          <div className="h-[calc(100%-4rem)] overflow-auto">
            <div className="rounded-lg border border-gray-200">
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                  <thead className="sticky top-0 bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">TIME STAMP</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">CAPACITY</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">WATER LEVEL</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">ODOR</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">TEMPERATURE</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">ACTION REQUIRED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-gray-700">{row.timeStamp}</td>
                        <td className="px-4 py-3">
                          <div className={row.capacity.color}>
                            {row.capacity.value}
                            <div className="text-xs">({row.capacity.status})</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className={row.waterLevel.color}>
                            {row.waterLevel.value}
                            <div className="text-xs">({row.waterLevel.status})</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className={row.odor.color}>{row.odor.value}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className={row.temperature.color}>
                            {row.temperature.value}
                            <div className="text-xs">({row.temperature.status})</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{row.actionRequired}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Division - Spans 1 column */}
        <div className="shadow-md bg-white rounded-lg p-4 border h-[45vh]">
          {/* Header section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Janitors Schedule (Today)</h2>

            {/* Generate Schedule and Print Buttons */}
            <div className="flex items-center gap-2">
              <button className="bg-teal-600 text-white px-2 py-1 rounded-lg hover:bg-teal-700">
                Generate Schedule
              </button>
              <button className="bg-white text-teal-600 p-2 rounded-lg hover:bg-teal-700">
                <Printer className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Container with scroll */}
          <div className="h-[calc(100%-4rem)] overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Last Cleaning</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Scheduled</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {JANITOR_SCHEDULE_DATA.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img src={DEFAULT_PROFILE_IMAGE} alt={row.janitor} className="w-8 h-8 rounded-full" />
                        <span>{row.janitor}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.lastCleaning}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.scheduled}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={
                        row.status === "Done" ? "text-green-500" :
                        row.status === "Overdue" ? "text-red-500" :
                        "text-yellow-500"
                      }>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
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
  );
}
