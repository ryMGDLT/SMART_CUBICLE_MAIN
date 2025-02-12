import React, { useState, useMemo } from "react";
import { Printer } from "heroicons-react";
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
import { getColumns } from "./janitorColumns";
import { JANITORS_DATA } from "../../../data/placeholderData";

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
  const itemsPerPage = 10;

  const filteredJanitors = useMemo(() => {
    return JANITORS_DATA.filter((janitor) => {
      const tabProperty = activeTab.toLowerCase().replace(/\s+/g, '');
      const propertyKey = tabProperty === 'basicdetails' ? 'basicDetails' 
        : tabProperty === 'logsandreport' ? 'logsReport'
        : tabProperty;
      
      const data = janitor[propertyKey];
      if (!data) return false;

      return Object.values(data)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, activeTab]);

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

  const handleEdit = (id) => console.log("Edit janitor:", id);
  const handleDelete = (id) => console.log("Delete janitor:", id);
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="h-full flex flex-col shadow-md bg-white rounded-lg p-6">
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
          <Button variant="outline" size="icon" onClick={() => console.log("Print")}>
            <Printer className="w-5 h-5 text-Icpetgreen" />
          </Button>
        </div>
      </div>

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

      <div className="flex-1 overflow-hidden mt-6 shadow-md rounded-lg border border-gray-200">
        <div className="flex flex-col h-full">
          <div className="overflow-x-auto border-b border-gray-200">
            <div className="min-w-full">
              <div style={{ height: '1px' }} />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <DataTable
              columns={getColumns(handleEdit, handleDelete, activeTab)}
              data={currentItems}
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              className="min-w-full"
            />
          </div>

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
        </div>
      </div>
    </div>
  );
}
