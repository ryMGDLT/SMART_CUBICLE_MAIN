import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { DataTable } from "../../../components/ui/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import { cn } from "../../../lib/utils";
import { getColumns } from "../../../components/tables/user/user-column";
import Swal from "sweetalert2";
import { Card } from "../../../components/ui/card";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";

export default function Users() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 11; 
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://192.168.8.181:5000";

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Fetching users with token:", token ? "Present" : "Missing");
      const response = await fetch(`${backendUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
      const data = await response.json();
      console.log("Fetched users data:", data);
      setUsersData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      Swal.fire("Error", "Failed to fetch users data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return 0;
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
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }, [currentPage, totalPages]);

  const handleAccept = async (_id, currentRole, fullName) => {
    console.log("Accepting user with ID:", _id, "Role:", currentRole, "Name:", fullName);
    if (!currentRole || currentRole === "User" || currentRole === "Select Role") {
      Swal.fire({
        icon: "error",
        title: "Role Not Selected",
        text: "Please select a valid role (e.g., Janitor or Admin) before accepting the user.",
      });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: "Confirm Acceptance",
      html: `Are you sure you want to accept <strong>${fullName}</strong> as <strong>${currentRole}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (isConfirmed) {
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Present" : "Missing");
      console.log("Backend URL for accept:", `${backendUrl}/users/${_id}/accept`);

      try {
        const response = await fetch(`${backendUrl}/users/${_id}/accept`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: currentRole, status: "Accepted" }),
        });

        const responseText = await response.text();
        console.log("Accept response:", response.status, responseText);

        if (!response.ok) {
          throw new Error(`Failed to accept user: ${response.status} - ${responseText}`);
        }

        const data = await JSON.parse(responseText);
        setUsersData((prevData) =>
          prevData.map((user) =>
            user._id === _id ? { ...user, role: currentRole, status: "Accepted" } : user
          )
        );
        Swal.fire("Accepted!", "The user has been accepted.", "success");
        fetchData();
      } catch (error) {
        console.error("Error updating user:", error.message);
        Swal.fire("Error", `Failed to accept user: ${error.message}`, "error");
      }
    }
  };

  const handleDecline = useCallback(
    async (_id) => {
      console.log("Declining user with ID:", _id);
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

          const responseText = await response.text();
          console.log("Decline response:", response.status, responseText);

          if (!response.ok) {
            throw new Error(`Failed to decline user: ${response.status} - ${responseText}`);
          }

          setUsersData((prevData) =>
            prevData.map((user) =>
              user._id === _id ? { ...user, status: "Declined" } : user
            )
          );
          Swal.fire("Declined!", "The user has been declined.", "success");
          fetchData();
        } catch (error) {
          console.error("Error declining user:", error.message);
          Swal.fire("Error", `Failed to decline user: ${error.message}`, "error");
        }
      }
    },
    [backendUrl]
  );

  const handleRoleChange = useCallback((employeeId, newRole) => {
    setUsersData((prevData) =>
      prevData.map((user) =>
        user._id === employeeId ? { ...user, role: newRole } : user
      )
    );
    console.log(`Role updated locally for user ${employeeId} to ${newRole}`);
  }, []);

  const handleSelectAll = useCallback(
    (e) => {
      setSelectAll(e.target.checked);
      if (e.target.checked) {
        const currentIds = currentItems.map((user) => user.employeeId);
        setSelectedItems(currentIds);
      } else {
        setSelectedItems([]);
      }
    },
    [currentItems]
  );

  const handleSelectItem = useCallback(
    (employeeId) => {
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
    },
    [currentItems]
  );

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedItems([]);
    setSelectAll(false);
  }, []);

  const columns = useMemo(() => {
    const hideActions = activeTab === "Accepted" || activeTab === "Declined";
    return getColumns(
      handleAccept,
      handleDecline,
      activeTab,
      handleRoleChange,
      hideActions
    );
  }, [handleAccept, handleDecline, activeTab, handleRoleChange]);

  const shouldShowPagination = filteredData.length > itemsPerPage;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="flex flex-col h-full bg-white shadow-md p-1 rounded-lg overflow-hidden">
      <div className="flex flex-row justify-between items-center shrink-0">
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
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
        <div className="relative w-96">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-4 pr-10"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-col flex-1 rounded-lg border border-gray-200">
        {/* Table container with fixed height for 12 rows + header */}
        <div className="flex-1" style={{ height: "585px" /* 45px * 13 */ }}>
          <DataTable
            columns={columns}
            data={currentItems}
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="h-full"
          />
        </div>
        {shouldShowPagination && (
          <div className="border-t border-gray-200 bg-white p-2 pb-4 shrink-0">
            {/* Added pb-4 for 16px padding-bottom */}
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
                        currentPage === page &&
                          "bg-Icpetgreen text-white hover:bg-Icpetgreen/90"
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
                      currentPage === totalPages &&
                        "pointer-events-none opacity-50"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </Card>
  );
} 