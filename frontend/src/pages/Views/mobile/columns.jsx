"use client"

import { Pencil, Trash } from "heroicons-react"

export const columns = [
  {
    accessorKey: "image",
    header: "",
    cell: () => (
      <img
        src="/images/sadGato.jpg"
        alt="User"
        className="h-12 w-12 rounded-full object-cover"
      />
    ),
  },
  {
    accessorKey: "details",
    header: "",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.userId}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-Icpetgreen p-1 hover:bg-gray-100 rounded">
                <Pencil size={18} />
              </button>
              <button className="text-red-500 p-1 hover:bg-gray-100 rounded">
                <Trash size={18} />
              </button>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.contact}</p>
          </div>
        </div>
      )
    },
  },
] 