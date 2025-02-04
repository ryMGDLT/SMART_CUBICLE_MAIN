import React, { useState } from 'react';
import { USERS_DATA, DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";

export default function Users() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6; // Reduced for mobile view
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Improved search function with fuzzy matching
  const searchUsers = (data, term) => {
    if (!term.trim()) return data;
    const searchValue = term.toLowerCase();
    return data.filter((user) => {
      const nameMatch = fuzzyMatch(user.name.toLowerCase(), searchValue);
      const idMatch = user.employeeId.toLowerCase().includes(searchValue);
      const emailMatch = user.email.toLowerCase().includes(searchValue);
      const contactMatch = user.contact.includes(searchValue);
      const positionMatch = user.position.toLowerCase().includes(searchValue);
      return nameMatch || idMatch || emailMatch || contactMatch || positionMatch;
    });
  };

  // Fuzzy matching function
  const fuzzyMatch = (str, pattern) => {
    if (str.includes(pattern)) return true;
    const strArr = str.split("");
    const patternArr = pattern.split("");
    const matrix = Array(patternArr.length + 1)
      .fill()
      .map(() => Array(strArr.length + 1).fill(0));
    for (let i = 0; i <= strArr.length; i++) matrix[0][i] = i;
    for (let i = 0; i <= patternArr.length; i++) matrix[i][0] = i;
    for (let i = 1; i <= patternArr.length; i++) {
      for (let j = 1; j <= strArr.length; j++) {
        const cost = strArr[j - 1] === patternArr[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    const distance = matrix[patternArr.length][strArr.length];
    const threshold = Math.floor(pattern.length * 0.4);
    return distance <= threshold;
  };

  // Filter users based on active tab
  const filterUsersByTab = (users) => {
    switch (activeTab) {
      case "Requests":
        return users.filter((user) => user.status === "Pending");
      case "Accepted":
        return users.filter((user) => user.status === "Accepted");
      case "Declined":
        return users.filter((user) => user.status === "Declined");
      default:
        return users;
    }
  };

  // Apply filters and pagination
  const filteredUsers = filterUsersByTab(searchUsers(USERS_DATA, searchTerm));
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  
  const handleAccept = (employeeId) => console.log(`Accepted user ${employeeId}`);
  const handleDecline = (employeeId) => console.log(`Declined user ${employeeId}`);

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setSelectedItems(e.target.checked ? currentItems.map(user => user.employeeId) : []);
  };

  const handleSelectItem = (employeeId) => {
    setSelectedItems(prev => {
      const newSelected = prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId];
      setSelectAll(newSelected.length === currentItems.length);
      return newSelected;
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedItems([]);
    setSelectAll(false);
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
          onChange={handleSearch}
          placeholder="Search name, ID, position, etc."
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
            onChange={(e) => handleTabChange(e.target.value)}
          >
            <option>All</option>
            <option>Requests</option>
            <option>Accepted</option>
            <option>Declined</option>
          </select>
        </div>
      </div>

      {/* User Cards */}
      <div className="flex flex-col gap-3">
        {/* Select All Checkbox */}
        <div className="flex items-center gap-2 px-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span className="text-sm text-gray-600">Select All</span>
        </div>

        {currentItems.length > 0 ? (
          currentItems.map((user) => (
            <div key={user.employeeId} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen mt-1"
                  checked={selectedItems.includes(user.employeeId)}
                  onChange={() => handleSelectItem(user.employeeId)}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={DEFAULT_PROFILE_IMAGE}
                        alt={`${user.name}'s profile`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">
                            {user.name}
                          </h3>
                          {user.priority && (
                            <span className="text-red-500 text-lg">!</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{user.position}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>{user.employeeId}</p>
                    <p>{user.email}</p>
                    <p>{user.contact}</p>
                  </div>
                  <div className="mt-3">
                    {user.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          className="flex-1 rounded-lg bg-Icpetgreen px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700"
                          onClick={() => handleAccept(user.employeeId)}
                        >
                          Accept
                        </button>
                        <button
                          className="flex-1 rounded-lg border border-red-500 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => handleDecline(user.employeeId)}
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "Accepted"
                            ? "text-Icpetgreen bg-green-50"
                            : "text-red-500 bg-red-50"
                        }`}
                      >
                        {user.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No results found. Please try a different search term.
          </div>
        )}
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
    </div>
  );
}
