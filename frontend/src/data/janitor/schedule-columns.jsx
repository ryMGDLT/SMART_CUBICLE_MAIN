"use client";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../Components/ui/avatar";
import { Badge } from "../../Components/ui/badge";
import { UserRoundIcon } from "lucide-react";

export const scheduleColumns = [
  {
    accessorKey: "schedule.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 max-w-[180px]">
        <Avatar>
          <AvatarImage src={row.original.schedule.image} />
          <AvatarFallback>
            <UserRoundIcon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium truncate">
          {row.original.schedule.name}
        </p>
      </div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "schedule.date",
    header: "Date",
    cell: ({ row }) => (
      <div className="truncate">{row.original.schedule.date}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "schedule.shift",
    header: "Shift",
    cell: ({ row }) => (
      <div className="truncate">{row.original.schedule.shift}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "schedule.timeIn",
    header: "Time In",
    cell: ({ row }) => (
      <div className="truncate">{row.original.schedule.timeIn}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "schedule.timeOut",
    header: "Time Out",
    cell: ({ row }) => (
      <div className="truncate">{row.original.schedule.timeOut}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "schedule.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.schedule.status;
      const variant = status === "On Time" ? "success" : "destructive";
      return (
        <Badge variant={variant} className="w-fit">
          {status}
        </Badge>
      );
    },
    size: 0.2,
  },
];
