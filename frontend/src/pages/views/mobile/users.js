"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Printer } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../../../components/ui/pagination";
import { cn } from "../../../lib/utils";
import { DataTable } from "../../../components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Pencil } from "lucide-react";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import Swal from "sweetalert2";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";

const ActionsCell = ({ user, setUsersData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role || "Select Role");

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://192.168.8.181:5000";

  
  useEffect(() => {
    if (isOpen) {
      setSelectedRole("Select Role");
    }
  }, [isOpen]);

  const handleAccept = async () => {
    if (!selectedRole || selectedRole === "Select Role") {
      Swal.fire("Error", "Please select a valid role before accepting.", "error");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${backendUrl}/users/${user._id}/accept`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: selectedRole, status: "Accepted" }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to accept user: ${errorText}`);
      }
      setUsersData((prevData) =>
        prevData.map((u) =>
          u._id === user._id ? { ...u, status: "Accepted", role: selectedRole } : u
        )
      );
      setIsOpen(false);
      Swal.fire("Success", "User has been accepted.", "success");
    } catch (error) {
      console.error("Error accepting user:", error);
      Swal.fire("Error", `Failed to accept user: ${error.message}`, "error");
    }
  };

  const handleDecline = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${backendUrl}/users/${user._id}/decline`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to decline user: ${errorText}`);
      }
      setUsersData((prevData) =>
        prevData.map((u) =>
          u._id === user._id ? { ...u, status: "Declined" } : u
        )
      );
      setIsOpen(false);
      Swal.fire("Success", "User has been declined.", "success");
    } catch (error) {
      console.error("Error declining user:", error);
      Swal.fire("Error", `Failed to decline user: ${error.message}`, "error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4 text-Icpetgreen" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Role: {user.fullName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor={`role-${user.employeeId}`}>Position</Label>
            <Select
              value={selectedRole}
              onValueChange={setSelectedRole}
              disabled={user.status === "Accepted" || user.status === "Declined"}
            >
              <SelectTrigger id={`role-${user.employeeId}`}>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Select Role">Select Role</SelectItem>
                <SelectItem value="Janitor">Janitor</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {user.status === "Pending" && (
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleAccept}
                className="bg-Icpetgreen text-white hover:bg-Icpetgreen/90"
              >
                Accept
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Decline
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const getColumns = (setUsersData, hasPending) => {
  const baseColumns = [
    {
      accessorKey: "profileImage",
      header: () => <div className="text-center">Profile</div>,
      cell: ({ row }) => {
        const user = row.original;
        const imageSrc = user.profileImage || DEFAULT_PROFILE_IMAGE;
        return (
          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt={`${user.fullName}'s profile`}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        );
      },
      width: "80px", 
    },
    {
      accessorKey: "email",
      header: () => <div className="text-left">Details</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-left overflow-hidden">
            <div
              className="font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"
              title={user.fullName} 
            >
              {user.fullName}
            </div>
            <div
              className="text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"
              title={user.email} 
            >
              {user.email}
            </div>
            <div
              className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"
            >
              {user.employeeId}
            </div>
            <div
              className={cn(
                "text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]",
                user.status === "Accepted" && "text-green-600",
                user.status === "Declined" && "text-red-600",
                user.status === "Pending" && "text-yellow-600"
              )}
            >
              {user.status}
            </div>
          </div>
        );
      },
      width: hasPending ? "70%" : "calc(100% - 80px)", 
    },
  ];

  if (hasPending) {
    baseColumns.push({
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center">
            {user.status === "Pending" ? (
              <ActionsCell user={user} setUsersData={setUsersData} />
            ) : null}
          </div>
        );
      },
      width: "80px",
    });
  }

  return baseColumns;
};

export default function Users() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

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
    const filtered = usersData.filter((user) => {
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

   
    return filtered.sort((a, b) => {
      if (a.status === "Pending" && b.status !== "Pending") return -1;
      if (a.status !== "Pending" && b.status === "Pending") return 1;
      return 0;
    });
  }, [searchTerm, activeTab, usersData]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData, itemsPerPage]);

  
  const hasPending = useMemo(() => {
    return currentItems.some((user) => user.status === "Pending");
  }, [currentItems]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / itemsPerPage),
    [filteredData, itemsPerPage]
  );


  const visiblePageRange = useMemo(() => {
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages && totalPages >= maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages]);

  
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
    console.log("Printing...");
  };

  const handleGenerate = () => {
    console.log("Generating report...");
  };

  const columns = useMemo(() => getColumns(setUsersData, hasPending), [setUsersData, hasPending]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col overflow-x-hidden">
    
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

      
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2">
        <div className="w-full overflow-x-hidden">
          <DataTable
            columns={columns}
            data={currentItems}
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="w-full table-fixed border-collapse overflow-x-hidden"
            style={{ tableLayout: "fixed" }} 
          />
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-2 border-t border-gray-200 overflow-x-hidden">
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={handlePrevPage}
                className={cn(
                  "cursor-pointer",
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
              {visiblePageRange[0] > 1 && <PaginationEllipsis />}
              {visiblePageRange.map((page) => (
                <PaginationLink
                  key={page}
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
              ))}
              {visiblePageRange[visiblePageRange.length - 1] < totalPages && (
                <PaginationEllipsis />
              )}
              <PaginationNext
                onClick={handleNextPage}
                className={cn(
                  "cursor-pointer",
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}