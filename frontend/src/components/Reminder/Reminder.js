import React from "react";
import { handleReminderChange } from "../utils/reminderUtils";

export default function Reminders({ remindersChecked, setRemindersChecked }) {
  const handleReminderChangeWrapper = (key) => {
    handleReminderChange(setRemindersChecked, key);
  };

  return (
    <div className="flex flex-col items-start mt-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Reminders</h2>
      <div className="w-full space-y-3">
        {/* Cleaning Schedule */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
              <input
                id="blue-checkbox"
                type="checkbox"
                checked={remindersChecked.cleaningSchedule}
                onChange={() => handleReminderChangeWrapper("cleaningSchedule")}
                className="w-4 h-4 text-blue-600 bg-white border-white rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"
              />
            </div>
            <span>Cleaning Schedule</span>
          </div>
          <span className="bg-blue-500 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
            2
          </span>
        </div>

        {/* Peak Hours */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
              <input
                id="red-checkbox"
                type="checkbox"
                checked={remindersChecked.peakHours}
                onChange={() => handleReminderChangeWrapper("peakHours")}
                className="w-4 h-4 text-red-600 bg-white border-red-500 rounded-sm focus:ring-red-500 dark:focus:ring-red-500 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"
              />
            </div>
            <span>Peak Hours</span>
          </div>
          <span className="bg-red-500 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
            2
          </span>
        </div>

        {/* Resource Restocking */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
              <input
                id="black-checkbox"
                type="checkbox"
                checked={remindersChecked.resourceRestocking}
                onChange={() =>
                  handleReminderChangeWrapper("resourceRestocking")
                }
                className="w-4 h-4 text-black bg-white border-white rounded-sm focus:ring-black dark:focus:ring-black dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"
              />
            </div>
            <span>Resource Restocking</span>
          </div>
          <span className="bg-black text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
            2
          </span>
        </div>
      </div>
    </div>
  );
}
