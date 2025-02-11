import React, { useState, useMemo } from "react";
import { USERS_DATA } from "../../../data/placeholderData";

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

          <div className="hidden sm:block">
            <nav className="flex gap-6" aria-label="Tabs">
              {["All", "Requests", "Accepted", "Declined"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`shrink-0 rounded-lg w-24 p-2 text-sm font-medium text-center ${
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
        {/* Table Container with fixed layout */}
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full table-fixed divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b-2 border-gray-200">
                <th className="w-12 py-4 text-center">
                  <label className="sr-only">Select All</label>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="w-12 py-4 text-center">
                  <span className="sr-only">Priority</span>
                </th>
                <th className="w-16 py-4 text-center font-medium text-gray-900">
                  Profile
                </th>
                <th className="w-48 py-4 text-center font-medium text-gray-900">
                  Name
                </th>
                <th className="w-48 py-4 text-center font-medium text-gray-900">
                  Employee ID
                </th>
                <th className="w-72 py-4 text-center font-medium text-gray-900">
                  Employee Email
                </th>
                <th className="w-48 py-4 text-center font-medium text-gray-900">
                  Contact Information
                </th>
                <th className="w-32 py-4 text-center font-medium text-gray-900">
                  Position
                </th>
                <th className="w-40 py-4 text-center font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user.employeeId}>
                    <td className="w-12 py-4 text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
                        checked={selectedItems.includes(user.employeeId)}
                        onChange={() => handleSelectItem(user.employeeId)}
                      />
                    </td>
                    <td className="w-12 py-4 text-center">
                      {user.priority && <span className="text-red-500">!</span>}
                    </td>
                    <td className="w-16 py-4">
                      <div className="flex justify-center">
                        <img
                          src="/images/sadGato.jpg"
                          alt="User"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="w-48 py-4 text-center text-gray-700">
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </td>
                    <td className="w-48 py-4 text-center text-gray-700">
                      {user.employeeId}
                    </td>
                    <td className="w-72 py-4 text-center text-gray-700">
                      {user.email}
                    </td>
                    <td className="w-48 py-4 text-center text-gray-700">
                      {user.contact}
                    </td>
                    <td className="w-32 py-4 text-center text-gray-700">
                      {user.position}
                    </td>
                    <td className="w-40 py-4">
                      <div className="flex justify-center gap-2">
                        {user.status === "Pending" ? (
                          <>
                            <button
                              className="rounded-lg bg-Icpetgreen px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
                              onClick={() => handleAccept(user.employeeId)}
                            >
                              Accept
                            </button>
                            <button
                              className="rounded-lg border border-red-500 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white"
                              onClick={() => handleDecline(user.employeeId)}
                            >
                              Decline
                            </button>
                          </>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "Accepted"
                                ? "text-Icpetgreen bg-green-50"
                                : "text-red-500 bg-red-50"
                            }`}
                          >
                            {user.status}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
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

        {/* Pagination*/}
        <div className="shrink-0 rounded-b-lg border-t border-gray-200 px-4 py-2 bg-white">
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
    </div>
  );
}
