import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronUp, ChevronDown, Printer } from "heroicons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  JANITOR_SCHEDULE_DATA,
  DEFAULT_PROFILE_IMAGE,
  USAGE_MONITOR_DATA,
} from "../../../data/placeholderData";
import CardUsageReport from "../../../Components/ui/cardUsageReport";

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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleMonthChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  // Usage Monitoring Chart Data
  const usageData = {
    labels: [
      "7:00 AM",
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 NN",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
    ],
    datasets: [
      {
        label: "Usage",
        data: [65, 15, 25, 20, 35, 18, 60, 22, 45, 50, 85, 40],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: function (context) {
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
        pointRadius: function (context) {
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
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          85,
          null,
        ],
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
          label: function (tooltipItem) {
            const chart = tooltipItem.chart;
            const peakDataset = chart.getDatasetMeta(1);
            const isPeakShown = !peakDataset.hidden;
            const dataIndex = tooltipItem.dataIndex;

            if (
              isPeakShown &&
              dataIndex === 10 &&
              tooltipItem.dataset.label === "Usage"
            ) {
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
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-md p-1 rounded-lg">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-h-0 p-4 gap-4">
        {/* Top Row */}

        <div className="flex gap-4" style={{ height: "45%" }}>
          {/* Usage Monitor Chart */}
          <div className="w-2/3 bg-white rounded-lg shadow-md border flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold text-2xl">Usage Monitor</h2>
              <div className="flex items-center gap-4">
                <button className="bg-Icpetgreen text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                  Generate Graph
                </button>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Printer className="w-5 h-5 text-Icpetgreen" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 min-h-0">
              <Line
                data={usageData}
                options={{
                  ...chartOptions,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          {/* Usage Report Card */}
          <div className="w-1/3 bg-white rounded-lg shadow-md border">
            <div className="h-full">
              <CardUsageReport />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex gap-4 flex-1">
          {/* Inventory Table */}
          <div className="w-2/3 bg-white rounded-lg shadow-md border flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <h2 className="font-bold text-2xl">Inventory</h2>
              <div className="flex items-center justify-between relative w-1/5">
                <ChevronUp
                  className="w-7 h-7 text-gray-500 cursor-pointer hover:text-gray-700 rounded-lg border border-gray-200"
                  onClick={() => handleMonthChange(1)}
                />
                <div className="relative inline-block">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    showPopperArrow={false}
                    popperContainer={({ children }) => (
                      <div className="absolute z-[9999] mt-2">{children}</div>
                    )}
                    customInput={
                      <span className="text-gray-700 font-medium cursor-pointer">
                        {selectedDate.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    }
                  />
                </div>
                <ChevronDown
                  className="w-7 h-7 text-gray-500 cursor-pointer hover:text-gray-700 rounded-lg border border-gray-200"
                  onClick={() => handleMonthChange(-1)}
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-Icpetgreen text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                  Generate Graph
                </button>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Printer className="w-5 h-5 text-Icpetgreen" />
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 min-h-0">
              <div className="h-full relative">
                {/* Sticky Header */}
                <div className="sticky top-0 bg-gray-50 border-b z-10">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="w-40 p-4 text-left font-medium text-gray-900"
                        >
                          Time Stamp
                        </th>
                        <th
                          scope="col"
                          className="w-32 p-4 text-left font-medium text-gray-900"
                        >
                          Capacity
                        </th>
                        <th
                          scope="col"
                          className="w-32 p-4 text-left font-medium text-gray-900"
                        >
                          Water Level
                        </th>
                        <th
                          scope="col"
                          className="w-24 p-4 text-left font-medium text-gray-900"
                        >
                          Odor
                        </th>
                        <th
                          scope="col"
                          className="w-32 p-4 text-left font-medium text-gray-900"
                        >
                          Temperature
                        </th>
                        <th
                          scope="col"
                          className="w-48 p-4 text-left font-medium text-gray-900"
                        >
                          Action Required
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>

                {/* Scrollable Body */}
                <div
                  className="overflow-y-auto absolute inset-0 pt-12"
                  style={{ height: "calc(100%)" }}
                >
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {USAGE_MONITOR_DATA.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="w-40 p-4 text-gray-700 whitespace-nowrap">
                            {row.timeStamp}
                          </td>
                          <td className="w-32 p-4 whitespace-nowrap">
                            <div className={row.capacity.color}>
                              {row.capacity.value}
                              <div className="text-xs">
                                {row.capacity.status}
                              </div>
                            </div>
                          </td>
                          <td className="w-32 p-4 whitespace-nowrap">
                            <div className={row.waterLevel.color}>
                              {row.waterLevel.value}
                              <div className="text-xs">
                                {row.waterLevel.status}
                              </div>
                            </div>
                          </td>
                          <td className="w-24 p-4 whitespace-nowrap">
                            <div className={row.odor.color}>
                              {row.odor.value}
                            </div>
                          </td>
                          <td className="w-32 p-4 whitespace-nowrap">
                            <div className={row.temperature.color}>
                              {row.temperature.value}
                              <div className="text-xs">
                                {row.temperature.status}
                              </div>
                            </div>
                          </td>
                          <td className="w-48 p-4 whitespace-nowrap">
                            <div
                              className={
                                row.actionRequired.includes("Urgent") ||
                                row.actionRequired.includes("Immediate")
                                  ? "text-red-500"
                                  : row.actionRequired.includes("soon") ||
                                    row.actionRequired.includes("Schedule")
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }
                            >
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
          </div>

          {/* Janitors Schedule Table */}
          <div className="w-1/3 bg-white rounded-lg shadow-md border flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold text-2xl">Janitors Schedule</h2>
              <div className="flex items-center gap-4">
                <button className="bg-Icpetgreen text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                  Generate
                </button>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Printer className="w-5 h-5 text-Icpetgreen" />
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="relative flex-1 overflow-hidden">
              {/* Sticky Header */}
              <div className="absolute top-0 inset-x-0 bg-gray-50 border-b z-10">
                <div className="flex px-4 py-3">
                  <div className="w-48 font-medium text-gray-900">Name</div>
                  <div className="w-32 font-medium text-gray-900">
                    Last Cleaning
                  </div>
                  <div className="w-32 font-medium text-gray-900">
                    Scheduled
                  </div>
                  <div className="w-24 font-medium text-gray-900">Status</div>
                  <div className="w-10"></div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto absolute inset-0 pt-12">
                {JANITOR_SCHEDULE_DATA.map((row, index) => (
                  <div
                    key={index}
                    className="flex items-center px-4 py-3 border-b hover:bg-gray-50"
                  >
                    <div className="w-48">
                      <div className="flex items-center gap-2">
                        <img
                          src={DEFAULT_PROFILE_IMAGE}
                          alt={row.janitor}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="truncate">{row.janitor}</span>
                      </div>
                    </div>
                    <div className="w-32">{row.lastCleaning}</div>
                    <div className="w-32">{row.scheduled}</div>
                    <div className="w-24">
                      <span
                        className={
                          row.status === "Done"
                            ? "text-green-500"
                            : row.status === "Overdue"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }
                      >
                        {row.status}
                      </span>
                    </div>
                    <div className="w-10 flex justify-end">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
}
