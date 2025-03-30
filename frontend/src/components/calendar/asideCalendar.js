import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CustomCalendar({ handleDateClick, today }) {
  return (
    <div className="w-full custom-calendar mt-2 mb-2">
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
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
              className={`flex justify-center items-center w-full h-full text-center ${
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
          dayHeaderContent={(arg) => (
            <span className="day-header">
              {arg.text.slice(0, 3)} {/* 3 letters of day */}
            </span>
          )}
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
    </div>
  );
}