import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const ReminderCard = ({ date, items }) => {
  return (
    <Card className="bg-white rounded-lg shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900">
          {date}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-Icpetgreen mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">{item.text}</p>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderCard;
