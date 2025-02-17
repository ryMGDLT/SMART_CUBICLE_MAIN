"use client";

import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";
import { UserRoundIcon } from "lucide-react";

export const performanceTrackColumns = [
  {
    accessorKey: "performanceTrack.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 max-w-[180px]">
        <Avatar>
          <AvatarImage src={DEFAULT_PROFILE_IMAGE} />
          <AvatarFallback>
            <UserRoundIcon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium truncate">
          {row.original.performanceTrack.name}
        </p>
      </div>
    ),
    size: 0.25,
  },
  {
    accessorKey: "performanceTrack.today",
    header: "Today (hrs)",
    cell: ({ row }) => (
      <div className="truncate">{row.original.performanceTrack.today}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "performanceTrack.thisWeek",
    header: "This Week",
    cell: ({ row }) => (
      <div className="truncate">{row.original.performanceTrack.thisWeek}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "performanceTrack.thisMonth",
    header: "This Month",
    cell: ({ row }) => (
      <div className="truncate">{row.original.performanceTrack.thisMonth}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "performanceTrack.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.performanceTrack.status;
      const variant =
        status === "Excellent"
          ? "success"
          : status === "Good"
          ? "default"
          : "warning";
      return (
        <Badge variant={variant} className="w-fit">
          {status}
        </Badge>
      );
    },
    size: 0.3,
  },
];
