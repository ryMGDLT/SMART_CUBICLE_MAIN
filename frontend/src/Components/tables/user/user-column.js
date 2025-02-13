"use client";

import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { UserRoundIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

export const getColumns = (handleAccept, handleDecline) => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 max-w-[180px]">
          <Avatar>
            <AvatarImage src={row.original.image || "/images/sadGato.jpg"} />
            <AvatarFallback>
              <UserRoundIcon className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium truncate">{row.original.name}</p>
        </div>
      );
    },
    size: 0.25,
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => (
      <div className="truncate">{row.original.employeeId}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="truncate">{row.original.email}</div>,
    size: 0.2,
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => <div className="truncate">{row.original.contact}</div>,
    size: 0.15,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <div className="truncate">{row.original.position}</div>,
    size: 0.15,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-center gap-2">
          {user.status === "Pending" ? (
            <>
              <button
                className="rounded-lg bg-Icpetgreen px-4 py-2 text-xs font-medium text-white hover:bg-Icpetgreen/90"
                onClick={() => handleAccept(user.employeeId)}
              >
                Accept
              </button>
              <button
                className="rounded-lg border border-red-500 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => handleDecline(user.employeeId)}
              >
                Decline
              </button>
            </>
          ) : (
            <Badge
              variant={user.status === "Accepted" ? "success" : "destructive"}
              className="w-fit"
            >
              {user.status}
            </Badge>
          )}
        </div>
      );
    },
    size: 0.1,
  },
];
