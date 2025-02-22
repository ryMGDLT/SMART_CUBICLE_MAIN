import React, { useState } from "react";
import { UsageMonitoringChart } from "../../../components/charts/mainCharts";
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
import { ChevronUp, ChevronDown, Printer } from "heroicons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  JANITOR_SCHEDULE_DATA,
  USAGE_MONITOR_DATA,
} from "../../../data/placeholderData";
import CardUsageReport from "../../../components/reports/cardUsageReport";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { inventoryColumns } from "../../../components/tables/usage-monitor/inventory-columns";
import { janitorColumns } from "../../../components/tables/usage-monitor/janitor-columns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function UsageMonitor() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleMonthChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  // Usage Monitoring Chart Data

  const inventoryTable = useReactTable({
    data: USAGE_MONITOR_DATA,
    columns: inventoryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const janitorTable = useReactTable({
    data: JANITOR_SCHEDULE_DATA,
    columns: janitorColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="flex flex-col h-full bg-white shadow-md p-1 rounded-lg overflow-hidden">
      <CardContent className="flex-1 flex flex-col min-h-0 p-2 sm:p-4 gap-2 sm:gap-4">
        {/* Top Row */}
        <div
          className="flex flex-col lg:flex-row gap-2 sm:gap-4"
          style={{ height: "55%" }}
        >
          {/* Usage Monitor Chart */}
          <Card className="w-full lg:w-2/3 flex flex-col h-full overflow-hidden">
            <CardContent className="flex-1 p-4 flex flex-col min-h-0">
              <div className="relative flex-1 w-full min-h-0">
                <UsageMonitoringChart showHeading={false} />
              </div>
            </CardContent>
          </Card>

          {/* Usage Report Card */}
          <Card className="w-full lg:w-1/3 flex flex-col h-full">
            <CardHeader className="border-b shrink-0 p-4 space-y-0">
              <CardTitle className="text-xl font-semibold">
                Usage Report
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col min-h-0">
              <div className="flex-1 overflow-auto">
                <CardUsageReport />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 flex-1 min-h-0">
          {/* Inventory Table */}
          <Card className="w-full lg:w-2/3 flex flex-col h-full">
            <CardHeader className="border-b shrink-0 p-2 sm:p-4 space-y-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex gap-2 sm:gap-4 w-full justify-between">
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  Inventory
                </CardTitle>
                {/* Date Picker */}
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

                {/* Generate Graph and Print Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    className="bg-Icpetgreen hover:bg-opacity-90 text-sm sm:text-base"
                  >
                    Generate Graph
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Printer className="h-4 w-4 sm:h-5 sm:w-5 text-Icpetgreen" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col min-h-0">
              {/* Table Header */}
              <div className="border-b shrink-0">
                <Table>
                  <TableHeader>
                    {inventoryTable.getHeaderGroups().map((headerGroup) => (
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
                    {inventoryTable.getRowModel().rows?.length ? (
                      inventoryTable.getRowModel().rows.map((row) => (
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
            </CardContent>
          </Card>

          {/* Janitors Schedule Table */}
          <Card className="w-full lg:w-1/3 flex flex-col h-full">
            <CardHeader className="border-b shrink-0 p-4 space-y-0 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Janitors Schedule
              </CardTitle>
              <div className="flex items-center gap-4">
                <Button
                  variant="default"
                  className="bg-Icpetgreen hover:bg-opacity-90"
                >
                  Generate Schedule
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Printer className="h-5 w-5 text-Icpetgreen" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col min-h-0">
              {/* Table Header */}
              <div className="border-b shrink-0">
                <Table>
                  <TableHeader>
                    {janitorTable.getHeaderGroups().map((headerGroup) => (
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

              {/* Table Body */}
              <Table>
                <TableBody>
                  {janitorTable.getRowModel().rows?.length ? (
                    janitorTable.getRowModel().rows.map((row) => (
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
                        colSpan={janitorColumns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
