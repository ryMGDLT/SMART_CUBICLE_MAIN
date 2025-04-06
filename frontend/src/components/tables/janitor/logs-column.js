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
    status === "Done"
      ? "success"
      : status === "Pending"
      ? "warning"
      : "destructive";

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    
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
        <DropdownMenuItem onClick={() => handleStatusChange("Done")}>Done</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("Pending")}>Pending</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("Cancelled")}>Cancelled</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const logsReportColumns = [
  {
    accessorKey: "logsReport.image",
    header: () => <div className="text-center">Profile Pic</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center px-2">
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
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="truncate px-2">
        <p className="text-sm font-medium truncate text-center">
          {row.original.logsReport.name}
        </p>
      </div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "logsReport.date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.logsReport.date}</div>
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
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.original.logsReport.status;
      return <div className="flex justify-center"><StatusCell status={status} /></div>;
    },
    size: 0.2,
  },
];
