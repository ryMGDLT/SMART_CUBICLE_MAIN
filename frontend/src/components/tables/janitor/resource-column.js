"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";
import { UserRoundIcon } from "lucide-react";

const NoteCell = ({ note }) => {
  const getTextColorClass = (note) => {
    const lowerNote = note.toLowerCase();
    if (lowerNote.includes('normal')) {
      return 'text-green-600';
    } else if (lowerNote.includes('higher') || ('higher')) {
      return 'text-amber-600';
    } else if (lowerNote.includes('excessive')) {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="flex items-center justify-center">
      <span className={`px-2 font-medium text-sm ${getTextColorClass(note)}`}>
        {note}
      </span>
    </div>
  );
};

export const resourceUsageColumns = [
  {
    accessorKey: "resourceUsage.image",
    header: () => <div className="text-center">Profile Pic</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center px-2">
          <Avatar>
          <AvatarImage src={row.original.resourceUsage.image || DEFAULT_PROFILE_IMAGE} alt={row.original.resourceUsage.name} />
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
    accessorKey: "resourceUsage.name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="truncate px-2">
        <p className="text-sm font-medium truncate text-center">
          {row.original.resourceUsage.name}
        </p>
      </div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "resourceUsage.resource",
    header: () => <div className="text-center">Resource</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.resourceUsage.resource}</div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "resourceUsage.amountUsed",
    header: () => <div className="text-center">Amount Used</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.resourceUsage.amountUsed}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "resourceUsage.remaining",
    header: () => <div className="text-center">Remaining</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.resourceUsage.remaining}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "resourceUsage.note",
    header: () => <div className="text-center">Note</div>,
    cell: ({ row }) => (
      <NoteCell note={row.original.resourceUsage.note} />
    ),
    size: 0.25,
  },
];
