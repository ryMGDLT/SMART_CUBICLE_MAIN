// React and Hooks
import React, { useState, useMemo, useEffect } from "react";

// UI Components
import { Printer, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
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

// Data columns for the table
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
import { useAuth } from "../../../components/controller/authController";

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
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://192.168.8.181:5000";

  
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

  // Fetch on mount
  useEffect(() => {
    fetchJanitors();
  }, []);

  console.log("Logged-in User:", user);

// Mapping the janitors data to the table
const mappedJanitorsData = useMemo(() => {
  return janitorsData.map((janitor) => ({
    _id: janitor._id,
    basicDetails: {
      image: janitor.basicDetails?.image || DEFAULT_PROFILE_IMAGE,
      name: janitor.basicDetails?.name || "",
      employeeId: janitor.basicDetails?.employeeId || "",
      email: janitor.basicDetails?.email || "",
      contact: janitor.basicDetails?.contact || "",
    },
    //make this data in this tab an array
    schedule: janitor.schedule?.length > 0 ? janitor.schedule : [], 
    performanceTrack: janitor.performanceTrack?.length > 0 ? janitor.performanceTrack : [], 
    resourceUsage: janitor.resourceUsage?.length > 0 ? janitor.resourceUsage : [], 
    logsReport: janitor.logsReport?.length > 0 ? janitor.logsReport : [], 
  }));
}, [janitorsData]);

  // Check if the janitor data is mapped
  console.log("Mapped Janitors Data:", mappedJanitorsData);

  
 // Filter the janitors data based on the search term and the active tab
const filteredJanitors = useMemo(() => {
  console.log("Debug: Checking filtering logic...");
  console.log("Logged-in User Role:", userRole);
  console.log("Logged-in User ID:", user?.id);
  console.log("Logged-in User Email:", user?.email);

  if (!mappedJanitorsData.length) {
    console.log("No janitors data found!");
    return [];
  }

  mappedJanitorsData.forEach((janitor) => {
    console.log("Existing Janitor Email:", janitor.basicDetails.email);
  });

  // Filter based on user role Janitor sees only their own data
  let roleFilteredData = mappedJanitorsData;
  if (userRole === "Janitor") {
    roleFilteredData = mappedJanitorsData.filter(
      (janitor) => janitor.basicDetails.email === user?.email
    );
    console.log("Filtered Janitor Data (Role-based):", roleFilteredData);
  }

  // Filter based on active tab and ensure non-empty arrays
  return roleFilteredData.filter((janitor) => {
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

    // For Basic Details show all janitors regardless of array data
    if (propertyKey === "basicDetails") {
      return Object.values(data)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    // For other tabs, exclude janitors with empty arrays
    if (!data || data.length === 0) {
      return false;
    }

    // Search across all entries in the array
    const isMatch = data.some((entry) =>
      Object.values(entry)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

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
  const paginatedItems = filteredJanitors.slice(indexOfFirstItem, indexOfLastItem);

  // Flatten arrays for the active tab and reverse to show newest items on top
  return paginatedItems.flatMap((janitor) => {
    const tabProperty = activeTab.toLowerCase().replace(/\s+/g, "");
    const propertyKey =
      {
        basicdetails: "basicDetails",
        logsandreport: "logsReport",
        performancetrack: "performanceTrack",
        resourceusage: "resourceUsage",
        schedule: "schedule",
      }[tabProperty] || tabProperty;

    if (propertyKey === "basicDetails") {
      return [janitor]; 
    }

    // Reverse the array to show newest entries first, then map
    const reversedEntries = [...janitor[propertyKey]].reverse();
    return reversedEntries.map((entry) => ({
      ...janitor,
      [propertyKey]: entry,
    }));
  });
}, [currentPage, filteredJanitors, activeTab]);

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
  const handleProfileUpdate = async () => {
    await fetchJanitors(); 
  };
  return (
    <Card className="flex flex-col p-4 h-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Search and Buttons Row */}
      <div className="flex flex-row justify-between items-center shrink-0">
        {/* Search Bar */}
        <div className="relative w-96">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
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

      {/* Tabs Navigation */}
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
                  "hover:text-gray-700 hover:bg-gray-50",
                  "transition-colors duration-200 ease-in-out",
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
