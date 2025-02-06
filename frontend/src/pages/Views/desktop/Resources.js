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
import { RESOURCES_DATA } from "../../../data/placeholderData";
import ReminderCard from "../../../Components/ui/reminderCard";
import { REMINDERS_DATA } from "../../../data/placeholderData";
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

export default function Resources() {
  // Add these new state variables
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Import RESOURCES_DATA and calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RESOURCES_DATA.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(RESOURCES_DATA.length / itemsPerPage);

  // Add pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

  // Chart options
  const barOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Excessive Usage":
        return "text-red-500";
      case "Higher than Average":
        return "text-yellow-500";
      default:
        return "text-gray-700";
    }
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Main Container */}
      <div className="flex-1 flex flex-row gap-6 p-6 overflow-hidden bg-white shadow-md rounded-lg">
        {/* Left Content Area */}
        <div className="flex-[3] flex flex-col gap-6 min-w-0">
          {/* Charts Grid */}

          <div className="h-[320px] shrink-0">
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Resources Usage Chart */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-md">Resources Usage</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    ...
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  <Bar
                    data={barData}
                    options={{
                      ...barOptions,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </div>
              {/* Trends Chart */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-md">Trends Over Time</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    ...
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  <Line
                    data={lineData}
                    options={{
                      ...lineOptions,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Table Section */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Table Header */}
            <div className="flex items-center justify-between py-4">
              <h2 className="font-bold text-2xl">Inventory</h2>
              <div className="flex items-center justify-between relative w-1/6">
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
            <div className="flex-1 overflow-y-auto bg-white rounded-lg border border-gray-200">
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
                <table className="min-w-full table-fixed divide-y divide-gray-200 text-sm">
                  <thead>
                    <tr>
                      <th className="w-40 py-4 text-center font-medium text-gray-900">
                        Resources
                      </th>
                      <th className="w-24 py-4 text-center font-medium text-gray-900">
                        Current Stock
                      </th>
                      <th className="w-24 py-4 text-center font-medium text-gray-900">
                        Restock Threshold
                      </th>
                      <th className="w-40 py-4 text-center font-medium text-gray-900">
                        Restocking Time
                      </th>
                      <th className="w-32 py-4 text-center font-medium text-gray-900">
                        Restock
                      </th>
                      <th className="w-32 py-4 text-center font-medium text-gray-900">
                        Last Restocked
                      </th>
                      <th className="w-40 py-4 text-center font-medium text-gray-900">
                        Next Restocking Date
                      </th>
                      <th className="w-28 py-4 text-center font-medium text-gray-900">
                        Status
                      </th>
                      <th className="w-16 py-4"></th>
                    </tr>
                  </thead>
                </table>
              </div>
              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto">
                <table className="min-w-full table-fixed divide-y divide-gray-200 text-sm">
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((row, index) => (
                      <tr key={index}>
                        <td className="w-40 py-4 text-center text-gray-700">
                          {row.resources}
                        </td>
                        <td className="w-24 py-4 text-center text-gray-700">
                          {row.currentStock}
                        </td>
                        <td className="w-24 py-4 text-center text-gray-700">
                          {row.restockThreshold}
                        </td>
                        <td className="w-40 py-4 text-center text-gray-700">
                          {row.recommendedRestockingTime}
                        </td>
                        <td className="w-32 py-4 text-center text-gray-700">
                          {row.recommendedRestock}
                        </td>
                        <td className="w-32 py-4 text-center text-gray-700">
                          {row.lastRestocked}
                        </td>
                        <td className="w-40 py-4 text-center text-gray-700">
                          {row.nextRestockingDate}
                        </td>
                        <td className="w-28 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              row.status
                            )}`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="w-16 py-4">
                          <div className="flex justify-center">
                            <button className="text-Icpetgreen hover:text-gray-800 transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Sticky Pagination */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2">
                <ol className="flex justify-center gap-1 text-xs font-medium">
                  <li>
                    <button
                      onClick={handlePrevPage}
                      className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180 hover:bg-gray-50"
                      disabled={currentPage === 1}
                    >
                      <span className="sr-only">Prev Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                  {pageNumbers.map((page) => (
                    <li key={page}>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`h-8 w-8 rounded border ${
                          currentPage === page
                            ? "border-teal-600 bg-teal-600 text-white"
                            : "border-gray-100 bg-white text-gray-900 hover:bg-gray-50"
                        } text-center leading-8`}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleNextPage}
                      className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180 hover:bg-gray-50"
                      disabled={currentPage === totalPages}
                    >
                      <span className="sr-only">Next Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[400px] shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 h-full flex flex-col">
            {/* Header - Fixed */}
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h2 className="font-bold text-2xl">Reminder</h2>
              <button className="text-sm text-green-600 bg-green-100 px-3 py-1.5 rounded-lg hover:bg-green-200">
                Janitors Usage
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-2">
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
      </div>
    </div>
  );
}
