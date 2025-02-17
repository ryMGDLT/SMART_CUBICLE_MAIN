"use client";

import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DEFAULT_PROFILE_IMAGE } from "../../data/placeholderData";

export const getColumns = (
  handleAccept,
  handleDecline,
  activeTab,
  handleRoleChange,
  hideActions 
) => {
  const baseColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
        />
      ),
    },
    {
      id: "priority",
      header: "",
      cell: ({ row }) => {
        const user = row.original;
        return user.status === "Pending" ? (
          <span className="animate-pulseScale text-red-500 text-2xl">!</span>
        ) : null;
      },
    },
    {
      id: "profile",
      header: () => <div className="text-center">Profile</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center">
            <img
              src={user.profileImage || DEFAULT_PROFILE_IMAGE} 
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "fullName",
      header: "Name",
    },
    {
      accessorKey: "employee_id",
      header: "Employee ID",
    },
    {
      accessorKey: "email",
      header: "Employee Email",
    },
    {
      accessorKey: "contact_number",
      header: "Contact Information",
    },
    {
      accessorKey: "role",
      header: "Position",
      cell: ({ row }) => {
        const user = row.original;
        const isAccepted = user.status === "Accepted";
        const isDeclined = user.status === "Declined";
        const hasRole = user.role && user.role !== "Select Role";

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-32",
                  (isAccepted && hasRole) || isDeclined
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                )}
                disabled={(isAccepted && hasRole) || isDeclined}
              >
                {user.role || "Select Role"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleRoleChange(user._id, "User")}
                disabled={(isAccepted && hasRole) || isDeclined}
              >
                User
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleRoleChange(user._id, "Janitor")}
                disabled={(isAccepted && hasRole) || isDeclined}
              >
                Janitor
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleRoleChange(user._id, "Admin")}
                disabled={(isAccepted && hasRole) || isDeclined}
              >
                Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              user.status === "Accepted"
                ? "text-Icpetgreen bg-green-50"
                : user.status === "Declined"
                ? "text-red-500 bg-red-50"
                : "text-gray-500 bg-gray-50"
            )}
          >
            {user.status}
          </span>
        );
      },
    },
  
    ...(!hideActions
      ? [
          {
            id: "actions",
            header: () => <div className="text-center">Action</div>,
            cell: ({ row }) => {
              const user = row.original;
              return (
                <div className="flex justify-center items-center gap-2">
                  {user.status === "Pending" && (
                    <>
                      <button
                        className="rounded-lg bg-Icpetgreen px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
                        onClick={() => handleAccept(user._id, user.role, user.fullName)}
                      >
                        Accept
                      </button>
                      <button
                        className="rounded-lg border border-red-500 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => handleDecline(user._id)}
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              );
            },
          },
        ]
      : []),
  ];

  return baseColumns;
};