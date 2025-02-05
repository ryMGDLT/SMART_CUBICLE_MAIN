import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "../../../Components/ui components/card";
import CalendarComponent from "../../../Components/ui components/dCalendar";
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
import "../../../styles/Calendar.css";

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
  const [chartType, setChartType] = useState("bar");
  const [trendsChartType, setTrendsChartType] = useState("line");
  const [showChartDropdown, setShowChartDropdown] = useState(false);
  const [showTrendsDropdown, setShowTrendsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const trendsDropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDateCard, setShowDateCard] = useState(() => {
    return localStorage.getItem("showDateCard") === "true"; 
  });
  const [showOtherCards, setShowOtherCards] = useState(!showDateCard); 
  const today = new Date().getDate();
  const allMetrics = [
    "Usage Peak Hour",
    "Total Cleaning Time",
    "Recommended Cleaning Time",
    "Total Resources Restocked",
    "Recommended Resources",
  ];

  const [selectedPeriod, setPeriod] = useState(() => {
    return localStorage.getItem("selectedPeriod") || "Daily";
  });

  const [selectedMetrics, setSelectedMetrics] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedMetrics")) || allMetrics;
  });

  const toggleMetric = (item) => {
    setSelectedMetrics((prevMetrics) =>
      prevMetrics.includes(item)
        ? prevMetrics.filter((metric) => metric !== item)
        : [...prevMetrics, item]
    );
  };

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
        min: 1,
        max: 10,
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return value + "L";
          },
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
      const dateCardElement = document.getElementById("date-card");
      if (
        showDateCard &&
        dateCardElement &&
        !dateCardElement.contains(event.target)
      ) {
        setShowDateCard(false);
        setShowOtherCards(true); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

  
    localStorage.setItem("selectedMetrics", JSON.stringify(selectedMetrics));
    localStorage.setItem("showDateCard", showDateCard); 

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDateCard, selectedPeriod, selectedMetrics]);

  const handleDateClick = () => {
    setShowDateCard(true);
    setShowOtherCards(false);
  };

  return (
    <div className="flex flex-col md:flex-row mt-[-15px] ml-[-15px] mr-[-10px] mx-auto">
      <aside className="w-full md:w-1/4 min-h-screen p-4 flex flex-col">
        <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex flex-col mt-[-12px]">
          {/* Calendar */}
          <div className="flex justify-center items-center">
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
          </div>
          <hr className="w-full border-t border-gray-200 my-4 mt-5" />

          {/* Reminders Section */}
          <div className="w-full">
            <div className="flex flex-col items-start mt-4 mb-4">
              <h2 className="text-xl font-bold mb-4">Reminders</h2>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <input
                        id="blue-checkbox"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-white border-white rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white focus:ring-2 dark:bg-gray-white dark:border-white"
                      />
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
                      <input
                        id="red-checkbox"
                        type="checkbox"
                        className="w-4 h-4 text-red-600 bg-white border-red-500 rounded-sm focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"
                      />
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
                      <input
                        id="red-checkbox"
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 bg-white border-white rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"
                      />
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
          </div>
          {/* Janitor Schedule */}
          <div className="flex-grow">
            <div className="flex flex-col items-start mt-6 mb-5">
              <h2 className="text-xl font-bold mb-4">
                Janitor Schedule (Today)
              </h2>
              <div className="w-full mt-2">
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
      </aside>

      {/* Summarized Report */}
      {showOtherCards && (
        <div className="flex-1 p-1 ml-[-5px]">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 className="text-xl font-bold">Summarized Report</h2>
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex gap-2">
                      <div className="flex space-x-0">
                        {["Daily", "Weekly", "Monthly"].map((period, index) => (
                          <button
                            key={period}
                            onClick={() => setPeriod(period)}
                            className={`px-3 py-1 text-sm transition-colors ${
                              selectedPeriod === period
                                ? "bg-teal-600 text-white hover:bg-teal-800"
                                : "border border-gray-300 hover:bg-gray-300"
                            } ${
                              index === 0
                                ? "rounded-l-md"
                                : index === 2
                                ? "rounded-r-md"
                                : ""
                            }`}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
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
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                          {allMetrics.map((item, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                              onClick={() => toggleMetric(item)}
                            >
                              <input
                                type="checkbox"
                                checked={selectedMetrics.includes(item)}
                                readOnly
                                className="w-4 h-4"
                              />
                              <span className="text-sm text-gray-700">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`flex ${
                    selectedMetrics.length < 5
                      ? "justify-center"
                      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                  } gap-4`}
                >
                  {[
                    {
                      id: "Usage Peak Hour",
                      title: "Usage Peak Hours",
                      values: {
                        Daily: "12:00",
                        Weekly: "2:00",
                        Monthly: "3:00",
                      },
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
                      values: {
                        Daily: "3:00",
                        Weekly: "4:00",
                        Monthly: "2:00",
                      },
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
                      values: {
                        Daily: "5:00",
                        Weekly: "3:00",
                        Monthly: "1:00",
                      },
                      unit: "PM",
                    },
                  ]
                    .filter((card) => selectedMetrics.includes(card.id))
                    .map((card, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col"
                      >
                        <div className="text-sm font-bold">{card.title}</div>
                        <div className="flex items-baseline mt-1">
                          <span className="text-xl font-semibold">
                            {card.values[selectedPeriod]}
                          </span>
                          <span className="text-gray-500 ml-1">
                            {card.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Card>
            {/* Resources Usage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex-1 h-auto md:h-[400px]">
                <div className="flex flex-col space-y-4 h-full">
                  <div className="flex justify-between items-center mb-4">
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
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
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
                  <div className="w-full h-full flex-grow overflow-hidden">
                    {chartType === "bar" ? (
                      <Bar
                        data={resourcesChartData}
                        options={{
                          ...resourcesChartOptions,
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    ) : (
                      <Line
                        data={resourcesChartData}
                        options={{
                          ...resourcesChartOptions,
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    )}
                  </div>
                </div>
              </Card>
              {/* Trends Over Time */}
              <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex-1 h-auto md:h-[400px]">
                <div className="flex flex-col space-y-4 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Trends Over Time</h2>
                    <div className="relative" ref={trendsDropdownRef}>
                      <button
                        className="p-1 hover:bg-gray-100 rounded-full"
                        onClick={() =>
                          setShowTrendsDropdown(!showTrendsDropdown)
                        }
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
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
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
                  <div className="w-full h-full flex-grow overflow-hidden">
                    {trendsChartType === "bar" ? (
                      <Bar
                        data={trendsChartData}
                        options={{
                          ...trendsChartOptions,
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    ) : (
                      <Line
                        data={trendsChartData}
                        options={{
                          ...trendsChartOptions,
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </div>
            {/* Usage Monitoring */}
            <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex-1 h-auto md:h-[400px]">
              <div className="flex flex-col mb-4 h-full">
                <h2 className="text-xl font-bold mb-5">Usage Monitoring</h2>
                <div className="flex-grow">
                  <Line
                    data={usageData}
                    options={{
                      ...chartOptions,
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      {/* Date Card*/}
      {showDateCard && (
        <Card
          className="bg-white shadow-lg outline outline-gray-200 mt-1 outline-1 p-4 flex-1 relative mr-1 ml-[-1px] h-full flex flex-col"
          id="date-card"
        >
          <button


            onClick={() => {
              setShowDateCard(false);
              setShowOtherCards(true);
            }}
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
          <div className="flex flex-col flex-grow mt-5 mr-5 ml-5">
            <div className="h-full">
              <CalendarComponent />
            </div>

          </div>
        </Card>
      )}
    </div>
  );
}
