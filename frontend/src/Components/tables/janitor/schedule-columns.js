"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
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
    status === "Early"
      ? "success"
      : status === "On Time"
      ? "warning"
      : status === "Over Time"
      ? "destructive"
      : null;

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Here you can add API call to update the status in the backend
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <Badge
            variant={variant}
            className="w-full px-2 cursor-pointer justify-between max-w-[95px]"
          >
            {status}
            {isOpen ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[120px]">
        <DropdownMenuItem onClick={() => handleStatusChange("Early")}>Early</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("On Time")}>On Time</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("Over Time")}>Over Time</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const scheduleColumns = [
  {
    accessorKey: "schedule.image",
    header: "Profile Pic",
    cell: ({ row }) => {
      return (
        <div className="flex items-center px-2">
          <Avatar>
            <AvatarImage src={row.original.schedule.image} alt={row.original.schedule.name} />
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
    accessorKey: "schedule.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="truncate px-2">
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
      return <StatusCell status={status} />;
    },
    size: 0.23,
  },
];
