"use client";

import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { UserRoundIcon } from "lucide-react";

export const logsReportColumns = [
  {
    accessorKey: "logsReport.image",
    header: "Profile Pic",
    cell: ({ row }) => {
      return (
        <div className="flex items-center px-2">
          <Avatar>
            <AvatarImage src={row.original.logsReport.image} alt={row.original.logsReport.name} />
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
    accessorKey: "logsReport.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="truncate px-2">
        <p className="text-sm font-medium truncate">
          {row.original.logsReport.name}
        </p>
      </div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "logsReport.date",
    header: "Date",
    cell: ({ row }) => (
      <div className="truncate">{row.original.logsReport.date}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "logsReport.startTime",
    header: "Start Time",
    cell: ({ row }) => (
      <div className="truncate">{row.original.logsReport.startTime}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "logsReport.endTime",
    header: "End Time",
    cell: ({ row }) => (
      <div className="truncate">{row.original.logsReport.endTime}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "logsReport.task",
    header: "Task",
    cell: ({ row }) => (
      <div className="truncate">{row.original.logsReport.task}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "logsReport.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.logsReport.status;
      const variant =
        status === "Done"
          ? "success"
          : status === "Pending"
          ? "warning"
          : "destructive";
      return (
        <Badge variant={variant} className="w-fit">
          {status}
        </Badge>
      );
    },
    size: 0.2,
  },
];
