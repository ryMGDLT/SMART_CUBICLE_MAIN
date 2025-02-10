import React from "react";
import { REMINDERS_DATA } from "../../data/placeholderData";

function ReminderCard({ date, items }) {
 
  const getStatusColor = (status) => {
    switch (status) {
      case "Excessive Usage":
        return "text-red-500";
      case "Higher than Average":
        return "text-amber-500";
      case "Almost Empty":
        return "text-blue-500";
      case "Low Stock":
        return "text-yellow-500";
      case "Needs Replacement":
        return "text-orange-500";
      case "Empty":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-500 sticky top-0 bg-white py-2">
        {date}
      </h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.resource}</p>
              </div>
              <span
                className={`text-sm font-medium ${getStatusColor(item.status)}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReminderCard;
