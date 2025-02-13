import React, { useState, useMemo } from "react";
import { Pencil, Trash, Printer } from "heroicons-react";
import {
  USERS_DATA,
  DEFAULT_PROFILE_IMAGE,
} from "../../../data/placeholderData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../Components/ui/pagination";
import { cn } from "../../../lib/utils";
import { columns } from "./columns";
import { DataTable } from "../../../Components/ui/data-table";

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
        <DataTable
          columns={columns}
          data={currentItems}
          pageCount={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
