import React, { useState, useMemo } from "react";
import { Trash, Pencil, Printer } from "heroicons-react";
import {
  JANITORS_DATA,
  DEFAULT_PROFILE_IMAGE,
} from "../../../data/placeholderData";

export default function Janitors() {
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredJanitors = useMemo(() => {
    return JANITORS_DATA.filter((janitor) => {
      // Check if the required properties exist based on activeTab
      const hasRequiredProperties =
        activeTab === "Basic Details"
          ? janitor.basicDetails
          : activeTab === "Schedule"
          ? janitor.schedule
          : activeTab === "Performance Track"
          ? janitor.performanceTrack
          : activeTab === "Resource Usage"
          ? janitor.resourceUsage
          : activeTab === "Logs and Report"
          ? janitor.logsReport
          : null;

      if (!hasRequiredProperties) return false;

      // Then do the search filtering
      return Object.values(hasRequiredProperties)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, activeTab]);

  // Memoize current items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredJanitors.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredJanitors, itemsPerPage]);

  // Memoize total pages
  const totalPages = useMemo(
    () => Math.ceil(filteredJanitors.length / itemsPerPage),
    [filteredJanitors, itemsPerPage]
  );

  // Memoize page numbers array
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleEdit = (id) => {
    console.log("Edit janitor:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete janitor:", id);
  };

  const renderTable = () => {
    switch (activeTab) {
      case "Basic Details":
        return (
          <div className="flex flex-col h-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-20 p-4 text-left text-xs font-medium text-gray-500">
                      Profile
                    </th>
                    <th className="w-48 p-4 text-left text-xs font-medium text-gray-500">
                      Name
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Employee ID
                    </th>
                    <th className="w-64 p-4 text-left text-xs font-medium text-gray-500">
                      Email
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Contact
                    </th>
                    <th className="w-24 p-4 text-left text-xs font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map(
                      (janitor, index) =>
                        janitor.basicDetails && (
                          <tr
                            key={`${activeTab}-${janitor.basicDetails.employeeId}-${index}`}
                          >
                            <td className="w-20 p-4 whitespace-nowrap">
                              <img
                                src={
                                  janitor.basicDetails.image ||
                                  DEFAULT_PROFILE_IMAGE
                                }
                                alt={janitor.basicDetails.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td className="w-48 p-4 whitespace-nowrap font-medium text-gray-900">
                              {janitor.basicDetails.name}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.basicDetails.employeeId}
                            </td>
                            <td className="w-64 p-4 whitespace-nowrap text-gray-700">
                              {janitor.basicDetails.email}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.basicDetails.contact}
                            </td>
                            <td className="w-24 p-4 whitespace-nowrap">
                              <div className="flex gap-2">
                                <button
                                  className="text-Icpetgreen hover:text-opacity-80"
                                  onClick={() =>
                                    handleEdit(janitor.basicDetails.employeeId)
                                  }
                                  aria-label="Edit"
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                  className="text-red-500 hover:text-opacity-80"
                                  onClick={() =>
                                    handleDelete(
                                      janitor.basicDetails.employeeId
                                    )
                                  }
                                  aria-label="Delete"
                                >
                                  <Trash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No results found. Please try a different search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2">
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
                          ? "border-Icpetgreen bg-Icpetgreen text-white"
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
        );

      case "Schedule":
        return (
          <div className="flex flex-col h-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-20 p-4 text-left text-xs font-medium text-gray-500">
                      Profile
                    </th>
                    <th className="w-48 p-4 text-left text-xs font-medium text-gray-500">
                      Name
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Date
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Shift
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Time In
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Time Out
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Cleaning Hour
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Task
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Status
                    </th>
                    <th className="w-24 p-4 text-left text-xs font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map(
                      (janitor, index) =>
                        janitor.schedule && (
                          <tr
                            key={`${activeTab}-${janitor.schedule.employeeId}-${index}`}
                          >
                            <td className="w-20 p-4 whitespace-nowrap">
                              <img
                                src={janitor.schedule.image}
                                alt={janitor.schedule.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td className="w-48 p-4 whitespace-nowrap font-medium text-gray-900">
                              {janitor.schedule.name}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.schedule.date}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.schedule.shift}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.schedule.timeIn}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.schedule.timeOut}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.schedule.cleaningHour}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.schedule.task}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  janitor.schedule.status === "On Time"
                                    ? "bg-green-100 text-green-800"
                                    : janitor.schedule.status === "Late"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {janitor.schedule.status}
                              </span>
                            </td>
                            <td className="w-24 p-4 whitespace-nowrap">
                              <div className="flex gap-2">
                                <button
                                  className="text-Icpetgreen hover:text-opacity-80"
                                  onClick={() =>
                                    handleEdit(janitor.schedule.employeeId)
                                  }
                                  aria-label="Edit"
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                  className="text-red-500 hover:text-opacity-80"
                                  onClick={() =>
                                    handleDelete(janitor.schedule.employeeId)
                                  }
                                  aria-label="Delete"
                                >
                                  <Trash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No results found. Please try a different search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2">
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
                          ? "border-Icpetgreen bg-Icpetgreen text-white"
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
        );

      case "Performance Track":
        return (
          <div className="flex flex-col h-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-20 p-4 text-left text-xs font-medium text-gray-500">
                      Profile
                    </th>
                    <th className="w-48 p-4 text-left text-xs font-medium text-gray-500">
                      Name
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Today
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      This Week
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      This Month
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      This Year
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Max Hours
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Min Hours
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Status
                    </th>
                    <th className="w-24 p-4 text-left text-xs font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map(
                      (janitor, index) =>
                        janitor.performanceTrack && (
                          <tr
                            key={`${activeTab}-${janitor.performanceTrack.employeeId}-${index}`}
                          >
                            <td className="w-20 p-4 whitespace-nowrap">
                              <img
                                src={janitor.performanceTrack.image}
                                alt={janitor.performanceTrack.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td className="w-48 p-4 whitespace-nowrap font-medium text-gray-900">
                              {janitor.performanceTrack.name}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.performanceTrack.today}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.performanceTrack.thisWeek}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.performanceTrack.thisMonth}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.performanceTrack.thisYear}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.performanceTrack.maxCleaningHours}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.performanceTrack.minCleaningHours}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  janitor.performanceTrack.status ===
                                  "Excellent"
                                    ? "bg-green-100 text-green-800"
                                    : janitor.performanceTrack.status === "Good"
                                    ? "bg-blue-100 text-blue-800"
                                    : janitor.performanceTrack.status === "Fair"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {janitor.performanceTrack.status}
                              </span>
                            </td>
                            <td className="w-24 p-4 whitespace-nowrap">
                              <div className="flex gap-2">
                                <button
                                  className="text-Icpetgreen hover:text-opacity-80"
                                  onClick={() =>
                                    handleEdit(
                                      janitor.performanceTrack.employeeId
                                    )
                                  }
                                  aria-label="Edit"
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                  className="text-red-500 hover:text-opacity-80"
                                  onClick={() =>
                                    handleDelete(
                                      janitor.performanceTrack.employeeId
                                    )
                                  }
                                  aria-label="Delete"
                                >
                                  <Trash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No results found. Please try a different search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2">
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
                          ? "border-Icpetgreen bg-Icpetgreen text-white"
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
        );

      case "Resource Usage":
        return (
          <div className="flex flex-col h-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-20 p-4 text-left text-xs font-medium text-gray-500">
                      Profile
                    </th>
                    <th className="w-48 p-4 text-left text-xs font-medium text-gray-500">
                      Name
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Resource
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Amount Used
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Remaining
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Restocked
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Note
                    </th>
                    <th className="w-24 p-4 text-left text-xs font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map(
                      (janitor, index) =>
                        janitor.resourceUsage && (
                          <tr
                            key={`${activeTab}-${janitor.resourceUsage.employeeId}-${index}`}
                          >
                            <td className="w-20 p-4 whitespace-nowrap">
                              <img
                                src={janitor.resourceUsage.image}
                                alt={janitor.resourceUsage.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td className="w-48 p-4 whitespace-nowrap font-medium text-gray-900">
                              {janitor.resourceUsage.name}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.resourceUsage.resource}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.resourceUsage.amountUsed}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.resourceUsage.remaining}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  janitor.resourceUsage.restocked === "Yes"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {janitor.resourceUsage.restocked}
                              </span>
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  janitor.resourceUsage.note === "Normal Usage"
                                    ? "bg-green-100 text-green-800"
                                    : janitor.resourceUsage.note ===
                                      "Higher than Average"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : janitor.resourceUsage.note ===
                                      "Excessive Usage"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {janitor.resourceUsage.note}
                              </span>
                            </td>
                            <td className="w-24 p-4 whitespace-nowrap">
                              <div className="flex gap-2">
                                <button
                                  className="text-Icpetgreen hover:text-opacity-80"
                                  onClick={() =>
                                    handleEdit(janitor.resourceUsage.employeeId)
                                  }
                                  aria-label="Edit"
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                  className="text-red-500 hover:text-opacity-80"
                                  onClick={() =>
                                    handleDelete(
                                      janitor.resourceUsage.employeeId
                                    )
                                  }
                                  aria-label="Delete"
                                >
                                  <Trash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No results found. Please try a different search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2">
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
                          ? "border-Icpetgreen bg-Icpetgreen text-white"
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
        );

      case "Logs and Report":
        return (
          <div className="flex flex-col h-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-20 p-4 text-left text-xs font-medium text-gray-500">
                      Profile
                    </th>
                    <th className="w-48 p-4 text-left text-xs font-medium text-gray-500">
                      Name
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Date
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Start Time
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      End Time
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Duration
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Task
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Before
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      After
                    </th>
                    <th className="w-40 p-4 text-left text-xs font-medium text-gray-500">
                      Status
                    </th>
                    <th className="w-24 p-4 text-left text-xs font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map(
                      (janitor, index) =>
                        janitor.logsReport && (
                          <tr
                            key={`${activeTab}-${janitor.logsReport.employeeId}-${index}`}
                          >
                            <td className="w-20 p-4 whitespace-nowrap">
                              <img
                                src={janitor.logsReport.image}
                                alt={janitor.logsReport.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td className="w-48 p-4 whitespace-nowrap font-medium text-gray-900">
                              {janitor.logsReport.name}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.logsReport.date}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.logsReport.startTime}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.logsReport.endTime}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.logsReport.duration} hrs
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap text-gray-700">
                              {janitor.logsReport.task}
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap">
                              <a
                                href={janitor.logsReport.beforePicture}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap">
                              <a
                                href={janitor.logsReport.afterPicture}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </td>
                            <td className="w-40 p-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  janitor.logsReport.status === "Done"
                                    ? "bg-green-100 text-green-800"
                                    : janitor.logsReport.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {janitor.logsReport.status}
                              </span>
                            </td>
                            <td className="w-24 p-4 whitespace-nowrap">
                              <div className="flex gap-2">
                                <button
                                  className="text-Icpetgreen hover:text-opacity-80"
                                  onClick={() =>
                                    handleEdit(janitor.logsReport.employeeId)
                                  }
                                  aria-label="Edit"
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                  className="text-red-500 hover:text-opacity-80"
                                  onClick={() =>
                                    handleDelete(janitor.logsReport.employeeId)
                                  }
                                  aria-label="Delete"
                                >
                                  <Trash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="11"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No results found. Please try a different search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2">
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
                          ? "border-Icpetgreen bg-Icpetgreen text-white"
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
        );

      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="h-full flex flex-col shadow-md bg-white rounded-lg p-6">
      <div className="flex flex-row justify-between items-center shrink-0">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-Icpetgreen focus:border-transparent"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="bg-Icpetgreen text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            onClick={() => console.log("Generate Schedule")}
          >
            Generate Schedule
          </button>
          <button
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            onClick={() => console.log("Print")}
          >
            <Printer className="w-5 h-5 text-Icpetgreen" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <nav className="flex gap-4" aria-label="Tabs">
          {[
            "Basic Details",
            "Schedule",
            "Performance Track",
            "Resource Usage",
            "Logs and Report",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === tab
                  ? "bg-Icpetgreen text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-hidden mt-6 shadow-md rounded-lg border border-gray-200">
        {renderTable()}
      </div>
    </div>
  );
}
