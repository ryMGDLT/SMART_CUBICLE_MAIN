"use client"

import { Checkbox } from "../../../Components/ui/checkbox"
import { cn } from "../../../lib/utils"

export const getColumns = (handleAccept, handleDecline, activeTab) => {
  const baseColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
        />
      ),
    },
    {
      id: "priority",
      header: "",
      cell: ({ row }) => row.original.priority && <span className="text-red-500">!</span>,
    },
    {
      id: "profile",
      header: "Profile",
      cell: () => (
        <div className="flex justify-center">
          <img
            src="/images/sadGato.jpg"
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "employeeId",
      header: "Employee ID",
    },
    {
      accessorKey: "email",
      header: "Employee Email",
    },
    {
      accessorKey: "contact",
      header: "Contact Information",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex justify-center gap-2">
            {user.status === "Pending" ? (
              <>
                <button
                  className="rounded-lg bg-Icpetgreen px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
                  onClick={() => handleAccept(user.employeeId)}
                >
                  Accept
                </button>
                <button
                  className="rounded-lg border border-red-500 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDecline(user.employeeId)}
                >
                  Decline
                </button>
              </>
            ) : (
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  user.status === "Accepted"
                    ? "text-Icpetgreen bg-green-50"
                    : "text-red-500 bg-red-50"
                )}
              >
                {user.status}
              </span>
            )}
          </div>
        )
      },
    },
  ]

  return baseColumns
} 