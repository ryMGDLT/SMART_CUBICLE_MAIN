import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CustomCalendar({ handleDateClick, today }) {
  return (
    <div className="w-full min-w-[300px] max-w-full custom-calendar mt-2 mb-2">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        width="100%"
        contentHeight="auto"
        fixedWeekCount={false}
        headerToolbar={{
          start: "title",
          center: "",
          end: "prev,next",
        }}
        buttonIcons={{
          prev: "chevron-left",
          next: "chevron-right",
        }}
        buttonText={{
          prev: "",
          next: "",
        }}
        dayCellContent={(arg) => (
          <div
            className={`flex justify-center items-center w-full h-full text-xs md:text-sm lg:text-base text-center ${
              arg.dayNumberText.trim() === today.toString()
                ? "cursor-pointer text-black"
                : ""
            }`}
            onClick={() => {
              if (arg.dayNumberText.trim() === today.toString()) {
                handleDateClick();
              }
            }}
          >
            {arg.dayNumberText.trim()}
          </div>
        )}
        aspectRatio={1.5}
        titleFormat={{
          year: "numeric",
          month: "long",
        }}
        titleRangeSeparator=""
        viewDidMount={(view) => {
          const titleEl = document.querySelector(".fc-toolbar-title");
          if (titleEl) {
            titleEl.style.fontWeight = "bold";
            titleEl.style.fontSize = "1.2rem";
          }
        }}
        eventDidMount={(info) => {}}
      />
    </div>
  );
}