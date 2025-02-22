"use client";

import { Checkbox } from "../../ui/checkbox";
import { UserRoundIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { ChevronDown } from "lucide-react";

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
        <div className="flex justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
          />
        </div>
      ),
    },
    {
      id: "priority",
      header: "",
      cell: ({ row }) => {
        const user = row.original;
        return user.status === "Pending" ? (
          <div className="flex justify-center">
            <span className="animate-pulseScale text-red-500 text-sm">!</span>
          </div>
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
            <Avatar>
              <AvatarImage src={user.profileImage || DEFAULT_PROFILE_IMAGE} />
              <AvatarFallback>
                <UserRoundIcon className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        );
      },
    },
    {
      accessorKey: "fullName",
      header: () => <div className="text-center">Name</div>,
      cell: ({ row }) => (
        <div className="text-center truncate">{row.original.fullName}</div>
      ),
    },
    {
      accessorKey: "employeeId",
      header: () => <div className="text-center">Employee ID</div>,
      cell: ({ row }) => (
        <div className="text-center truncate">{row.original.employeeId}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div className="text-center">Employee Email</div>,
      cell: ({ row }) => (
        <div className="text-center truncate">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: () => <div className="text-center">Contact Information</div>,
      cell: ({ row }) => (
        <div className="text-center truncate">{row.original.contactNumber}</div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-center">Position</div>,
      cell: ({ row }) => {
        const user = row.original;
        const isAccepted = user.status === "Accepted";
        const isDeclined = user.status === "Declined";
        const hasRole = user.role && user.role !== "Select Role";

        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-32 justify-between font-medium text-sm px-3 py-2",
                    "border-gray-200 hover:bg-gray-50 hover:border-gray-300",
                    "focus:ring-0 focus:border-transparent focus:bg-gray-50",
                    "transition-colors duration-200",
                    (isAccepted && hasRole) || isDeclined
                      ? "opacity-50 cursor-not-allowed bg-gray-100"
                      : "bg-white"
                  )}
                  disabled={(isAccepted && hasRole) || isDeclined}
                >
                  <span>{user.role || "Select Role"}</span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 ml-2 transition-transform duration-200",
                      ((isAccepted && hasRole) || isDeclined) ? "opacity-50" : "opacity-75"
                    )} 
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-32 p-1 bg-white border border-gray-200 rounded-md shadow-lg"
              >
                {["User", "Janitor", "Admin"].map((roleOption) => (
                  <DropdownMenuItem
                    key={roleOption}
                    onClick={() => handleRoleChange(user._id, roleOption)}
                    disabled={(isAccepted && hasRole) || isDeclined}
                    className={cn(
                      "px-3 py-2 text-sm cursor-pointer rounded-sm",
                      "text-gray-700 hover:bg-Icpetgreen/10 hover:text-Icpetgreen",
                      "focus:bg-Icpetgreen/20 focus:text-Icpetgreen",
                      "transition-colors duration-150",
                      user.role === roleOption && "bg-Icpetgreen/5 text-Icpetgreen",
                      ((isAccepted && hasRole) || isDeclined) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {roleOption}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center">
            <Badge
              variant={
                user.status === "Accepted"
                  ? "success"
                  : user.status === "Declined"
                  ? "destructive"
                  : "secondary"
              }
              className="w-fit"
            >
              {user.status}
            </Badge>
          </div>
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