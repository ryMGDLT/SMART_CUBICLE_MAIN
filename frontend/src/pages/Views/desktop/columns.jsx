"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash } from "heroicons-react"
import { Button } from "../../../Components/ui/button"
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData"

export const getColumns = (handleEdit, handleDelete, activeTab) => {
  switch (activeTab) {
    case "Basic Details":
      return [
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

    case "Schedule":
      return [
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

    default:
      return []
  }
} 