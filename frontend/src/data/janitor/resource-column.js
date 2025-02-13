"use client";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { UserRoundIcon } from "lucide-react";

export const resourceUsageColumns = [
  {
    accessorKey: "resourceUsage.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 max-w-[180px]">
        <Avatar>
          <AvatarImage src={row.original.resourceUsage.image} />
          <AvatarFallback>
            <UserRoundIcon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium truncate">
          {row.original.resourceUsage.name}
        </p>
      </div>
    ),
    size: 0.25,
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
