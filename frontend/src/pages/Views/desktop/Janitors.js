import React, { useState, useMemo, useEffect } from "react";
import { Printer } from "heroicons-react";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import { cn } from "../../../lib/utils";
import { Card } from "../../../components/ui/card";

import { basicColumns } from "../../../components/tables/janitor/basic-columns";
import { scheduleColumns } from "../../../components/tables/janitor/schedule-columns";
import { performanceTrackColumns } from "../../../components/tables/janitor/performance-column";
import { resourceUsageColumns } from "../../../components/tables/janitor/resource-column";
import { logsReportColumns } from "../../../components/tables/janitor/logs-column";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";
import { useAuth } from "../../../components/controller/AuthController";

const TABS = [
  "Basic Details",
  "Schedule",
  "Performance Track",
  "Resource Usage",
  "Logs and Report",
];

export default function Janitors() {
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [janitorsData, setJanitorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const { user } = useAuth();
  const userRole = user?.role;

  useEffect(() => {
    const fetchJanitors = async () => {
      try {
        const response = await fetch("http://172.20.10.4:5000/api/janitors");
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

    fetchJanitors();
  }, []);

  console.log("Logged-in User:", user);

  const mappedJanitorsData = useMemo(() => {
    return janitorsData.map((janitor) => ({
      basicDetails: {
        _id: janitor._id,
        image: janitor.basicDetails?.image || DEFAULT_PROFILE_IMAGE,
        name: janitor.basicDetails?.name || "",
        employeeId: janitor.basicDetails?.employeeId || "",
        email: janitor.basicDetails?.email || "",
        contact: janitor.basicDetails?.contact || "",
      },
      schedule: {
        image: janitor.schedule?.image || DEFAULT_PROFILE_IMAGE,
        name: janitor.schedule?.name || "",
        date: janitor.schedule?.date || "",
        shift: janitor.schedule?.shift || "",
        timeIn: janitor.schedule?.timeIn || "",
        timeOut: janitor.schedule?.timeOut || "",
        cleaningHour: janitor.schedule?.cleaningHour || "",
        task: janitor.schedule?.task || "",
        status: janitor.schedule?.status || "",
      },
      performanceTrack: {
        image: janitor.performanceTrack?.image || DEFAULT_PROFILE_IMAGE,
        name: janitor.performanceTrack?.name || "",
        today: janitor.performanceTrack?.today || 0,
        thisWeek: janitor.performanceTrack?.thisWeek || 0,
        thisMonth: janitor.performanceTrack?.thisMonth || 0,
        thisYear: janitor.performanceTrack?.thisYear || 0,
        status: janitor.performanceTrack?.status || "",
        employeeId: janitor.performanceTrack?.employeeId || "",
      },
      resourceUsage: {
        image: janitor.resourceUsage?.image || DEFAULT_PROFILE_IMAGE,
        name: janitor.resourceUsage?.name || "",
        resource: janitor.resourceUsage?.resource || "",
        amountUsed: janitor.resourceUsage?.amountUsed || "",
        remaining: janitor.resourceUsage?.remaining || "",
        restocked: janitor.resourceUsage?.restocked || "",
        note: janitor.resourceUsage?.note || "",
        employeeId: janitor.resourceUsage?.employeeId || "",
      },
      logsReport: {
        image: janitor.logsReport?.image || DEFAULT_PROFILE_IMAGE,
        name: janitor.logsReport?.name || "",
        date: janitor.logsReport?.date || "",
        startTime: janitor.logsReport?.startTime || "",
        endTime: janitor.logsReport?.endTime || "",
        duration: janitor.logsReport?.duration || 0,
        task: janitor.logsReport?.task || "",
        beforePicture: janitor.logsReport?.beforePicture || "",
        afterPicture: janitor.logsReport?.afterPicture || "",
        status: janitor.logsReport?.status || "",
      },
    }));
  }, [janitorsData]);

  console.log("Mapped Janitors Data:", mappedJanitorsData);

  const filteredJanitors = useMemo(() => {
    console.log("Debug: Checking filtering logic...");
    console.log("Logged-in User Role:", userRole);
    console.log("Logged-in User ID:", user?.id);
    console.log("Logged-in User Email:", user?.email);

    if (!mappedJanitorsData.length) {
      console.log("🚨 No janitors data found!");
      return [];
    }

    mappedJanitorsData.forEach((janitor) => {
      console.log("Existing Janitor Email:", janitor.basicDetails.email);
    });

    if (userRole === "Janitor") {
      const filtered = mappedJanitorsData.filter(
        (janitor) => janitor.basicDetails.email === user?.email
      );

      console.log("Filtered Janitor Data:", filtered);
      return filtered;
    }

    return mappedJanitorsData.filter((janitor) => {
      const tabProperty = activeTab.toLowerCase().replace(/\s+/g, "");
      const propertyKey =
        {
          basicdetails: "basicDetails",
          logsandreport: "logsReport",
          performancetrack: "performanceTrack",
          resourceusage: "resourceUsage",
        }[tabProperty] || tabProperty;

      const data = janitor[propertyKey];
      if (!data) return false;

      const isMatch = Object.values(data)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (isMatch) console.log("Match found:", janitor.basicDetails.name);

      return isMatch;
    });
  }, [
    searchTerm,
    activeTab,
    mappedJanitorsData,
    userRole,
    user?.id,
    user?.email,
  ]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredJanitors.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredJanitors]);

  const totalPages = Math.ceil(filteredJanitors.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const getActiveColumns = () => {
    switch (activeTab) {
      case "Basic Details":
        return basicColumns;
      case "Schedule":
        return scheduleColumns;
      case "Performance Track":
        return performanceTrackColumns;
      case "Resource Usage":
        return resourceUsageColumns;
      case "Logs and Report":
        return logsReportColumns;
      default:
        return basicColumns;
    }
  };

  const table = useReactTable({
    data: currentItems,
    columns: getActiveColumns(),
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="flex flex-col h-full bg-white shadow-md p-1 rounded-lg overflow-hidden">
      {/* Search and Buttons Row */}
      <div className="flex flex-row justify-between items-center shrink-0">
        <div className="relative w-96">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-4 pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
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
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="default"
            className="bg-Icpetgreen hover:bg-Icpetgreen/90"
            onClick={() => console.log("Generate Schedule")}
          >
            Generate Schedule
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => console.log("Print")}
          >
            <Printer className="w-5 h-5 text-Icpetgreen" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent gap-6">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "rounded-lg data-[state=active]:shadow-none",
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

      {/* Table Container */}
      <div className="flex-1 overflow-hidden shadow-md rounded-lg border border-gray-200 mt-4">
        <div className="flex flex-col h-full">
          {/* Table Header */}
          <div className="border-b shrink-0">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-gray-50">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{
                          width: `${header.column.columnDef.size * 100}%`,
                        }}
                        className="h-8 px-2 py-2 sm:h-10 sm:px-3 sm:py-3 text-left align-middle font-medium text-gray-900 text-xs sm:text-sm"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            </Table>
          </div>

          {/* Table Body - Scrollable */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: `${cell.column.columnDef.size * 100}%`,
                          }}
                          className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={getActiveColumns().length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 bg-white p-2">
            {filteredJanitors.length > itemsPerPage && (
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
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
