import React from "react";
import { Card } from "../ui/card";
import CalendarComponent from "./customCalendar";

export const DateCard = ({
  showDateCard,
  setShowDateCard,
  remindersChecked,
  selectedDate,
}) => {
  return (
    <Card
      className="bg-white shadow-lg outline outline-gray-200 mt-1 outline-1 p-4 flex-1 relative mr-1 ml-[-1px] h-full flex flex-col"
      id="date-card"
    >
      <button
        onClick={() => setShowDateCard(false)}
        className="text-gray-500 hover:text-gray-800 absolute top-4 right-4 transition-transform transform hover:rotate-180 mt-1 mr-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 size-5 hover:text-red-600 hover:scale-150"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9.293l-4.646-4.647a1 1 0 00-1.414 1.414L8.586 10l-4.646 4.646a1 1 0 001.414 1.414L10 10.414l4.646 4.646a1 1 0 001.414-1.414L11.414 10l4.646-4.646a1 1 0 00-1.414-1.414L10 9.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="flex flex-col flex-grow mt-10 mb-5 mr-5 ml-5 dboardCalendar">
        <CalendarComponent
          remindersChecked={remindersChecked}
          selectedDate={selectedDate}
        />
      </div>
    </Card>
  );
};