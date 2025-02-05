import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "../../styles/Calendar.css";

const CalendarComponent = () => {
  const [currentView, setCurrentView] = useState(() => {
    try {
      const savedView = localStorage.getItem("fullCalendarView");
      return savedView || "dayGridMonth";
    } catch (error) {
      console.error("Failed to retrieve view from localStorage:", error);
      return "dayGridMonth";
    }
  });

  const [scheduledEvents, setScheduledEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem("scheduledEvents");
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents);
        console.log("Loaded events from localStorage:", parsedEvents);
        return parsedEvents;
      }
    } catch (error) {
      console.error("Failed to retrieve events from localStorage:", error);
    }
    return [
      { id: "1", title: "All Day Event", start: "2025-02-03", allDay: true },
      { id: "2", title: "Conference", start: "2025-02-03", allDay: true },
      { id: "3", title: "Birthday Party", start: "2025-02-07", allDay: true },
      { id: "4", title: "Long Event", start: "2025-02-08", allDay: true },
      { id: "5", title: "Project Deadline", start: "2025-02-10", allDay: true },
      { id: "6", title: "Weekly Review", start: "2025-02-12T10:00:00", end: "2025-02-12T11:00:00" },
      { id: "7", title: "Cleaning Schedule JANE DOE", start: "2025-02-03T08:00:00", end: "2025-02-03T09:00:00", isRed: true },
    ];
  });

  const calendarRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const lastSavedViewRef = useRef(currentView);

  const getListViewEvents = () => {
    const startDate = new Date("2025-02-02");
    const endDate = new Date("2025-02-08");
    const allDays = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      allDays.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const eventDates = scheduledEvents.map((event) => event.start?.split("T")[0]);
    const listViewEvents = [...scheduledEvents];
    allDays.forEach((date) => {
      if (!eventDates.includes(date)) {
        listViewEvents.push({
          title: "No Events",
          start: date,
          allDay: true,
          display: "block",
          backgroundColor: "#f8f9fa",
          textColor: "#6c757d",
          borderColor: "#dee2e6",
        });
      }
    });
    return listViewEvents;
  };

  const handleDateClick = (arg) => {
    alert(`Date: ${arg.dateStr}`);
    resetInactivityTimer();
  };

  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start.toISOString(),
      end: event.end ? event.end.toISOString() : null,
      allDay: event.allDay,
      isRed: event.extendedProps.isRed,
    };
    const updatedEvents = scheduledEvents.map((evt) =>
      evt.id === updatedEvent.id ? updatedEvent : evt
    );
    setScheduledEvents(updatedEvents);
    try {
      localStorage.setItem("scheduledEvents", JSON.stringify(updatedEvents));
      console.log("Updated events saved to localStorage:", updatedEvents);
    } catch (error) {
      console.error("Failed to save updated events to localStorage:", error);
    }
    alert(`Event "${event.title}" moved to: ${event.start}`);
    resetInactivityTimer();
  };

  const handleEventResize = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start.toISOString(),
      end: event.end ? event.end.toISOString() : null,
      allDay: event.allDay,
      isRed: event.extendedProps.isRed,
    };
    const updatedEvents = scheduledEvents.map((evt) =>
      evt.id === updatedEvent.id ? updatedEvent : evt
    );
    setScheduledEvents(updatedEvents);
    try {
      localStorage.setItem("scheduledEvents", JSON.stringify(updatedEvents));
      console.log("Updated events saved to localStorage:", updatedEvents);
    } catch (error) {
      console.error("Failed to save updated events to localStorage:", error);
    }
    alert(`Event "${event.title}" resized. New end time: ${event.end}`);
    resetInactivityTimer();
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      try {
        localStorage.removeItem("fullCalendarView");
        console.log("Cleared fullCalendarView from localStorage");
      } catch (error) {
        console.error("Failed to clear fullCalendarView from localStorage:", error);
      }
      setCurrentView("dayGridMonth");
      if (calendarRef.current) {
        calendarRef.current.getApi().changeView("dayGridMonth");
      }
    }, 60000);
  };

  useEffect(() => {
    const savedView = localStorage.getItem("fullCalendarView");
    if (savedView) {
      const validViews = ["dayGridMonth", "timeGridWeek", "timeGridDay", "listWeek"];
      if (validViews.includes(savedView)) {
        setCurrentView(savedView);
        const interval = setInterval(() => {
          if (calendarRef.current) {
            clearInterval(interval);
            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView(savedView);
          }
        }, 100);
      }
    }
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  const renderEventContent = (eventInfo) => {
    return (
      <div className={`fc-event-main fc-sticky ${eventInfo.event.extendedProps.isRed ? 'red-event' : ''}`}>
        <div className="event-content">
          <div className="event-title">
            {eventInfo.timeText}
            <br />
            <span className="event-name">{eventInfo.event.title}</span>
          </div>
          <div className="event-time">
            {eventInfo.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-auto mb-10 flex flex-col">
      <div className="flex-grow dcalendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
          initialView={currentView}
          editable={true}
          headerToolbar={{
            left: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          datesSet={(dateInfo) => {
            const newView = dateInfo.view.type;
            if (newView !== lastSavedViewRef.current) {
              setCurrentView(newView);
              lastSavedViewRef.current = newView;
              try {
                localStorage.setItem("fullCalendarView", newView);
              } catch (error) {
                console.error("Failed to save fullCalendarView to localStorage:", error);
              }
              resetInactivityTimer();
            }
          }}
          views={{
            dayGridMonth: { buttonText: "Month" },
            timeGridWeek: {
              buttonText: "Week",
              slotMinTime: "06:00:00",
              slotMaxTime: "22:00:00",
              titleFormat: { weekday: "long", month: "long", day: "numeric" },
              allDaySlot: false,
            },
            timeGridDay: {
              buttonText: "Day",
              slotMinTime: "06:00:00",
              slotMaxTime: "22:00:00",
              titleFormat: { weekday: "long", month: "long", day: "numeric" },
              allDaySlot: false,
            },
            listWeek: {
              buttonText: "List",
              displayEventEnd: true,
              noEventsContent: "No events to display",
              showNonCurrentDates: true,
              listDayFormat: { weekday: "long", month: "short", day: "numeric" },
              listDaySideFormat: { weekday: "long", month: "short", day: "numeric" },
              allDaySlot: false,
            },
          }}
          dayHeaderContent={(args) => {
            const calendarApi = args.view.calendar;
            const currentView = calendarApi.view.type;
            if (currentView === "timeGridWeek" || currentView === "timeGridDay") {
              const date = new Date(args.date);
              const day = date.getDate();
              const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div className="day-header">
                  <span className="weekday">{weekday}</span>
                  <span
                    className={`date-circle ${isToday ? "today" : ""}`}
                  >
                    {day}
                  </span>
                </div>
              );
            }
            return args.text;
          }}
          eventSources={[
            {
              events: (fetchInfo, successCallback) => {
                const viewType = fetchInfo.view?.type;
                const listViewEvents = getListViewEvents();
                successCallback(viewType === "listWeek" ? listViewEvents : scheduledEvents);
              },
            },
          ]}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;