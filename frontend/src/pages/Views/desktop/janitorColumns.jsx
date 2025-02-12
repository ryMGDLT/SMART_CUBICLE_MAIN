"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash } from "heroicons-react"
import { Button } from "../../../Components/ui/button"
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData"

export const getColumns = (handleEdit, handleDelete, activeTab) => {
  const basicDetailsColumns = [
    {
      accessorKey: "basicDetails.image",
      header: "Profile",
      cell: ({ row }) => (
        <img
          src={row.original.basicDetails.image || DEFAULT_PROFILE_IMAGE}
          alt={row.original.basicDetails.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    {
      accessorKey: "basicDetails.name",
      header: "Name",
    },
    {
      accessorKey: "basicDetails.employeeId",
      header: "Employee ID",
    },
    {
      accessorKey: "basicDetails.email",
      header: "Email",
    },
    {
      accessorKey: "basicDetails.contact",
      header: "Contact",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-Icpetgreen hover:text-Icpetgreen/90"
            onClick={() => handleEdit(row.original.basicDetails.employeeId)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-500/90"
            onClick={() => handleDelete(row.original.basicDetails.employeeId)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  const scheduleColumns = [
    {
      accessorKey: "schedule.image",
      header: "Profile",
      cell: ({ row }) => (
        <img
          src={row.original.schedule.image || DEFAULT_PROFILE_IMAGE}
          alt={row.original.schedule.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    {
      accessorKey: "schedule.name",
      header: "Name",
    },
    {
      accessorKey: "schedule.date",
      header: "Date",
    },
    {
      accessorKey: "schedule.shift",
      header: "Shift",
    },
    {
      accessorKey: "schedule.timeIn",
      header: "Time In",
    },
    {
      accessorKey: "schedule.timeOut",
      header: "Time Out",
    },
    {
      accessorKey: "schedule.cleaningHour",
      header: "Cleaning Hours",
    },
    {
      accessorKey: "schedule.task",
      header: "Task",
    },
    {
      accessorKey: "schedule.status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.schedule.status === "On Time"
              ? "bg-green-100 text-green-800"
              : row.original.schedule.status === "Late"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.schedule.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-Icpetgreen hover:text-Icpetgreen/90"
            onClick={() => handleEdit(row.original.schedule.employeeId)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-500/90"
            onClick={() => handleDelete(row.original.schedule.employeeId)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  const performanceColumns = [
    {
      accessorKey: "performanceTrack.image",
      header: "Profile",
      cell: ({ row }) => (
        <img
          src={row.original.performanceTrack.image || DEFAULT_PROFILE_IMAGE}
          alt={row.original.performanceTrack.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    {
      accessorKey: "performanceTrack.name",
      header: "Name",
    },
    {
      accessorKey: "performanceTrack.today",
      header: "Today",
      cell: ({ row }) => `${row.original.performanceTrack.today} hrs`,
    },
    {
      accessorKey: "performanceTrack.thisWeek",
      header: "This Week",
      cell: ({ row }) => `${row.original.performanceTrack.thisWeek} hrs`,
    },
    {
      accessorKey: "performanceTrack.thisMonth",
      header: "This Month",
      cell: ({ row }) => `${row.original.performanceTrack.thisMonth} hrs`,
    },
    {
      accessorKey: "performanceTrack.thisYear",
      header: "This Year",
      cell: ({ row }) => `${row.original.performanceTrack.thisYear} hrs`,
    },
    {
      accessorKey: "performanceTrack.status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.performanceTrack.status === "Excellent"
              ? "bg-green-100 text-green-800"
              : row.original.performanceTrack.status === "Good"
              ? "bg-blue-100 text-blue-800"
              : row.original.performanceTrack.status === "Fair"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.performanceTrack.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-Icpetgreen hover:text-Icpetgreen/90"
            onClick={() => handleEdit(row.original.performanceTrack.employeeId)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-500/90"
            onClick={() => handleDelete(row.original.performanceTrack.employeeId)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  const resourceColumns = [
    {
      accessorKey: "resourceUsage.image",
      header: "Profile",
      cell: ({ row }) => (
        <img
          src={row.original.resourceUsage.image || DEFAULT_PROFILE_IMAGE}
          alt={row.original.resourceUsage.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    {
      accessorKey: "resourceUsage.name",
      header: "Name",
    },
    {
      accessorKey: "resourceUsage.resource",
      header: "Resource",
    },
    {
      accessorKey: "resourceUsage.amountUsed",
      header: "Amount Used",
    },
    {
      accessorKey: "resourceUsage.remaining",
      header: "Remaining",
    },
    {
      accessorKey: "resourceUsage.restocked",
      header: "Restocked",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.resourceUsage.restocked === "Yes"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.resourceUsage.restocked}
        </span>
      ),
    },
    {
      accessorKey: "resourceUsage.note",
      header: "Note",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.resourceUsage.note === "Normal Usage"
              ? "bg-green-100 text-green-800"
              : row.original.resourceUsage.note === "Higher than Average"
              ? "bg-yellow-100 text-yellow-800"
              : row.original.resourceUsage.note === "Excessive Usage"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.original.resourceUsage.note}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-Icpetgreen hover:text-Icpetgreen/90"
            onClick={() => handleEdit(row.original.resourceUsage.employeeId)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-500/90"
            onClick={() => handleDelete(row.original.resourceUsage.employeeId)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  const logsColumns = [
    {
      accessorKey: "logsReport.image",
      header: "Profile",
      cell: ({ row }) => (
        <img
          src={row.original.logsReport.image || DEFAULT_PROFILE_IMAGE}
          alt={row.original.logsReport.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    {
      accessorKey: "logsReport.name",
      header: "Name",
    },
    {
      accessorKey: "logsReport.date",
      header: "Date",
    },
    {
      accessorKey: "logsReport.startTime",
      header: "Start Time",
    },
    {
      accessorKey: "logsReport.endTime",
      header: "End Time",
    },
    {
      accessorKey: "logsReport.duration",
      header: "Duration",
      cell: ({ row }) => `${row.original.logsReport.duration} hrs`,
    },
    {
      accessorKey: "logsReport.task",
      header: "Task",
    },
    {
      accessorKey: "logsReport.beforePicture",
      header: "Before",
      cell: ({ row }) => (
        <a
          href={row.original.logsReport.beforePicture}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      ),
    },
    {
      accessorKey: "logsReport.afterPicture",
      header: "After",
      cell: ({ row }) => (
        <a
          href={row.original.logsReport.afterPicture}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      ),
    },
    {
      accessorKey: "logsReport.status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.logsReport.status === "Done"
              ? "bg-green-100 text-green-800"
              : row.original.logsReport.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.logsReport.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-Icpetgreen hover:text-Icpetgreen/90"
            onClick={() => handleEdit(row.original.logsReport.employeeId)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-500/90"
            onClick={() => handleDelete(row.original.logsReport.employeeId)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  switch (activeTab) {
    case "Basic Details":
      return basicDetailsColumns
    case "Schedule":
      return scheduleColumns
    case "Performance Track":
      return performanceColumns
    case "Resource Usage":
      return resourceColumns
    case "Logs and Report":
      return logsColumns
    default:
      return basicDetailsColumns
  }
} 