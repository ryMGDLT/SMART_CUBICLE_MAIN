import React, { useState } from 'react';
import { Pencil, Trash, Printer } from 'heroicons-react';
import { JANITORS_DATA, DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";

export default function Janitors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Basic Details');
  const itemsPerPage = 6;

  // Pagination calculation
  const filteredData = JANITORS_DATA.filter(janitor =>
    Object.values(janitor).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage(p => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(p => Math.min(totalPages, p + 1));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-full flex flex-col p-2 gap-3 overflow-y-auto relative">
      {/* Search Bar */}
      <div className="relative w-full shadow-md bg-white rounded-lg">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>

        <input
          type="text"
          id="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search name, ID, email, or contact"
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

      {/* Tab Navigation */}
      <div className="w-full">
        <div className="block">
          <label htmlFor="userTab" className="sr-only">
            User Tab
          </label>

          <select
            id="userTab"
            className="w-full rounded-md border-gray-200 py-2 text-sm focus:border-Icpetgreen focus:ring-1 focus:ring-Icpetgreen"
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

        <div className="hidden">
          <nav className="flex gap-2 overflow-x-auto py-2" aria-label="Tabs">
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
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap ${
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

      {/* Janitors List */}
      <div className="flex flex-col gap-3">
        {currentItems.map((janitor, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex gap-4">
              <img
                src={janitor.image || DEFAULT_PROFILE_IMAGE}
                alt={`${janitor.name}'s profile`}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium">{janitor.name}</h3>
                    <p className="text-xs text-gray-500">{janitor.employeeId}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-Icpetgreen p-1 hover:bg-gray-100 rounded">
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-500 p-1 hover:bg-gray-100 rounded">
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">{janitor.email}</p>
                  <p className="text-gray-600">{janitor.contact}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 bg-white">
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

      {/* Floating Generate Report Button */}
      <button
        type="button"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-Icpetgreen text-white shadow-lg hover:bg-gray-800 transition duration-300 flex items-center justify-center"
        aria-label="Generate Report"
      >
        <Printer className="w-6 h-6" />
      </button>
    </div>
  );
}
