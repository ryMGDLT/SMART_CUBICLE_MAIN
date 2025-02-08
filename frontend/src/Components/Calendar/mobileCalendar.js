import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "../../styles/Calendar.css";
import { useEffect, useState } from "react";

const MobileCalendar = ({ remindersChecked, onDateClick }) => {
  const [calendarHeight, setCalendarHeight] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const newHeight = Math.max(viewportHeight * 0.7, 500);
      setCalendarHeight(newHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      arg.el.style.backgroundColor = "lightgray";
    }
  };

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
      title: "Time to Restock",
      assignedName: "Low Detergent",
      start: "2025-02-09T11:30:00",
      end: "2025-02-09T12:00:00",
      classNames: ["black-event-style"],
      visible: remindersChecked.resourceRestocking,
    },
    {
      id: "5",
      title: "Cleaning Schedule",
      assignedName: "Jane Smith",
      start: "2025-02-04T14:00:00",
      end: "2025-02-04T14:30:00",
      classNames: ["blue-event-style"],
      visible: remindersChecked.cleaningSchedule,
    },
    {
      id: "6",
      title: "Cleaning Schedule",
      assignedName: "Alice Johnson",
      start: "2025-02-011T10:00:00",
      classNames: ["blue-event-style"],
      visible: remindersChecked.cleaningSchedule,
    },
    {
      id: "7",
      title: "Alert",
      assignedName: "Peak Hour",
      start: "2025-02-12T10:00:00",
      end: "2025-02-12T10:30:00",
      classNames: ["red-event-style"],
      visible: remindersChecked.peakHours,
    },
    {
      id: "8",
      title: "Alert!",
      assignedName: "Peak Hour",
      start: "2025-02-04T08:00:00",
      end: "2025-02-04T09:30:00",
      classNames: ["red-event-style"],
      visible: remindersChecked.peakHours,
    },
    {
      id: "9",
      title: "Time to Restock",
      assignedName: "Low Bleach",
      start: "2025-02-07T13:30:00",
      end: "2025-02-07T14:00:00",
      classNames: ["black-event-style"],
      visible: remindersChecked.resourceRestocking,
    },
  ].filter((event) => event.visible);

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="listWeek"
        contentHeight={calendarHeight}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next",
        }}
        views={{
          dayGridMonth: {
            buttonText: "Month",
            dayCellDidMount: renderDayCell,
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
        dateClick={onDateClick}
        eventDrop={handleEventDrop}
        events={filteredEvents}
        eventContent={(arg) => {
          const { title, extendedProps, start, end } = arg.event;
          const assignedName = extendedProps.assignedName || "Unassigned";
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
          const timeRange = end ? `${startTime} - ${endTime}` : startTime;
          return (
            <div>
              <strong className="event-title">{title}</strong>
              <div className="event-assigned-name">{assignedName}</div>
              <div className="event-time">{timeRange}</div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default MobileCalendar;