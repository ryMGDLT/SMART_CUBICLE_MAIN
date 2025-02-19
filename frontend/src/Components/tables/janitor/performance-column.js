"use client";

import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { UserRoundIcon, ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const StatusCell = ({ status: initialStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  
  const variant =
    status === "Excellent"
      ? "success"
      : status === "Good"
      ? "default"
      : "warning";

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Here you can add API call to update the status in the backend
  };

  return (
    <div className="flex justify-center">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div>
            <Badge
              variant={variant}
              className="w-full px-2 cursor-pointer justify-between min-w-[95px]"
            >
              {status}
              {isOpen ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
            </Badge>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[120px]">
          <DropdownMenuItem onClick={() => handleStatusChange("Excellent")}>Excellent</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange("Good")}>Good</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange("Poor")}>Poor</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const performanceTrackColumns = [
  {
    accessorKey: "performanceTrack.image",
    header: () => <div className="text-center">Profile Pic</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center px-2 justify-center">
          <Avatar>
            <AvatarImage src={row.original.performanceTrack.image} alt={row.original.performanceTrack.name} />
            <AvatarFallback>
              <UserRoundIcon className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
    size: 0.08,
  },
  {
    accessorKey: "performanceTrack.name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="truncate px-2">
        <p className="text-sm font-medium truncate text-center">
          {row.original.performanceTrack.name}
        </p>
      </div>
    ),
    size: 0.17,
  },
  {
    accessorKey: "performanceTrack.today",
    header: () => <div className="text-center">Today (hrs)</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.performanceTrack.today}</div>
    ),
    size: 0.11,
  },
  {
    accessorKey: "performanceTrack.thisWeek",
    header: () => <div className="text-center">This Week</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.performanceTrack.thisWeek}</div>
    ),
    size: 0.11,
  },
  {
    accessorKey: "performanceTrack.thisMonth",
    header: () => <div className="text-center">This Month</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.performanceTrack.thisMonth}</div>
    ),
    size: 0.11,
  },
  {
    accessorKey: "performanceTrack.maxCleaningHour",
    header: () => <div className="text-center">Max Hours</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.performanceTrack.maxCleaningHour}</div>
    ),
    size: 0.11,
  },
  {
    accessorKey: "performanceTrack.minCleaningHour",
    header: () => <div className="text-center">Min Hours</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.performanceTrack.minCleaningHour}</div>
    ),
    size: 0.11,
  },
  {
    accessorKey: "performanceTrack.status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.original.performanceTrack.status;
      return <StatusCell className="justify-center" status={status} />;
    },
    size: 0.20, 
  },
];
