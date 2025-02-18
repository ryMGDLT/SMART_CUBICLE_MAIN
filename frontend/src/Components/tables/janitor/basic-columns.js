"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";
import { UserRoundIcon } from "lucide-react";

export const basicColumns = [
  {
    accessorKey: "basicDetails.image",
    header: "Profile Pic",
    cell: ({ row }) => {
      return (
        <div className="flex items-center max-w-[180px] px-2">
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
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="truncate">
          <p className="text-sm font-medium truncate">
            {row.original.basicDetails.name}
          </p>
        </div>
      );
    },
    size: 0.25,
  },
  {
    accessorKey: "basicDetails.employeeId",
    header: "Employee ID",
    cell: ({ row }) => (
      <div className="truncate">{row.original.basicDetails.employeeId}</div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "basicDetails.email",
    header: "Email",
    cell: ({ row }) => (
      <div className="truncate">{row.original.basicDetails.email}</div>
    ),
    size: 0.3,
  },
  {
    accessorKey: "basicDetails.contact",
    header: "Contact Information",
    cell: ({ row }) => (
      <div className="truncate">{row.original.basicDetails.contact}</div>
    ),
    size: 0.25,
  },
];
