import React, { useState, useMemo, useEffect } from "react";
import { Printer } from "heroicons-react";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";

export default function Janitors() {
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [janitorsData, setJanitorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://smart-cubicle-backend.onrender.com";

  const fetchJanitors = async () => {
    try {
      const response = await fetch(`${backendUrl}/janitors`);
      if (!response.ok) throw new Error("Failed to fetch janitors");
      const data = await response.json();
      setJanitorsData(data);
      console.log("Fetched Janitors Data:", data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJanitors();
  }, []);

  // Filter
  const filteredJanitors = useMemo(() => {
    if (!janitorsData.length) return [];

    return janitorsData
      .map((janitor) => {
        const tabProperty = activeTab.toLowerCase().replace(/\s+/g, "");
        const propertyKey =
          {
            basicdetails: "basicDetails",
            logsandreport: "logsReport",
            performancetrack: "performanceTrack",
            resourceusage: "resourceUsage",
            schedule: "schedule",
          }[tabProperty] || tabProperty;

        const data = janitor[propertyKey];

        if (propertyKey === "basicDetails") {
          return [
            {
              _id: janitor._id,
              basicDetails: data,
            },
          ];
        }

        if (Array.isArray(data) && data.length > 0) {
          return data.map((entry) => ({
            _id: janitor._id,
            basicDetails: janitor.basicDetails,
            [propertyKey]: entry,
          }));
        }

        return [];
      })
      .flat()
      .filter((item) => {
        const data = item[activeTab.toLowerCase().replace(/\s+/g, "")] || item.basicDetails;
        return Object.values(data)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
  }, [searchTerm, activeTab, janitorsData]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredJanitors.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredJanitors, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredJanitors.length / itemsPerPage),
    [filteredJanitors, itemsPerPage]
  );

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  const renderCard = (item, tab) => {
    const data =
      tab === "Basic Details"
        ? item.basicDetails
        : tab === "Schedule"
        ? item.schedule
        : tab === "Performance Track"
        ? item.performanceTrack
        : tab === "Resource Usage"
        ? item.resourceUsage
        : tab === "Logs and Report"
        ? item.logsReport
        : null;

    if (!data) return null;

    switch (tab) {
      case "Basic Details":
        return (
          <div className="flex gap-4">
            <img
              src={data.image || DEFAULT_PROFILE_IMAGE}
              alt={data.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium">{data.name}</h3>
                  <p className="text-xs text-gray-500">{data.employeeId}</p>
                </div>
              </div>
              <div className="mt-1 text-sm">
                <p className="text-gray-600">{data.email}</p>
                <p className="text-gray-600">{data.contact}</p>
              </div>
            </div>
          </div>
        );

      case "Schedule":
        return (
          <div className="flex gap-4">
            <img
              src={item.basicDetails.image || DEFAULT_PROFILE_IMAGE}
              alt={item.basicDetails.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium">{item.basicDetails.name}</h3>
                  <p className="text-xs text-gray-500">{data.date}</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Shift</p>
                  <p className="font-medium">{data.shift}</p>
                </div>
                <div>
                  <p className="text-gray-500">Time In/Out</p>
                  <p className="font-medium">
                    {data.timeIn} - {data.timeOut}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Cleaning Hour</p>
                  <p className="font-medium">{data.cleaningHour}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      data.status === "On Time"
                        ? "bg-green-100 text-green-800"
                        : data.status === "Late"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {data.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Performance Track":
        return (
          <div className="flex gap-4">
            <img
              src={item.basicDetails.image || DEFAULT_PROFILE_IMAGE}
              alt={item.basicDetails.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium">{item.basicDetails.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      data.status === "Excellent"
                        ? "bg-green-100 text-green-800"
                        : data.status === "Good"
                        ? "bg-blue-100 text-blue-800"
                        : data.status === "Fair"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {data.status}
                  </span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Today</p>
                  <p className="font-medium">{data.today} hrs</p>
                </div>
                <div>
                  <p className="text-gray-500">This Week</p>
                  <p className="font-medium">{data.thisWeek} hrs</p>
                </div>
                <div>
                  <p className="text-gray-500">This Month</p>
                  <p className="font-medium">{data.thisMonth} hrs</p>
                </div>
                <div>
                  <p className="text-gray-500">This Year</p>
                  <p className="font-medium">{data.thisYear} hrs</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "Resource Usage":
        return (
          <div className="flex gap-4">
            <img
              src={item.basicDetails.image || DEFAULT_PROFILE_IMAGE}
              alt={item.basicDetails.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium">{item.basicDetails.name}</h3>
                  <p className="text-xs text-gray-500">{data.resource}</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Amount Used</p>
                  <p className="font-medium">{data.amountUsed}</p>
                </div>
                <div>
                  <p className="text-gray-500">Remaining</p>
                  <p className="font-medium">{data.remaining}</p>
                </div>
                <div>
                  <p className="text-gray-500">Restocked</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      data.restocked
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {data.restocked ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500">Note</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      data.note === "Normal Usage"
                        ? "bg-green-100 text-green-800"
                        : data.note === "Higher than Average"
                        ? "bg-yellow-100 text-yellow-800"
                        : data.note === "Excessive Usage"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {data.note}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Logs and Report":
        return (
          <div className="flex gap-4">
            <img
              src={item.basicDetails.image || DEFAULT_PROFILE_IMAGE}
              alt={item.basicDetails.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium">{item.basicDetails.name}</h3>
                  <p className="text-xs text-gray-500">{data.date}</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Time</p>
                  <p className="font-medium">
                    {data.startTime} - {data.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium">{data.duration} hrs</p>
                </div>
                <div>
                  <p className="text-gray-500">Task</p>
                  <p className="font-medium">{data.task}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      data.status === "Done"
                        ? "bg-green-100 text-green-800"
                        : data.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {data.status}
                  </span>
                </div>
                <div className="col-span-2 flex gap-4">
                  <a
                    href={data.beforePicture}
                    className="text-blue-600 hover:underline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Before Picture
                  </a>
                  <a
                    href={data.afterPicture}
                    className="text-blue-600 hover:underline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    After Picture
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>No content available</div>;
    }
  };

  if (loading) {
    return <div className="h-full flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-full flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-50 p-2">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Janitors</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => console.log("Generate Schedule")}
                className="bg-Icpetgreen text-white px-3 py-1.5 rounded-lg text-sm hover:bg-opacity-90 flex items-center gap-1"
              >
                Generate
              </button>
              <button
                onClick={() => console.log("Print")}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <Printer className="w-5 h-5 text-Icpetgreen" />
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-lg border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm focus:border-Icpetgreen focus:ring-1 focus:ring-Icpetgreen"
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-2">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:border-Icpetgreen focus:ring-1 focus:ring-Icpetgreen"
          >
            <option>Basic Details</option>
            <option>Schedule</option>
            <option>Performance Track</option>
            <option>Resource Usage</option>
            <option>Logs and Report</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-3 pb-16">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div
                key={`${activeTab}-${item._id}-${index}`}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                {renderCard(item, activeTab)}
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500">
              No results found. Please try a different search term.
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 bg-white border-t border-gray-200 px-4 py-2">
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