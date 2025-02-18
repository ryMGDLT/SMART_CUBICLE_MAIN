"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { UserRoundIcon } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { toast } from "../../ui/use-toast";

const API_BASE_URL = 'http://192.168.1.8:5000';

const StatusCell = ({ status, scheduleId, onDataChange }) => {
  const variant =
    status === "Early"
      ? "success"
      : status === "On Time"
      ? "warning"
      : status === "Over Time"
      ? "destructive"
      : null;

  const handleStatusChange = async (newStatus) => {
    if (!scheduleId) {
      console.error('Missing scheduleId', { scheduleId, status });
      toast({
        title: "Error",
        description: "Could not update status: Missing schedule ID",
        variant: "destructive",
      });
      return;
    }

    console.log('Status change requested:', { 
      from: status, 
      to: newStatus,
      scheduleId: scheduleId 
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/janitors/${scheduleId}/schedule/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        }),
      });

      const responseData = await response.text();
      console.log('Raw response:', responseData);

      let jsonData;
      try {
        jsonData = JSON.parse(responseData);
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid response from server');
      }

      console.log('API Response:', { 
        ok: response.ok, 
        status: response.status,
        data: jsonData
      });

      if (!response.ok) {
        throw new Error(jsonData.message || 'Failed to update status');
      }

      if (typeof onDataChange === 'function') {
        console.log('Triggering table refresh');
        onDataChange();
      }

      toast({
        title: "Status Updated",
        description: `Schedule status changed to ${newStatus}`,
        variant: "success",
      });

    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Badge variant={variant} className="w-fit cursor-pointer">
          {status}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[120px]">
        <DropdownMenuItem onClick={() => handleStatusChange("Early")}>
          Early
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("On Time")}>
          On Time
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("Over Time")}>
          Over Time
        </DropdownMenuItem>
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
      // Log the entire row data to debug
      console.log('Row data:', row.original);
      
      const scheduleId = row.original._id;
      const status = row.original.schedule?.status;

      if (!scheduleId) {
        console.error('No scheduleId found in row:', row.original);
        return null;
      }

      return (
        <StatusCell 
          status={status}
          scheduleId={scheduleId}
          onDataChange={row.original.onDataChange}
        />
      );
    },
    size: 0.2,
  },
];
