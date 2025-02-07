import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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
import { ChevronUp, ChevronDown, Pencil, Printer } from "heroicons-react";
import { RESOURCES_DATA, REMINDERS_DATA } from "../../../data/placeholderData";
import ReminderCard from "../../../Components/ui/reminderCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/datepicker-custom.css";

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

export default function MobileResources() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("inventory");
  const itemsPerPage = 4;

  // Add the missing data definitions
  // Bar chart data
  const barData = {
    labels: [
      "Water Usage",
      "Bleach (Toilet)",
      "Bleach (Walls & Floor)",
      "Detergent",
    ],
    datasets: [
      {
        label: "Actual Usage",
        data: [6, 4, 8, 8],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        label: "Recommended",
        data: [4, 8, 4, 6],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  };

  // Line chart data
  const lineData = {
    labels: ["1st Week", "2nd Week", "3rd Week", "4th Week", "5th Week"],
    datasets: [
      {
        label: "Cleaning Pattern",
        data: [2, 3, 4, 4.5, 5],
        borderColor: "rgba(54, 162, 235, 0.8)",
        tension: 0.4,
      },
      {
        label: "Resources Consumed",
        data: [2, 2.5, 3, 3.5, 4],
        borderColor: "rgba(75, 192, 192, 0.8)",
        tension: 0.4,
      },
    ],
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RESOURCES_DATA.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(RESOURCES_DATA.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Chart options optimized for mobile
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: false,
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
        ticks: {
          font: {
            size: 10,
          },
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
    <div className="h-full flex flex-col">
      {/* Fixed Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-20">
        <button
          className={`flex-1 py-4 text-sm font-medium ${
            activeTab === "inventory"
              ? "text-Icpetgreen border-b-2 border-Icpetgreen"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </button>
        <button
          className={`flex-1 py-4 text-sm font-medium ${
            activeTab === "reminders"
              ? "text-Icpetgreen border-b-2 border-Icpetgreen"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reminders")}
        >
          Reminders
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "inventory" ? (
          <div className="h-full flex flex-col overflow-hidden bg-gray-50">
            {/* Charts Section - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {/* Resources Usage Chart */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-md">Resources Usage</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                      ...
                    </button>
                  </div>
                  <div className="h-[200px]">
                    <Bar
                      data={barData}
                      options={{ ...chartOptions, maintainAspectRatio: false }}
                    />
                  </div>
                </div>

                {/* Trends Chart */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-md">Trends Over Time</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                      ...
                    </button>
                  </div>
                  <div className="h-[200px]">
                    <Line
                      data={lineData}
                      options={{ ...chartOptions, maintainAspectRatio: false }}
                    />
                  </div>
                </div>

                {/* Inventory Table Section */}
                <div className="bg-white rounded-lg border border-gray-200">
                  {/* Table Header - Sticky */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <ChevronUp
                          className="w-7 h-7 text-gray-500 cursor-pointer hover:text-gray-700 rounded-lg border border-gray-200"
                          onClick={() => handleMonthChange(1)}
                        />
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="MMMM yyyy"
                          showMonthYearPicker
                          showPopperArrow={false}
                          customInput={
                            <span className="text-gray-700 font-medium cursor-pointer">
                              {selectedDate.toLocaleString("default", {
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          }
                        />
                        <ChevronDown
                          className="w-7 h-7 text-gray-500 cursor-pointer hover:text-gray-700 rounded-lg border border-gray-200"
                          onClick={() => handleMonthChange(-1)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-Icpetgreen text-white px-3 py-1.5 rounded-lg text-sm">
                          Generate
                        </button>
                        <button className="p-1.5 rounded-lg border border-gray-200">
                          <Printer className="w-4 h-4 text-Icpetgreen" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div className="divide-y divide-gray-200">
                    {currentItems.map((row, index) => (
                      <div key={index} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">
                            {row.resources}
                          </h3>
                          <button className="text-Icpetgreen">
                            <Pencil className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="text-gray-500">Current Stock</div>
                          <div className="text-gray-900">
                            {row.currentStock}
                          </div>
                          <div className="text-gray-500">Threshold</div>
                          <div className="text-gray-900">
                            {row.restockThreshold}
                          </div>
                          <div className="text-gray-500">Next Restock</div>
                          <div className="text-gray-900">
                            {row.nextRestockingDate}
                          </div>
                          <div className="text-gray-500">Status</div>
                          <div className="text-gray-900">{row.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination - Sticky */}
                  <div className="sticky bottom-0 border-t border-gray-200 p-2 bg-white">
                    <ol className="flex justify-center items-center gap-1 text-xs font-medium">
                      {/* Previous Button */}
                      <li>
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded border ${
                            currentPage === 1
                              ? "border-gray-200 bg-gray-50 text-gray-300"
                              : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronDown className="h-4 w-4 rotate-90" />
                        </button>
                      </li>

                      {/* Page Numbers */}
                      {pageNumbers.map((number) => (
                        <li key={number}>
                          <button
                            onClick={() => setCurrentPage(number)}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${
                              currentPage === number
                                ? "bg-Icpetgreen text-white"
                                : "text-gray-500 hover:bg-gray-100"
                            }`}
                          >
                            {number}
                          </button>
                        </li>
                      ))}

                      {/* Next Button */}
                      <li>
                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded border ${
                            currentPage === totalPages
                              ? "border-gray-200 bg-gray-50 text-gray-300"
                              : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                        </button>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Reminders Tab - Scrollable Content
          <div className="h-full overflow-y-auto bg-gray-50">
            <div className="p-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-xl">Reminders</h2>
                  <button className="text-sm text-green-600 bg-green-100 px-3 py-1.5 rounded-lg">
                    Janitors Usage
                  </button>
                </div>
                <div className="space-y-4">
                  {REMINDERS_DATA.map((reminderSection, idx) => (
                    <ReminderCard
                      key={idx}
                      date={reminderSection.date}
                      items={reminderSection.items}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
