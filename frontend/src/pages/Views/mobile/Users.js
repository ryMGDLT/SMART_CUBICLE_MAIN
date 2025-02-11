import React, { useState, useMemo } from "react";
import { Pencil, Trash, Printer } from "heroicons-react";
import {
  USERS_DATA,
  DEFAULT_PROFILE_IMAGE,
} from "../../../data/placeholderData";

export default function Users() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  // Update the filtering logic with proper string conversion
  const filteredData = useMemo(() => {
    return USERS_DATA.filter((user) => {
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Requests" && user.status === "Pending") ||
        (activeTab === "Accepted" && user.status === "Accepted") ||
        (activeTab === "Declined" && user.status === "Declined");

      const matchesSearch = Object.values(user).some((value) =>
        // Convert value to string before using toLowerCase()
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

      return matchesTab && matchesSearch;
    });
  }, [searchTerm, activeTab]);

  // Calculate pagination
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / itemsPerPage),
    [filteredData, itemsPerPage]
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handlers
  const handlePrevPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrint = () => {
    // Add print functionality
  };

  const handleGenerate = () => {
    // Add generate report functionality
  };

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header Section */}
      <div className="bg-gray-50 p-2">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Users</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerate}
                className="bg-Icpetgreen text-white px-3 py-1.5 rounded-lg text-sm hover:bg-opacity-90 flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Generate
              </button>
              <button
                onClick={handlePrint}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <Printer className="w-5 h-5 text-Icpetgreen" />
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              id="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        </div>

        {/* Tab Navigation */}
        <div className="mt-2">
          <select
            id="userTab"
            className="w-full rounded-md border-gray-200 py-2 text-sm focus:border-Icpetgreen focus:ring-1 focus:ring-Icpetgreen"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option>All</option>
            <option>Requests</option>
            <option>Accepted</option>
            <option>Declined</option>
          </select>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-3 pb-16">
          {currentItems.map((user, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex gap-4">
                <img
                  src={user.image || DEFAULT_PROFILE_IMAGE}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium">{user.name}</h3>
                      <p className="text-xs text-gray-500">{user.userId}</p>
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
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">{user.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Footer - Pagination */}
      <div className="bg-white border-t border-gray-200 p-2 shadow-sm">
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
}
