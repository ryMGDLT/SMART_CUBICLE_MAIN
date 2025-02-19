import React, { useState, useMemo, useCallback } from "react";
import { Bar, Line } from "react-chartjs-2";
import { ChevronUp, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { RESOURCES_DATA } from "../../../data/placeholderData";
import ReminderCard from "../../../components/reports/reminderCard";
import { REMINDERS_DATA } from "../../../data/placeholderData";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { PencilIcon, Printer } from "lucide-react";
import { setDefaultOptions } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { inventoryColumns } from "../../../components/tables/resources/inventory-column";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "../../../components/ui/pagination";
import { Card, CardHeader, CardContent } from "../../../components/ui/card";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Set default locale for date-fns
setDefaultOptions({ locale: enUS });

export default function ResourceManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm] = useState("");
  const itemsPerPage = 10;
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Handler for printing
  const handlePrint = () => {
    window.print();
  };

  // Handler for generating report
  const handleGenerate = () => {
    // Add your report generation logic here
    console.log("Generating report...");
  };

  // Import RESOURCES_DATA and calculate pagination
  const filteredData = useMemo(() => {
    return RESOURCES_DATA.filter((resource) =>
      Object.values(resource).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Simplified pagination handlers
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  // Memoize page numbers array
  const pageNumbers = useMemo(() => 
    Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  // Bar chart data
  const barData = {
    labels: [
      "Water Usage",
      "Bleach (Toilet)",
      "Bleach (Walls & Floor)",
      "Detergent",
    ],
    datasets: [
      {
        label: "Actual Usage",
        data: [6, 4, 8, 8],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        label: "Recommended",
        data: [4, 8, 4, 6],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  };

  // Line chart data
  const lineData = {
    labels: ["1st Week", "2nd Week", "3rd Week", "4th Week", "5th Week"],
    datasets: [
      {
        label: "Cleaning Pattern",
        data: [2, 3, 4, 4.5, 5],
        borderColor: "rgba(54, 162, 235, 0.8)",
        tension: 0.4,
      },
      {
        label: "Resources Consumed",
        data: [2, 2.5, 3, 3.5, 4],
        borderColor: "rgba(75, 192, 192, 0.8)",
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const barOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const table = useReactTable({
    data: currentItems,
    columns: inventoryColumns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: itemsPerPage,
      },
    },
  });

  return (
    <div className="h-full flex flex-col">
      {/* Main Container */}
      <div className="flex-1 flex flex-row gap-3 p-6 overflow-hidden bg-white shadow-md rounded-lg">
        {/* Left Content Area */}
        <div className="flex-[3] flex flex-col gap-3 min-w-0">
          {/* Charts Grid */}

          <div className="h-[320px] shrink-0">
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Resources Usage Chart */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-md">Resources Usage</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    ...
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  <Bar
                    data={barData}
                    options={{
                      ...barOptions,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </div>
              {/* Trends Chart */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-md">Trends Over Time</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    ...
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  <Line
                    data={lineData}
                    options={{
                      ...lineOptions,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Inventory Table Section */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Inventory Table Header */}
            <div className="flex items-center justify-between py-4">
              <h2 className="font-bold text-2xl">Inventory</h2>
              <div className="flex items-center justify-between relative w-full sm:w-[200px]">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleMonthChange(1)}
                >
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                </Button>
                <div className="relative inline-block">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    showPopperArrow={false}
                    popperContainer={({ children }) => (
                      <div className="absolute z-[9999] mt-2">{children}</div>
                    )}
                    customInput={
                      <span className="text-gray-700 font-medium cursor-pointer">
                        {selectedDate.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    }
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleMonthChange(-1)}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleGenerate}
                  className="flex items-center gap-2 bg-Icpetgreen hover:bg-Icpetgreen/90"
                >
                  <PencilIcon className="w-4 h-4" />
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Table Container */}
            <div className="flex-1 overflow-auto border border-gray-200 rounded-lg shadow-md">
              <div className="flex flex-col min-w-full h-full">
                {/* Table Header */}
                <div className="border-b">
                  <Table className="min-w-full">
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

                {/* Inventory Table Body*/}
                <div className="flex-1 overflow-auto">
                  <Table className="min-w-full">
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
                            colSpan={inventoryColumns.length}
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
                  {totalPages > 1 && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={handlePrevPage}
                            className={cn(
                              "cursor-pointer select-none",
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
                                "cursor-pointer select-none",
                                currentPage === page &&
                                  "bg-Icpetgreen text-white hover:bg-Icpetgreen/90"
                              )}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={handleNextPage}
                            className={cn(
                              "cursor-pointer select-none",
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
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="max-w-[360px] flex-[1] flex flex-col gap-6">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 shrink-0">
              <h2 className="font-bold text-2xl">Reminder</h2>
              <button className="text-sm text-green-600 bg-green-100 px-3 py-1.5 rounded-lg hover:bg-green-200">
                Janitors Usage
              </button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto min-h-0">
              <div className="space-y-4 pr-2">
                {REMINDERS_DATA.map((reminderSection, idx) => (
                  <ReminderCard
                    key={idx}
                    date={reminderSection.date}
                    items={reminderSection.items}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
