"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { UserRoundIcon } from "lucide-react";

export const basicColumns = [
  {
    accessorKey: "basicDetails.image",
    header: () => <div className="text-center">Profile Pic</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center px-2">
          <Avatar>
            <AvatarImage src={row.original.basicDetails.image} alt={row.original.basicDetails.name} />
            <AvatarFallback>
              <UserRoundIcon className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
    size: 0.1,
  },
  {
    accessorKey: "basicDetails.name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="truncate px-2">
        <p className="text-sm font-medium truncate text-center">
          {row.original.basicDetails.name}
        </p>
      </div>
    ),
    size: 0.25,
  },
  {
    accessorKey: "basicDetails.employeeId",
    header: () => <div className="text-center">Employee ID</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.basicDetails.employeeId}</div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "basicDetails.email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.basicDetails.email}</div>
    ),
    size: 0.3,
  },
  {
    accessorKey: "basicDetails.contact",
    header: () => <div className="text-center">Contact Information</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.basicDetails.contact}</div>
    ),
    size: 0.25,
  },
];
