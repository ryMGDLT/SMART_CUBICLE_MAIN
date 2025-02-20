"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";
import { Badge } from "../../ui/badge";

export const janitorColumns = [
  {
    accessorKey: "janitor",
    header: "Name",
    cell: ({ row }) => {
      const janitorName = row.getValue("janitor");
      return (
        <div className="flex items-center gap-2 max-w-[180px]">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={DEFAULT_PROFILE_IMAGE} alt={janitorName} />
            <AvatarFallback>{janitorName[0]}</AvatarFallback>
          </Avatar>
          <span className="truncate font-semibold text-sm">{janitorName}</span>
        </div>
      );
    },
    size: 0.25,
  },
  {
    accessorKey: "lastCleaning",
    header: "Last Cleaning",
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("lastCleaning")}</div>
    ),
    size: 0.25, // Increased from 0.2 to 0.25
  },
  {
    accessorKey: "scheduled",
    header: "Scheduled",
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("scheduled")}</div>
    ),
    size: 0.25, // Increased from 0.2 to 0.25
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variant =
        status === "Done"
          ? "success"
          : status === "Overdue"
          ? "destructive"
          : "warning";

      return (
        <div>
          <Badge variant={variant} className="w-fit">
            {status}
          </Badge>
        </div>
      );
    },
    size: 0.15,
  },
];
