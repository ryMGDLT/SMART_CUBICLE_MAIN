import React, { useState } from "react";
import { Trash, Pencil, Printer } from "heroicons-react";

export default function Janitors() {
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-full shadow-md bg-white rounded-lg p-6">
      {/* Header - Search Bar and Generate Report Button */}
      <div className="flex flex-row justify-between">
        {/* Search Bar */}
        <div className="relative w-64">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            placeholder="Search"
            className="w-full rounded-lg border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm focus:border-Icpetgreen focus:ring-1 focus:ring-Icpetgreen"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="button"
              className="text-Icpetgreen hover:text-gray-700"
            >
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        {/* Generate Report Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-Icpetgreen text-white px-8 py-2 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center gap-2"
          >
            Generate Report
            <Printer className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="mt-6">
        <div className="sm:hidden">
          <label htmlFor="userTab" className="sr-only">
            User Tab
          </label>

          <select
            id="userTab"
            className="w-full rounded-md border-gray-200"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option>Basic Details</option>
            <option>Schedule</option>
            <option>Performance Task</option>
            <option>Resource Usage</option>
            <option>Logs and Report</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <nav className="flex gap-6" aria-label="Tabs">
            {[
              "Basic Details",
              "Schedule",
              "Performance Task",
              "Resource Usage",
              "Logs and Report",
            ].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-lg w-32 p-2 text-sm font-medium text-center ${
                  activeTab === tab
                    ? "bg-Icpetgreen text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
                aria-current={activeTab === tab ? "page" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Janitor Table */}
      <div className="mt-6 rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-48 px-4 py-4 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Employee ID
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Employee Email
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Contact Information
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {[
                {
                  name: "Maria Santos",
                  employeeId: "TUPM-21-0001",
                  email: "maria.santos@tup.edu.ph",
                  contact: "+639123456789",
                },
                {
                  name: "Juan Dela Cruz",
                  employeeId: "TUPM-21-0002",
                  email: "juan.delacruz@tup.edu.ph",
                  contact: "+639234567890",
                },
                {
                  name: "Ana Reyes",
                  employeeId: "TUPM-21-0003",
                  email: "ana.reyes@tup.edu.ph",
                  contact: "+639345678901",
                },
                {
                  name: "Pedro Garcia",
                  employeeId: "TUPM-21-0004",
                  email: "pedro.garcia@tup.edu.ph",
                  contact: "+639456789012",
                },
                {
                  name: "Sofia Luna",
                  employeeId: "TUPM-21-0005",
                  email: "sofia.luna@tup.edu.ph",
                  contact: "+639567890123",
                },
                {
                  name: "Miguel Torres",
                  employeeId: "TUPM-21-0006",
                  email: "miguel.torres@tup.edu.ph",
                  contact: "+639678901234",
                },
              ].map((janitor) => (
                <tr key={janitor.employeeId}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/images/sadGato.jpg"
                        alt="User"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">
                        {janitor.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    {janitor.employeeId}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{janitor.email}</td>
                  <td className="px-4 py-4 text-gray-700">{janitor.contact}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg px-3 py-1 text-xs font-medium">
                        <Pencil className="w-4 h-4 text-Icpetgreen" />
                      </button>
                      <button className="rounded-lg px-3 py-1 text-xs font-medium">
                        <Trash className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
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

            {[1, 2, 3, 4].map((page) => (
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
                disabled={currentPage === 4}
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
  );
}
