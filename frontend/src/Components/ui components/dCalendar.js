import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "../../styles/Calendar.css";

const CalendarComponent = () => {
  const handleDateClick = (arg) => {
    alert(`Date: ${arg.dateStr}`);
  };

  const handleEventDrop = (info) => {
    alert(`Event dropped on: ${info.event.start}`);
  };

  const renderDayCell = (arg) => {
    const today = new Date();
    const cellDate = arg.date;
    if (
      cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear()
    ) {
      if (arg.view.type !== "timeGridDay") {
        arg.el.style.backgroundColor = "lightgray";
      } else {
        arg.el.style.backgroundColor = "";
        arg.el.classList.remove("fc-day-today");
        arg.el.style.border = "";
      }
    }
    if (arg.view.type !== "timeGridDay") {
      arg.el.style.border = "1px solid rgba(226, 226, 226, 0.4)";
    } else {
      arg.el.style.border = "";
    }
  };

  useEffect(() => {
    const buttonGroup = document.querySelector(".fc-button-group");
    if (buttonGroup) {
      const buttons = buttonGroup.querySelectorAll(".fc-button");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          buttons.forEach((btn) => btn.classList.remove("no-border"));
          button.classList.add("no-border");
        });
      });
    }
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        editable={true}
        height="auto"
        width="100%"
        headerToolbar={{
          left: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        datesSet={(dateInfo) => {
          console.log("View changed:", dateInfo.view.type);
        }}
        views={{
          dayGridMonth: {
            buttonText: "Month",
            dayCellDidMount: renderDayCell,
            dayHeaderContent: ({ date }) => {
              const daysOfWeek = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thurs",
                "Fri",
                "Sat",
              ];
              const dayName = daysOfWeek[date.getDay()];
              return `${dayName}`;
            },
          },
          timeGridWeek: {
            buttonText: "Week",
            slotMinTime: "07:00:00",
            slotMaxTime: "20:00:00",
            allDaySlot: true,
            dayCellDidMount: renderDayCell,
            dayHeaderContent: ({ date, view }) => {
              const daysOfWeek = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thurs",
                "Fri",
                "Sat",
              ];
              const dayName = daysOfWeek[date.getDay()];
              const numericDate = date.getDate();
              const today = new Date();
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <div>{dayName}</div>
                  {isToday ? (
                    <div
                      style={{
                        display: "inline-block",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#0044CC",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "24px",
                      }}
                    >
                      {numericDate}
                    </div>
                  ) : (
                    <div>{numericDate}</div>
                  )}
                </div>
              );
            },
            slotLabelFormat: {
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
              hour12: true,
            },
          },
          timeGridDay: {
            buttonText: "Day",
            slotMinTime: "07:00:00",
            slotMaxTime: "20:00:00",
            allDaySlot: true,
            dayCellDidMount: renderDayCell,
            dayHeaderContent: ({ date, view }) => {
              const daysOfWeek = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thurs",
                "Fri",
                "Sat",
              ];
              const dayName = daysOfWeek[date.getDay()];
              const numericDate = date.getDate();
              const today = new Date();
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <div>{dayName}</div>
                  {isToday && view.type !== "timeGridDay" ? (
                    <div
                      style={{
                        display: "inline-block",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#0044CC",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "24px",
                      }}
                    >
                      {numericDate}
                    </div>
                  ) : (
                    <div>{numericDate}</div>
                  )}
                </div>
              );
            },
            slotLabelFormat: {
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
              hour12: true,
            },
          },
          listWeek: {
            buttonText: "List",
            listDayFormat: {
              weekday: "long",
              month: "long",
              day: "numeric",
            },
            listDaySideFormat: false,
          },
        }}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        events={[
          {
            title: "All Day Event",
            start: new Date().toISOString().split("T")[0],
          },
          { title: "Conference", start: "2024-06-10" },
          { title: "Conference", start: "2025-02-03" },
          { title: "Birthday Party", start: "2025-02-07" },
          { title: "Long Event", start: "2025-02-08" },
          { title: "Repeating Event", start: "2025-02-09" },
          { title: "Reporting Event", start: "2025-02-10" },
          {
            title: "Team Meeting",
            start: "2025-02-06T11:30:00",
            end: "2025-02-06T12:00:00",
          },
          { title: "Lunch Break", start: "2025-02-06T14:00:00" },
          { title: "Project Deadline", start: "2025-02-07" },
          {
            title: "Weekly Review",
            start: "2025-02-06T10:00:00",
            end: "2025-02-06T11:00:00",
          },
        ]}
      />
    </div>
  );
};

export default CalendarComponent;
