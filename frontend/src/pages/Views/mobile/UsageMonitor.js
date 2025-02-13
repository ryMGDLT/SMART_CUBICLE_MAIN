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
import {
  JANITOR_SCHEDULE_DATA,
  DEFAULT_PROFILE_IMAGE,
  USAGE_MONITOR_DATA,
} from "../../../data/placeholderData";
import CardUsageReport from "../../../components/reports/cardUsageReport";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [activeTab, setActiveTab] = useState("monitor"); // monitor, inventory, schedule

  // Complete usage data definition
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
        labels: {
          boxWidth: 12,
          font: {
            size: 10,
          },
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
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  return (
    <div className="h-full flex flex-col p-2 gap-3 overflow-y-auto">
      {/* Tab Navigation */}
      <div className="flex gap-2 bg-white p-2 rounded-lg shadow-sm">
        <button
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
            activeTab === "monitor"
              ? "bg-Icpetgreen text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("monitor")}
        >
          Usage Monitor
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
            activeTab === "inventory"
              ? "bg-Icpetgreen text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
            activeTab === "schedule"
              ? "bg-Icpetgreen text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>
      </div>

      {/* Content Area */}
      {activeTab === "monitor" && (
        <div className="flex flex-col gap-4">
          {/* Usage Monitor Chart */}
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Usage Monitor</h2>
              <div className="flex items-center gap-2">
                <button className="bg-Icpetgreen text-white px-3 py-1.5 rounded-lg text-sm hover:bg-opacity-90">
                  Generate Graph
                </button>
                <button className="p-1.5 rounded-lg border border-gray-200">
                  <Printer className="w-5 h-5 text-Icpetgreen" />
                </button>
              </div>
            </div>
            <div className="h-[200px]">
              <Line data={usageData} options={chartOptions} />
            </div>
          </div>

          {/* Usage Report Cards */}
          <div className="bg-white rounded-lg shadow-sm">
            <CardUsageReport />
          </div>
        </div>
      )}

      {activeTab === "inventory" && (
        <div className="flex flex-col h-full">
          {/* Inventory Header */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Inventory</h2>
              <div className="flex items-center justify-between relative w-1/2">
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
            </div>
          </div>

          {/* Inventory Cards */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-3 pb-3">
              {USAGE_MONITOR_DATA.map((row, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {row.timeStamp}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Last Updated
                      </div>
                    </div>
                    <div
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        row.actionRequired.includes("Urgent") ||
                        row.actionRequired.includes("Immediate")
                          ? "bg-red-100 text-red-600"
                          : row.actionRequired.includes("soon") ||
                            row.actionRequired.includes("Schedule")
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {row.actionRequired.split(" ")[0]}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Capacity */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Capacity</span>
                        <span
                          className={`text-lg font-semibold ${row.capacity.color}`}
                        >
                          {row.capacity.value}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {row.capacity.status}
                      </div>
                    </div>

                    {/* Water Level */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          Water Level
                        </span>
                        <span
                          className={`text-lg font-semibold ${row.waterLevel.color}`}
                        >
                          {row.waterLevel.value}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {row.waterLevel.status}
                      </div>
                    </div>

                    {/* Temperature */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          Temperature
                        </span>
                        <span
                          className={`text-lg font-semibold ${row.temperature.color}`}
                        >
                          {row.temperature.value}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {row.temperature.status}
                      </div>
                    </div>

                    {/* Odor */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          Odor Level
                        </span>
                        <span
                          className={`text-lg font-semibold ${row.odor.color}`}
                        >
                          {row.odor.value}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "schedule" && (
        <div className="bg-white rounded-lg shadow-sm flex flex-col">
          {/* Schedule Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">Janitors Schedule</h2>
            <div className="flex items-center gap-2">
              <button className="bg-Icpetgreen text-white px-3 py-1.5 rounded-lg text-sm hover:bg-opacity-90">
                Generate
              </button>
              <button className="p-1.5 rounded-lg border border-gray-200">
                <Printer className="w-5 h-5 text-Icpetgreen" />
              </button>
            </div>
          </div>

          {/* Schedule List */}
          <div className="flex-1 overflow-y-auto">
            {JANITOR_SCHEDULE_DATA.map((janitor, index) => (
              <div
                key={index}
                className="flex items-center p-3 border-b hover:bg-gray-50"
              >
                <div className="flex items-center gap-2 flex-1">
                  <img
                    src={DEFAULT_PROFILE_IMAGE}
                    alt={janitor.janitor}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-sm">{janitor.janitor}</div>
                    <div className="text-xs text-gray-500">
                      {janitor.scheduled}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-sm ${
                    janitor.status === "Done"
                      ? "text-green-500"
                      : janitor.status === "Overdue"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {janitor.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
