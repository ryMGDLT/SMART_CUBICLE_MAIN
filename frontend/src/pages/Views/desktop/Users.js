import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../Components/ui/tabs";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { DataTable } from "../../../Components/ui/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../Components/ui/pagination";
import { cn } from "../../../lib/utils";
import { getColumns } from "../../../Components/table/userColumns";
import Swal from "sweetalert2";

export default function Users() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10; // Set to show 10 items per page
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [backendUrl]);

  const filteredData = useMemo(() => {
    return usersData
      .filter((user) => {
        const matchesTab =
          activeTab === "All" ||
          (activeTab === "Requests" && user.status === "Pending") ||
          (activeTab === "Accepted" && user.status === "Accepted") ||
          (activeTab === "Declined" && user.status === "Declined");

        const matchesSearch = Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );

        return matchesTab && matchesSearch;
      })
      .sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") {
          return -1;
        } else if (a.status !== "Pending" && b.status === "Pending") {
          return 1;
        } else {
          return 0;
        }
      });
  }, [searchTerm, activeTab, usersData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfFirstItem, indexOfLastItem]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handleAccept = async (_id, currentRole, fullName) => {
    if (!currentRole || currentRole === "User") {
      Swal.fire({
        icon: "error",
        title: "Role Not Selected",
        text: "Please select a valid role before accepting the user.",
      });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: "Confirm Acceptance",
      html: `Are you sure you want to accept <strong>${fullName}</strong> and assign them the Position of <strong>${currentRole}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (isConfirmed) {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${backendUrl}/users/${_id}/accept`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: currentRole, status: "Accepted" }),
        });

        if (response.ok) {
          setUsersData((prevData) =>
            prevData.map((user) =>
              user._id === _id
                ? { ...user, role: currentRole, status: "Accepted" }
                : user
            )
          );
          Swal.fire("Accepted!", "The user has been accepted.", "success");
        } else {
          Swal.fire("Error", "Failed to update the user.", "error");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        Swal.fire("Error", "An error occurred while updating the user.", "error");
      }
    }
  };

  const handleDecline = useCallback(async (_id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Decline",
      text: "Are you sure you want to decline this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, decline",
      cancelButtonText: "No, cancel",
    });

    if (isConfirmed) {
      try {
        const response = await fetch(`${backendUrl}/users/${_id}/decline`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          setUsersData((prevData) =>
            prevData.map((user) =>
              user._id === _id ? { ...user, status: "Declined" } : user
            )
          );
          Swal.fire("Declined!", "The user has been declined.", "success");
        } else {
          Swal.fire("Error", "Failed to decline the user.", "error");
        }
      } catch (error) {
        console.error("Error declining user:", error);
        Swal.fire("Error", "An error occurred while declining the user.", "error");
      }
    }
  }, [backendUrl]);

  const handleRoleChange = useCallback((employeeId, newRole) => {
    setUsersData((prevData) =>
      prevData.map((user) =>
        user._id === employeeId ? { ...user, role: newRole } : user
      )
    );
    console.log(`Role updated locally for employee ${employeeId} to ${newRole}`);
  }, []);

  const handleSelectAll = useCallback((e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const currentIds = currentItems.map((user) => user.employee_id);
      setSelectedItems(currentIds);
    } else {
      setSelectedItems([]);
    }
  }, [currentItems]);

  const handleSelectItem = useCallback((employeeId) => {
    setSelectedItems((prev) => {
      if (prev.includes(employeeId)) {
        const newSelected = prev.filter((id) => id !== employeeId);
        setSelectAll(newSelected.length === currentItems.length);
        return newSelected;
      } else {
        const newSelected = [...prev, employeeId];
        setSelectAll(newSelected.length === currentItems.length);
        return newSelected;
      }
    });
  }, [currentItems]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedItems([]);
    setSelectAll(false);
  }, []);

  const columns = useMemo(() => {
    const hideActions = activeTab === "Accepted" || activeTab === "Declined";
    return getColumns(handleAccept, handleDecline, activeTab, handleRoleChange, hideActions);
  }, [handleAccept, handleDecline, activeTab, handleRoleChange]);

  const shouldShowPagination = filteredData.length > itemsPerPage;

  if (loading) {
    return <div>Loading...</div>;
  }

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
            columns={columns}
            data={currentItems}
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="min-h-full"
          />
        </div>
        {/* Pagination Controls */}
        {shouldShowPagination && (
          <div className="border-t border-gray-200 bg-white p-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePrevPage}
                    className={cn(
                      "cursor-pointer",
                      currentPage === 1 && "pointer-events-none opacity-50"
                    )}
                  />
                </PaginationItem>

                {pageNumbers.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className={cn(
                        "cursor-pointer",
                        currentPage === page && "bg-Icpetgreen text-white hover:bg-Icpetgreen/90"
                      )}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {totalPages > 7 && currentPage < totalPages - 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextPage}
                    className={cn(
                      "cursor-pointer",
                      currentPage === totalPages && "pointer-events-none opacity-50"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}