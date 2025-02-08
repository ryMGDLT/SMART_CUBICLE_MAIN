import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "../../styles/Calendar.css";



const CalendarComponent = ({ remindersChecked }) => {
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

  // Filter events based on reminder check state
  const filteredEvents = [
    {
      id: "1",
      title: "Time to Restock",
      assignedName: "Low Detergent",
      start: "2025-02-06T11:30:00",
      end: "2025-02-06T12:00:00",
      classNames: ["black-event-style"],
      visible: remindersChecked.resourceRestocking,
    },
    {
      id: "2",
      title: "Cleaning Schedule",
      assignedName: "Jane Smith",
      start: "2025-02-06T14:00:00",
      end: "2025-02-06T14:30:00",
      classNames: ["blue-event-style"],
      visible: remindersChecked.cleaningSchedule,
    },
    {
      id: "3",
      title: "Cleaning Schedule",
      assignedName: "Alice Johnson",
      start: "2025-02-07T10:00:00",
      classNames: ["blue-event-style"],
      visible: remindersChecked.cleaningSchedule,
    },
    {
      id: "4",
      title: "Alert",
      assignedName: "Peak Hour",
      start: "2025-02-06T10:00:00",
      end: "2025-02-06T10:30:00",
      classNames: ["red-event-style"],
      visible: remindersChecked.peakHours,
    },
    {
      id: "5",
      title: "Alert!",
      assignedName: "Peak Hour",
      start: "2025-02-04T08:00:00",
      end: "2025-02-04T09:30:00",
      classNames: ["red-event-style"],
      visible: remindersChecked.peakHours,
    },
    {
      id: "6",
      title: "Time to Restock",
      assignedName: "Low Bleach",
      start: "2025-02-06T13:30:00",
      end: "2025-02-06T14:00:00",
      classNames: ["black-event-style"],
      visible: remindersChecked.resourceRestocking,
    },
  ].filter((event) => event.visible);

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
        slotDuration="00:15:00"
        slotLabelInterval="00:30:00"
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={true}
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
            slotDuration: "00:15:00",
            slotLabelInterval: "01:00:00",
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
            slotDuration: "00:15:00",
            slotLabelInterval: "01:00:00",
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
              const numericDate = date.getDate()

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
        events={filteredEvents} 
        eventContent={(arg) => {
          const { title, extendedProps, start, end } = arg.event;
          const assignedName = extendedProps.assignedName || "Unassigned";

          // Format start and end times
          const startTime = start
            ? start.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
            : "No Start Time";

          const endTime = end
            ? end.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
            : "No End Time";

          if (arg.view.type === "listWeek") {
            const timeRange = end
              ? `${startTime} - ${endTime}`
              : startTime;
            return (
              <div className="list-event-container">
                <div className="list-event-time">{timeRange}</div>
                <div className="list-event-details">
                  <div className="list-event-title">{title}</div>
                  <div className="list-event-assigned">{assignedName}</div>
                </div>
              </div>
            );
          }

          const timeRange = end
            ? `${startTime} - ${endTime}`
            : startTime;

          return (
            <div className="custom-event">
              <div className="event-title">{title}</div>
              <div className="event-assigned-name">{assignedName}</div>
              <div className="event-time">{timeRange}</div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarComponent;