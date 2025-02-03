import React, { useState } from "react";

export default function Users() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="h-full shadow-md bg-white rounded-lg p-6">
      {/* Header - Navigation and Search Bar */}
      <div className="flex flex-row justify-between">
        {/* Tab Navigation - All, Requests, Accepted, Declined */}
        <div>
          <div className="sm:hidden">
            <label htmlFor="userTab" className="sr-only">
              User Tab
            </label>

            <select id="userTab" className="w-full rounded-md border-gray-200">
              <option>All</option>
              <option>Requests</option>
              <option>Accepted</option>
              <option>Declined</option>
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="flex gap-6" aria-label="Tabs">
              {["All", "Requests", "Accepted", "Declined"].map((tab) => {
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 rounded-lg w-24 p-2 text-sm font-medium text-center ${
                      activeTab === tab
                        ? "bg-Icpetgreen text-white"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                    aria-current={activeTab === tab ? "page" : undefined}
                  >
                    {tab}
                  </button>
                );
              })}
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

      {/* User Table */}
      <div className="mt-6 rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-12 px-4 py-4">
                  <label className="sr-only">Select All</label>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
                <th className="w-12 px-4 py-4">
                  <span className="sr-only">Priority</span>
                </th>
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
                  Position
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {[1, 2, 3].map((item) => (
                <tr key={item}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-red-500">!</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/images/sadGato.jpg"
                        alt="User"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">
                        Jane Doe
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">TUPM-21-0000</td>
                  <td className="px-4 py-4 text-gray-700">
                    jane.doe@tup.edu.ph
                  </td>
                  <td className="px-4 py-4 text-gray-700">+639999999999</td>
                  <td className="px-4 py-4 text-gray-700">Janitor</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-Icpetgreen px-4 py-2 text-xs font-medium text-white hover:bg-gray-700">
                        Accept
                      </button>
                      <button className="rounded-lg border border-red-500 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white">
                        Decline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180">
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
                  className={`h-8 w-8 rounded border ${
                    page === 2
                      ? "border-Icpetgreen bg-Icpetgreen text-white"
                      : "border-gray-100 bg-white text-gray-900"
                  } text-center leading-8`}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180">
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
