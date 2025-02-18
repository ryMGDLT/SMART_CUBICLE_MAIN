"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";
import { UserRoundIcon } from "lucide-react";

export const resourceUsageColumns = [
  {
    accessorKey: "resourceUsage.image",
    header: "Profile Pic",
    cell: ({ row }) => {
      return (
        <div className="flex items-center px-2">
          <Avatar>
            <AvatarImage src={DEFAULT_PROFILE_IMAGE} alt={row.original.resourceUsage.name} />
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
    accessorKey: "resourceUsage.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="truncate px-2">
        <p className="text-sm font-medium truncate">
          {row.original.resourceUsage.name}
        </p>
      </div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "resourceUsage.resource",
    header: "Resource",
    cell: ({ row }) => (
      <div className="truncate">{row.original.resourceUsage.resource}</div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "resourceUsage.amountUsed",
    header: "Amount Used",
    cell: ({ row }) => (
      <div className="truncate">{row.original.resourceUsage.amountUsed}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "resourceUsage.remaining",
    header: "Remaining",
    cell: ({ row }) => (
      <div className="truncate">{row.original.resourceUsage.remaining}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "resourceUsage.note",
    header: "Note",
    cell: ({ row }) => (
      <div className="truncate">{row.original.resourceUsage.note}</div>
    ),
    size: 0.25,
  },
];
