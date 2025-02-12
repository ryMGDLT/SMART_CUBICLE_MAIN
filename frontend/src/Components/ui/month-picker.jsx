import { ChevronLeft, ChevronRight } from "heroicons-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MonthPicker({ selectedMonth, onMonthSelect }) {
  const currentYear = selectedMonth.getFullYear();
  const currentMonth = selectedMonth.getMonth();

  const handleMonthClick = (monthIndex) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(monthIndex);
    onMonthSelect(newDate);
  };

  const handleYearChange = (increment) => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(currentYear + increment);
    onMonthSelect(newDate);
  };

  return (
    <div className="p-3">
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          onClick={() => handleYearChange(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">{currentYear}</div>
        <Button
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          onClick={() => handleYearChange(1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => (
          <Button
            key={month}
            onClick={() => handleMonthClick(index)}
            variant="ghost"
            className={cn(
              "h-9 w-full rounded-md p-0",
              currentMonth === index && "bg-Icpetgreen text-white hover:bg-Icpetgreen/90"
            )}
          >
            {format(new Date(currentYear, index), "MMM")}
          </Button>
        ))}
      </div>
    </div>
  );
} 