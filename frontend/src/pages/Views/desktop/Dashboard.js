import React, { useState, useEffect, useRef } from "react";
import { Card } from "../../../Components/ui components/card";
import CalendarComponent from "../../../Components/ui components/DBoardComponent.js/dCalendar";
import CustomCalendar from "../../../Components/ui components/DBoardComponent.js/asideCalendar";
import "../../../styles/Calendar.css";
import SummarizedReport from "../../../Components/ui components/DBoardComponent.js/SummarizedCard";
import {
  ResourcesUsageChart,
  TrendsOverTimeChart,
  UsageMonitoringChart,
} from "../../../Components/ui components/DBoardComponent.js/DashboardCharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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

// Custom hook for dropdown functionality
const useDropdown = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return [isOpen, setIsOpen, ref];
};

export default function Dashboard() {
  // State management
  const [chartType, setChartType] = useState("bar");
  const [trendsChartType, setTrendsChartType] = useState("line");
  const [showDateCard, setShowDateCard] = useState(false);
  const [remindersChecked, setRemindersChecked] = useState({
    cleaningSchedule: true,
    peakHours: true,
    resourceRestocking: true,
  });
  const [selectedPeriod, setPeriod] = useState("Daily");
  const [selectedMetrics, setSelectedMetrics] = useState([
    "Usage Peak Hour",
    "Total Cleaning Time",
    "Recommended Cleaning Time",
    "Total Resources Restocked",
    "Recommended Resources",
  ]);

  // Dropdown handlers
  const [
    showSummarizedDropdown,
    setShowSummarizedDropdown,
    summarizedDropdownRef,
  ] = useDropdown(false);
  const [showChartDropdown, setShowChartDropdown, chartDropdownRef] =
    useDropdown(false);
  const [showTrendsDropdown, setShowTrendsDropdown, trendsDropdownRef] =
    useDropdown(false);

  // Derived state
  const showOtherCards = !showDateCard;

  // Handlers
  const handleReminderChange = (key) => {
    setRemindersChecked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const toggleMetric = (item) => {
    setSelectedMetrics((prevMetrics) =>
      prevMetrics.includes(item)
        ? prevMetrics.filter((metric) => metric !== item)
        : [...prevMetrics, item]
    );
  };

  // Effects for localStorage persistence
  useEffect(() => {
    const storedShowDateCard = localStorage.getItem("showDateCard") === "true";
    setShowDateCard(storedShowDateCard);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedMetrics", JSON.stringify(selectedMetrics));
  }, [selectedMetrics]);

  useEffect(() => {
    localStorage.setItem("showDateCard", showDateCard);
  }, [showDateCard]);

  return (
    <div className="flex flex-col md:flex-row mt-[-15px] ml-[-15px] mr-[-10px] mx-auto">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 min-h-screen p-4 flex flex-col">
        <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex flex-col mt-[-12px]">
          {/* Calendar */}
          <div className="flex justify-center items-center">
            <CustomCalendar
              handleDateClick={() => setShowDateCard(true)}
              today={new Date().getDate()}
            />
          </div>
          <hr className="w-full border-t border-gray-200 my-4 mt-5" />

          {/* Reminders Section */}
          <div className="flex flex-col items-start mt-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Reminders</h2>
            <div className="w-full space-y-3">
              {/* Cleaning Schedule */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                    <input
                      id="blue-checkbox"
                      type="checkbox"
                      checked={remindersChecked.cleaningSchedule}
                      onChange={() => handleReminderChange("cleaningSchedule")}
                      className="w-4 h-4 text-blue-600 bg-white border-white rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"
                    />
                  </div>
                  <span>Cleaning Schedule</span>
                </div>
                <span className="bg-blue-500 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
                  2
                </span>
              </div>

              {/* Peak Hours */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                    <input
                      id="red-checkbox"
                      type="checkbox"
                      checked={remindersChecked.peakHours}
                      onChange={() => handleReminderChange("peakHours")}
                      className="w-4 h-4 text-red-600 bg-white border-red-500 rounded-sm focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"
                    />
                  </div>
                  <span>Peak Hours</span>
                </div>
                <span className="bg-red-500 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
                  2
                </span>
              </div>

              {/* Resource Restocking */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                    <input
                      id="black-checkbox"
                      type="checkbox"
                      checked={remindersChecked.resourceRestocking}
                      onChange={() =>
                        handleReminderChange("resourceRestocking")
                      }
                      className="w-4 h-4 text-black bg-white border-white rounded-sm focus:ring-black dark:focus:ring-black dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"
                    />
                  </div>
                  <span>Resource Restocking</span>
                </div>
                <span className="bg-black text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
                  2
                </span>
              </div>
            </div>
          </div>
          <hr className="w-full border-t border-gray-200 my-4 mt-5" />
          {/* Janitor Schedule */}
          <div className="flex-grow">
            <h2 className="text-xl font-bold mb-4">Janitor Schedule (Today)</h2>
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
                      <span className={`text-${shift.color}-500`}>
                        {shift.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </aside>

      {/* Main Content */}
      {showOtherCards && (
        <div className="flex-1 p-1 ml-[-5px]">
          <div className="grid grid-cols-1 gap-6">
            {/* Summarized Report */}
            <Card>
              <SummarizedReport
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setPeriod}
                allMetrics={[
                  "Usage Peak Hour",
                  "Total Cleaning Time",
                  "Recommended Cleaning Time",
                  "Total Resources Restocked",
                  "Recommended Resources",
                ]}
                selectedMetrics={selectedMetrics}
                toggleMetric={toggleMetric}
                showDropdown={showSummarizedDropdown}
                setShowDropdown={setShowSummarizedDropdown}
                dropdownRef={summarizedDropdownRef}
              />
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex-1 h-auto md:h-[400px]">
                <ResourcesUsageChart
                  chartType={chartType}
                  setShowChartDropdown={setShowChartDropdown}
                  showChartDropdown={showChartDropdown}
                  setChartType={setChartType}
                  dropdownRef={chartDropdownRef}
                />
              </Card>
              <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex-1 h-auto md:h-[400px]">
                <TrendsOverTimeChart
                  trendsChartType={trendsChartType}
                  setShowTrendsDropdown={setShowTrendsDropdown}
                  showTrendsDropdown={showTrendsDropdown}
                  setTrendsChartType={setTrendsChartType}
                  dropdownRef={trendsDropdownRef}
                />
              </Card>
            </div>

            {/* Usage Monitoring */}
            <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex-1 h-auto md:h-[400px]">
              <UsageMonitoringChart />
            </Card>
          </div>
        </div>
      )}

      {/* Date Card */}
      {showDateCard && (
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
            <CalendarComponent remindersChecked={remindersChecked} />
          </div>
        </Card>
      )}
    </div>
  );
}
