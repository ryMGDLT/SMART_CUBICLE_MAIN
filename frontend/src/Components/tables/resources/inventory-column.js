"use client";

const StatusCell = ({status}) => {
    const getStatusColor = (status) => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('sufficient')) {
            return 'text-green-600';
        } else if (lowerStatus.includes('low') || lowerStatus.includes('stock')) {
            return 'text-amber-600';
        } else if (lowerStatus.includes('out')) {
            return 'text-red-600';
        }
        return 'text-gray-600';
    };

    return (
        <div className="flex items-center justify-center">
            <span className={`px-2 font-medium text-sm ${getStatusColor(status)}`}>
                {status}
            </span>
        </div>
    );
};

export const inventoryColumns = [
  {
    accessorKey: "resources",
    header: () => <div className="text-center">Resources</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.resources}</div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "currentStock",
    header: () => <div className="text-center">Current Stock</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.currentStock}</div>
    ),
    size: 0.1,
  },
  {
    accessorKey: "restockThreshold",
    header: () => <div className="text-center">Restock Threshold</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">
        {row.original.restockThreshold}
      </div>
    ),
    size: 0.1,
  },
  {
    accessorKey: "recommendedRestockingTime",
    header: () => <div className="text-center">Restocking Time</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">
        {row.original.recommendedRestockingTime}
      </div>
    ),
    size: 0.15,
  },
  {
    accessorKey: "recommendedRestock",
    header: () => <div className="text-center">Restock</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">
        {row.original.recommendedRestock}
      </div>
    ),
    size: 0.1,
  },
  {
    accessorKey: "lastRestocked",
    header: () => <div className="text-center">Last Restocked</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">{row.original.lastRestocked}</div>
    ),
    size: 0.1,
  },
  {
    accessorKey: "nextRestockingDate",
    header: () => <div className="text-center">Next Restocking Date</div>,
    cell: ({ row }) => (
      <div className="truncate text-center">
        {row.original.nextRestockingDate}
      </div>
    ),
    size: 0.15,
  },
  {
    id: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
        <div className="flex items-center justify-center px-2">
            <StatusCell status={row.original.status} />
        </div>
    ),
    size: 0.1,
  },
];
