"use client";

export const inventoryColumns = [
  {
    accessorKey: "timeStamp",
    header: "Time Stamp",
    cell: ({ row }) => (
      <div className="truncate text-gray-700">{row.getValue("timeStamp")}</div>
    ),
    size: 0.2,
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => {
      const capacity = row.getValue("capacity");
      return (
        <div className="truncate">
          <div className={capacity.color}>
            {capacity.value}
            <div className="text-xs truncate">{capacity.status}</div>
          </div>
        </div>
      );
    },
    size: 0.15,
  },
  {
    accessorKey: "waterLevel",
    header: "Water Level",
    cell: ({ row }) => {
      const waterLevel = row.getValue("waterLevel");
      return (
        <div className="truncate">
          <div className={waterLevel.color}>
            {waterLevel.value}
            <div className="text-xs truncate">{waterLevel.status}</div>
          </div>
        </div>
      );
    },
    size: 0.15,
  },
  {
    accessorKey: "odor",
    header: "Odor",
    cell: ({ row }) => {
      const odor = row.getValue("odor");
      return (
        <div className="truncate">
          <div className={odor.color}>{odor.value}</div>
        </div>
      );
    },
    size: 0.1,
  },
  {
    accessorKey: "temperature",
    header: "Temperature",
    cell: ({ row }) => {
      const temperature = row.getValue("temperature");
      return (
        <div className="truncate">
          <div className={temperature.color}>
            {temperature.value}
            <div className="text-xs truncate">{temperature.status}</div>
          </div>
        </div>
      );
    },
    size: 0.15,
  },
  {
    accessorKey: "actionRequired",
    header: "Action Required", 
    cell: ({ row }) => (
      <div className="truncate text-gray-700">
        {row.getValue("actionRequired")}
      </div>
    ),
    size: 0.25,
  },
];
