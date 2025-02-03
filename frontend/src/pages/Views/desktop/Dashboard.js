import React, { useState, useEffect, useRef } from "react";
import { Card } from "../../Components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import "../../styles/Calendar.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [selectedPeriod, setPeriod] = useState("Daily");
  const [chartType, setChartType] = useState("bar");
  const [trendsChartType, setTrendsChartType] = useState("line");
  const [showChartDropdown, setShowChartDropdown] = useState(false);
  const [showTrendsDropdown, setShowTrendsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const trendsDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowChartDropdown(false);
      }
      if (
        trendsDropdownRef.current &&
        !trendsDropdownRef.current.contains(event.target)
      ) {
        setShowTrendsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Resources Usage Chart
  const resourcesChartData = {
    labels: ["Water", "Bleach (Toilet)", "Bleach (Walls & Floor)", "Detergent"],
    datasets: [
      {
        label: "Actual Usage",
        data: [5.5, 6.5, 7.5, 7.5],
        backgroundColor:
          chartType === "line"
            ? "rgba(59, 130, 246, 0.1)"
            : "rgb(59, 130, 246)",
        borderColor: "rgb(59, 130, 246)",
        barPercentage: 0.6,
        fill: true,
      },
      {
        label: "Recommended",
        data: [4, 8, 2, 2],
        backgroundColor:
          chartType === "line"
            ? "rgba(74, 222, 128, 0.1)"
            : "rgb(74, 222, 128)",
        borderColor: "rgb(74, 222, 128)",
        barPercentage: 0.6,
        fill: true,
      },
    ],
  };

  // Trends Over Time Chart
  const trendsChartData = {
    labels: ["1st Week", "2nd Week", "3rd Week", "4th Week", "5th Week"],
    datasets: [
      {
        label: "Cleaning Pattern",
        data: [2, 3, 5, 6, 8],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor:
          trendsChartType === "line"
            ? "rgba(59, 130, 246, 0.1)"
            : "rgb(59, 130, 246)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Resources Consumed",
        data: [3, 4, 5.5, 6, 7],
        borderColor: "rgb(74, 222, 128)",
        backgroundColor:
          trendsChartType === "line"
            ? "rgba(74, 222, 128, 0.1)"
            : "rgb(74, 222, 128)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const usageData = {
    labels: [
      "7:00 AM",
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 NN",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
    ],
    datasets: [
      {
        label: "Usage",
        data: [65, 15, 25, 20, 35, 18, 60, 22, 45, 50, 85, 40],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: function (context) {
          const index = context.dataIndex;
          const chart = context.chart;
          const peakDataset = chart.getDatasetMeta(1);
          if (!peakDataset.hidden && index === 10) {
            return "rgba(255, 99, 132, 1)";
          } else if (peakDataset.hidden && index === 10) {
            return "rgba(54, 162, 235, 1)";
          }
          return "rgba(54, 162, 235, 1)";
        },
        pointRadius: function (context) {
          const index = context.dataIndex;
          const chart = context.chart;
          const peakDataset = chart.getDatasetMeta(1);
          if (!peakDataset.hidden && index === 10) {
            return 6;
          } else if (peakDataset.hidden && index === 10) {
            return 4;
          }
          return 4;
        },
        tension: 0.4,
      },
      {
        label: "Peak Usage Point",
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          85,
          null,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 6,
        borderWidth: 1,
        hidden: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          const datasetMeta = ci.getDatasetMeta(index);
          datasetMeta.hidden = !datasetMeta.hidden;
          ci.update();
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const chart = tooltipItem.chart;
            const peakDataset = chart.getDatasetMeta(1);
            const isPeakShown = !peakDataset.hidden;
            const dataIndex = tooltipItem.dataIndex;

            if (
              isPeakShown &&
              dataIndex === 10 &&
              tooltipItem.dataset.label === "Usage"
            ) {
              return `Peak: ${tooltipItem.raw} Users`;
            }
            if (tooltipItem.dataset.label === "Peak Usage Point") {
              return null;
            }
            return `Usage: ${tooltipItem.raw} Users`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: true,
        },
        offset: true,
      },
    },
  };

  const resourcesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return value + "L";
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const trendsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value + " Hrs",
        },
      },
      x: {
        grid: {
          display: true,
        },
        offset: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([
    "Usage Peak Hour",
    "Total Cleaning Time",
    "Recommended Cleaning Time",
    "Total Resources Restocked",
    "Recommended Resources",
  ]);

  return (
    <div className="flex gap-3 p-2 mt-[-15px]">
      {/* Sidebar/Calendar Container */}
      <div className="transition-all duration-300 w-1/4 ml-[-10px] flex flex-col flex-grow">
        <Card className="bg-white shadow-lg p-2 flex flex-col items-start h-[calc(100vh-60px)] w-full">
          <div className="w-full min-w-[300px]">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="auto"
              width="auto"
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
                <div className="flex justify-center items-center w-full h-full text-xs md:text-sm lg:text-base">
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
            />
          </div>
          <hr className="w-full border-t border-gray-200 my-4 mt-5" />
          {/* Reminders */}
          <div className="flex-grow w-full">
            <div className="flex flex-col items-start mt-3">
              <h2 className="text-xl font-bold mb-4">Reminders</h2>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Cleaning Schedule</span>
                  </div>
                  <span className="bg-blue-500 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
                    5
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Peak Hours</span>
                  </div>
                  <span className="bg-red-500 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
                    2
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Resource Restocking</span>
                  </div>
                  <span className="bg-purple-500 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
                    1
                  </span>
                </div>
              </div>
            </div>

            <hr className="w-full border-t border-gray-200 my-4 mt-9" />
            {/* Janitor Schedule */}
            {/*
            <div className="flex flex-col items-start mt-6">
              <h2 className="text-xl font-bold mb-4">
                Janitor Schedule (Today)
              </h2>
              <div className="w-full mb-50">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-4">Name</th>
                      <th className="pb-4">Scheduled</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Location</th>
                      <th className="pb-4">Tasks</th>
                      <th className="pb-4">Notes</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { 
                        time: "8:00 AM",
                        status: "Done",
                        color: "green",
                        location: "1st Floor",
                        tasks: ["Mopping", "Dusting", "Trash"],
                        notes: "All tasks completed on time"
                      },
                      {
                        time: "11:00 AM", 
                        status: "Overdue",
                        color: "red",
                        location: "2nd Floor",
                        tasks: ["Restroom Cleaning", "Restocking"],
                        notes: "Delayed due to emergency cleanup"
                      },
                      {
                        time: "3:00 PM",
                        status: "Pending",
                        color: "yellow", 
                        location: "3rd Floor",
                        tasks: ["Deep Cleaning", "Window Washing"],
                        notes: "Scheduled maintenance"
                      },
                      {
                        time: "7:00 PM",
                        status: "Pending",
                        color: "yellow",
                        location: "All Floors",
                        tasks: ["Final Inspection", "Closing Tasks"],
                        notes: "End of day routine"
                      }
                    ].map((shift, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200">
                              <img
                                src="/images/bongbong.jpg"
                                alt="Jane Doe"
                                className="w-8 h-8 rounded-full"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">Jane Doe</span>
                              <span className="text-sm text-gray-500">ID: JD001</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex flex-col">
                            <span>{shift.time}</span>
                            <span className="text-sm text-gray-500">4 hour shift</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-${shift.color}-500 bg-${shift.color}-100`}>
                            {shift.status}
                          </span>
                        </td>
                        <td className="py-3">{shift.location}</td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {shift.tasks.map((task, index) => (
                              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {task}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{shift.notes}</td>
                        <td className="py-3">
                          <div className="flex gap-2 justify-end">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing 4 of 4 shifts
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
                  </div>
                </div>
              </div>
            </div>
            */}
            <div className="flex flex-col items-start mt-6">
              <h2 className="text-xl font-bold mb-4">
                Janitor Schedule (Today)
              </h2>
              <div className="w-full mb-50">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-4">Name</th>
                      <th className="pb-4">Scheduled</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: "8:00 AM", status: "Done", color: "green" },
                      { time: "11:00 AM", status: "Overdue", color: "red" },
                      { time: "3:00 PM", status: "Pending", color: "yellow" },
                      { time: "7:00 PM", status: "Pending", color: "yellow" },
                    ].map((shift, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200">
                              <img
                                src="/images/bongbong.jpg"
                                alt="Jane Doe"
                                className="w-8 h-8 rounded-full"
                              />
                            </div>
                            <span>Jane Doe</span>
                          </div>
                        </td>
                        <td className="py-3">{shift.time}</td>
                        <td className="py-3">
                          <span
                            className={
                              shift.status === "Done"
                                ? "text-green-500"
                                : shift.status === "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }
                          >
                            {shift.status}
                          </span>
                        </td>

                        <td className="py-3 text-right">⋮</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="w-full mr-[-10px]">
        {/* Summarized Report */}
        <Card className="bg-white shadow-lg p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Summarized Report</h2>
              <div className="flex gap-2 items-center relative">
                {["Daily", "Weekly", "Monthly"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setPeriod(period)}
                    className={`px-4 py-1 text-sm rounded-md transition-colors ${
                      selectedPeriod === period
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
                <div className="ml-2 relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" />
                    </svg>
                  </button>
                  {showDropdown && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                      ref={(node) => {
                        if (node) {
                          const handleClickOutside = (e) => {
                            if (!node.contains(e.target)) {
                              setShowDropdown(false);
                            }
                          };
                          document.addEventListener(
                            "mousedown",
                            handleClickOutside
                          );
                          return () => {
                            document.removeEventListener(
                              "mousedown",
                              handleClickOutside
                            );
                          };
                        }
                      }}
                    >
                      {[
                        "Usage Peak Hour",
                        "Total Cleaning Time",
                        "Recommended Cleaning Time",
                        "Total Resources Restocked",
                        "Recommended Resources",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                          onClick={() => {
                            const isChecked = selectedMetrics.includes(item);
                            if (isChecked) {
                              setSelectedMetrics(
                                selectedMetrics.filter(
                                  (metric) => metric !== item
                                )
                              );
                            } else {
                              setSelectedMetrics([...selectedMetrics, item]);
                            }
                          }}
                        >
                          <div className="relative w-4 h-4">
                            <input
                              type="checkbox"
                              checked={selectedMetrics.includes(item)}
                              onChange={() => {}}
                              className="absolute opacity-0 w-4 h-4 cursor-pointer"
                            />
                            <div
                              className={`w-4 h-4 border rounded ${
                                selectedMetrics.includes(item)
                                  ? "border-teal-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedMetrics.includes(item) && (
                                <svg
                                  className="w-3 h-3 text-teal-600 absolute top-0.5 left-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {[
                {
                  id: "Usage Peak Hour",
                  title: "Usage Peak Hours",
                  values: { Daily: "12:00", Weekly: "2:00", Monthly: "3:00" },
                  unit: "PM",
                },
                {
                  id: "Total Cleaning Time",
                  title: "Total Cleaning Time",
                  values: { Daily: "4.5", Weekly: "32", Monthly: "128" },
                  unit: "Hours",
                },
                {
                  id: "Recommended Cleaning Time",
                  title: (
                    <>
                      <span className="text-red-600">Recommended</span>{" "}
                      <span className="text-black">Cleaning</span>
                    </>
                  ),
                  values: { Daily: "3:00", Weekly: "4:00", Monthly: "2:00" },
                  unit: "PM",
                },
                {
                  id: "Total Resources Restocked",
                  title: "Resources Restocked",
                  values: { Daily: "30", Weekly: "210", Monthly: "900" },
                  unit: "L",
                },
                {
                  id: "Recommended Resources",
                  title: (
                    <>
                      <span className="text-red-600">Recommended</span>{" "}
                      <span className="text-black">Restock</span>
                    </>
                  ),
                  values: { Daily: "5:00", Weekly: "3:00", Monthly: "1:00" },
                  unit: "PM",
                },
              ]
                .filter((card) => selectedMetrics.includes(card.id))
                .map((card, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <span className="text-m font-bold">{card.title}</span>
                    <div className="flex items-baseline mt-1">
                      <span className="text-xl font-semibold">
                        {card.values[selectedPeriod]}
                      </span>
                      <span className="text-gray-500 ml-1">{card.unit}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Card>

        {/* Resources Usage Chart */}
        <div className="flex flex-row gap-3 w-full mt-6">
          <Card className="bg-white shadow-lg p-2 flex flex-col items-start h-[calc(100vh-480px)] w-1/2">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Resources Usage</h2>
              <div className="relative" ref={dropdownRef}>
                <button
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowChartDropdown(!showChartDropdown)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
                {showChartDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setChartType("line");
                          setShowChartDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Line Chart
                      </button>
                      <button
                        onClick={() => {
                          setChartType("bar");
                          setShowChartDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Bar Chart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-[calc(100%-2rem)]">
              {/* Chart container with full width */}
              <div className="w-full h-full">
                {chartType === "bar" ? (
                  <Bar
                    data={resourcesChartData}
                    options={resourcesChartOptions}
                  />
                ) : (
                  <Line
                    data={resourcesChartData}
                    options={resourcesChartOptions}
                  />
                )}
              </div>
            </div>
          </Card>
          {/* Trends Over Time Chart */}
          <Card className="bg-white shadow-lg p-4 flex flex-col h-[calc(100vh-480px)] w-1/2">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Trends Over Time</h2>
              <div className="relative" ref={trendsDropdownRef}>
                <button
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowTrendsDropdown(!showTrendsDropdown)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
                {showTrendsDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setTrendsChartType("line");
                          setShowTrendsDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Line Chart
                      </button>
                      <button
                        onClick={() => {
                          setTrendsChartType("bar");
                          setShowTrendsDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Bar Chart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-[calc(100%-2rem)]">
              {trendsChartType === "bar" ? (
                <Bar data={trendsChartData} options={trendsChartOptions} />
              ) : (
                <Line
                  data={trendsChartData}
                  options={{
                    ...trendsChartOptions,
                    scales: {
                      ...trendsChartOptions.scales,
                      y: {
                        ...trendsChartOptions.scales.y,
                        beginAtZero: false,
                      },
                    },
                  }}
                />
              )}
            </div>
          </Card>
        </div>
        {/* Usage Monitoring Chart */}
        <Card className="bg-white shadow-lg p-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Usage Monitoring</h2>
          </div>
          <div className="w-full h-64">
            <Line data={usageData} options={chartOptions} />
          </div>
        </Card>
      </div>
    </div>
  );
}
