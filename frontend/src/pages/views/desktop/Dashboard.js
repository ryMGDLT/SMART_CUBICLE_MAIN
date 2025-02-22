import React, { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import CustomCalendar from "../../../components/calendar/asideCalendar";
import "../../../styles/Calendar.css";
import SummarizedReport from "../../../components/reports/summarizedCard";
import {
  ResourcesUsageChart,
  TrendsOverTimeChart,
  UsageMonitoringChart,
} from "../../../components/charts/mainCharts";
import { toggleMetric } from "../../../components/utils/metricUtils";
import { handleReminderChange } from "../../../components/utils/reminderUtils";
import Reminders from "../../../components/reminder/reminder";
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
import { DateCard } from "../../../components/calendar/dateCard";

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

  const showOtherCards = !showDateCard;

  const handleReminderChangeWrapper = (key) => {
    handleReminderChange(setRemindersChecked, key);
  };

  const toggleMetricWrapper = (item) => {
    toggleMetric(setSelectedMetrics, item);
  };

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
      <aside className="w-full md:w-1/4 min-h-screen h-full p-4 flex flex-col mt-[-12px]">
        <Card className="bg-white shadow-lg p-4 flex flex-col h-full overflow-y-auto outline outline-gray-200 outline-1">
          {/* Calendar */}
          <div className="flex justify-center items-center mb-4 overflow-y-auto">
            <CustomCalendar
              handleDateClick={() => setShowDateCard(true)}
              today={new Date().getDate()}
            />
          </div>
          <hr className="w-full border-t border-gray-200 my-4 shadow-lg" />

          {/* Reminders Section */}
          <div>
            <Reminders
              remindersChecked={remindersChecked}
              setRemindersChecked={setRemindersChecked}
            />
          </div>
          <hr className="w-full border-t border-gray-200 mt-5 mb-5 shadow-lg" />

          {/* Janitor Schedule */}
          <div className="flex-grow overflow-y-auto">
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
                      <span
                        className={
                          shift.color === "green"
                            ? "text-green-500"
                            : shift.color === "red"
                            ? "text-red-500"
                            : shift.color === "yellow"
                            ? "text-yellow-500"
                            : ""
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
        </Card>
      </aside>

      {/* Main Content */}
      {showOtherCards && (
        <div className="flex-1 p-1 ml-[-5px]">
          <div className="grid grid-cols-1 gap-6">
            {/* Summarized Report */}
            <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4">
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
                toggleMetric={toggleMetricWrapper}
                showPeriodSelector={true}
                showMetricsDropdown={true}
                showMetricsCards={true}
                showHeader={true}
              />
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex-1 h-auto md:h-[400px]">
                <ResourcesUsageChart
                  chartType={chartType}
                  setChartType={setChartType}
                />
              </Card>
              <Card className="bg-white shadow-lg outline outline-gray-200 outline-1 p-4 flex-1 h-auto md:h-[400px]">
                <TrendsOverTimeChart
                  trendsChartType={trendsChartType}
                  setTrendsChartType={setTrendsChartType}
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
        <DateCard
          showDateCard={showDateCard}
          setShowDateCard={setShowDateCard}
          remindersChecked={remindersChecked}
        />
      )}
    </div>
  );
}
