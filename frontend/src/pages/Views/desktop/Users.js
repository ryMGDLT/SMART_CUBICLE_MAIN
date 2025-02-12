import React, { useState, useMemo } from "react";
import { USERS_DATA } from "../../../data/placeholderData";
import { Tabs, TabsList, TabsTrigger } from "../../../Components/ui/tabs";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { DataTable } from "../../../Components/ui/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../Components/ui/pagination";
import { cn } from "../../../lib/utils";
import { getColumns } from "./userColumns";

export default function Users() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10; // Set to show 10 items per page
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Update filteredData to include both search and tab filtering
  const filteredData = useMemo(() => {
    return USERS_DATA.filter((user) => {
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Requests" && user.status === "Pending") ||
        (activeTab === "Accepted" && user.status === "Accepted") ||
        (activeTab === "Declined" && user.status === "Declined");

      const matchesSearch = Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

      return matchesTab && matchesSearch;
    });
  }, [searchTerm, activeTab]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Generate page numbers array dynamically
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

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

  const handleAccept = (employeeId) => {
    // Update user status logic here
    console.log(`Accepted user ${employeeId}`);
  };

  const handleDecline = (employeeId) => {
    // Update user status logic here
    console.log(`Declined user ${employeeId}`);
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      // Select all items currently visible on the page
      const currentIds = currentItems.map((user) => user.employeeId);
      setSelectedItems(currentIds);
    } else {
      // Deselect all items
      setSelectedItems([]);
    }
  };

  // Handle individual item selection
  const handleSelectItem = (employeeId) => {
    setSelectedItems((prev) => {
      if (prev.includes(employeeId)) {
        // Remove item if already selected
        const newSelected = prev.filter((id) => id !== employeeId);
        // Update selectAll state
        setSelectAll(newSelected.length === currentItems.length);
        return newSelected;
      } else {
        // Add item if not selected
        const newSelected = [...prev, employeeId];
        // Update selectAll state
        setSelectAll(newSelected.length === currentItems.length);
        return newSelected;
      }
    });
  };

  // Reset pagination when changing tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
    setSelectedItems([]); // Clear selected items
    setSelectAll(false); // Reset select all checkbox
  };

  return (
    <div className="h-full flex flex-col shadow-md bg-white rounded-lg p-6">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-center shrink-0">
        {/* Tab Navigation */}
        <div>
          {/* Mobile view - keep the select for small screens */}
          <div className="sm:hidden">
            <label htmlFor="userTab" className="sr-only">
              User Tab
            </label>
            <select
              id="userTab"
              className="w-full rounded-md border-gray-200"
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value)}
            >
              <option>All</option>
              <option>Requests</option>
              <option>Accepted</option>
              <option>Declined</option>
            </select>
          </div>

          {/* Desktop view - use shadcn Tabs */}
          <div className="hidden sm:block">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="bg-transparent gap-6 w-auto">
              {["All", "Requests", "Accepted", "Declined"].map((tab) => (
                  <TabsTrigger
                  key={tab}
                    value={tab}
                    className={cn(
                      "rounded-lg w-24 data-[state=active]:shadow-none",
                      "data-[state=active]:bg-Icpetgreen data-[state=active]:text-white",
                      "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500",
                      "hover:text-gray-700 hover:bg-gray-50"
                    )}
                >
                  {tab}
                  </TabsTrigger>
              ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        {/* Search Bar */}
        <div className="relative w-64">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            value={searchTerm}
            onChange={handleSearch}
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

      {/* User Table Container */}
      <div className="mt-3 flex-1 flex flex-col h-full rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex-1 overflow-y-auto relative">
          <DataTable
            columns={getColumns(handleAccept, handleDecline, activeTab)}
            data={currentItems}
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="min-h-full"
          />
        </div>
      </div>
    </div>
  );
}
