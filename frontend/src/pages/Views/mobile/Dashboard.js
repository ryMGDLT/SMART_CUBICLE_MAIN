import React, { useState } from "react";
import { Card } from "../../../Components/ui/card";
import SummarizedReport from "../../../Components/reports/SummarizedCard";
import { useDropdown } from "../../../Components/ui/dropdown-menu";
import { toggleMetric } from "../../../Components/utils/metricUtils";
import {
  ResourcesUsageChart,
  TrendsOverTimeChart,
  UsageMonitoringChart,
} from "../../../Components/charts/DashboardCharts";
import CustomCalendar from "../../../Components/calendar/asideCalendar";
import MobileCalendar from "../../../Components/calendar/mobileCalendar";
import Reminders from "../../../Components/reminder/Reminder";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-auto p-3 relative mr-2 ml-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>
        {/* Modal Content */}
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [selectedPeriod, setPeriod] = useState("Daily");
  const [selectedMetrics, setSelectedMetrics] = useState([
    "Usage Peak Hour",
    "Total Cleaning Time",
    "Recommended Cleaning Time",
    "Total Resources Restocked",
    "Recommended Resources",
  ]);
  const [
    showSummarizedDropdown,
    setShowSummarizedDropdown,
    summarizedDropdownRef,
  ] = useDropdown(false);
  const [activeButton, setActiveButton] = useState("charts");
  const toggleMetricWrapper = (item) => {
    toggleMetric(setSelectedMetrics, item);
  };
  const [chartType, setChartType] = useState("bar");
  const [trendsChartType, setTrendsChartType] = useState("line");
  const [showChartDropdown, setShowChartDropdown, chartDropdownRef] =
    useDropdown(false);
  const [showTrendsDropdown, setShowTrendsDropdown, trendsDropdownRef] =
    useDropdown(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [remindersChecked, setRemindersChecked] = useState({
    cleaningSchedule: true,
    peakHours: true,
    resourceRestocking: true,
  });

  return (
    <div className="flex flex-col mt-[-10px]">
      {/* Summarized Report Section */}
      <Card className="bg-white shadow-lg p-4 outline outline-gray-200 outline-1">
        <h3 className="text-2xl font-bold mb-4">Summarized Report</h3>
        <div className="flex gap-2 justify-end mb-3">
          {/* Period Selector */}
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
          {/* Dropdown Button */}
          <div className="relative" ref={summarizedDropdownRef}>
            <button
              onClick={() => setShowSummarizedDropdown(!showSummarizedDropdown)}
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
            {/* Dropdown Content */}
            {showSummarizedDropdown && (
              <div
                className="absolute right-0 mt-2 w-48 bg-teal-600 rounded-md shadow-lg py-1 z-10"
                style={{ top: "100%", overflow: "visible" }}
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
                    className={`px-4 py-2 hover:bg-teal-700 flex items-center gap-2 cursor-pointer min-h-[40px] ${
                      index !== 4 ? "border-b border-white" : ""
                    }`}
                    onClick={() => toggleMetricWrapper(item)}
                  >
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(item)}
                        readOnly
                        className="hidden"
                      />
                      <div
                        className="w-4 h-4 bg-white rounded-sm flex items-center justify-center"
                        style={{ border: "1px solid #ccc" }}
                      >
                        <svg
                          className={`w-4 h-4 ${
                            selectedMetrics.includes(item)
                              ? "text-teal-700"
                              : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          {selectedMetrics.includes(item) && (
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          )}
                        </svg>
                      </div>
                    </label>
                    <span className="text-sm text-white">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* SummarizedReport Component */}
        <div className="flex overflow-x-auto">
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
            showDropdown={showSummarizedDropdown}
            setShowDropdown={setShowSummarizedDropdown}
            dropdownRef={summarizedDropdownRef}
            showPeriodSelector={false}
            showMetricsDropdown={false}
            showMetricsCards={true}
            showHeader={false}
          />
        </div>
      </Card>
      {/* Charts/Reports Section */}
      <Card className="bg-white shadow-lg outline outline-1 outline-gray-200 mt-4 p-2 rounded-lg h-full">
        {/* Buttons */}
        <div className="flex space-x-2 mb-2 justify-center items-center mr-1 mt-2">
          <button
            className={`${
              activeButton === "charts"
                ? "text-white font-semibold"
                : "text-black"
            } px-4 py-2 rounded-lg text-sm ${
              activeButton === "charts" ? "bg-teal-600" : "bg-none"
            }`}
            onClick={() => setActiveButton("charts")}
          >
            Chart Reports
          </button>
          <button
            className={`${
              activeButton === "reports"
                ? "text-white font-semibold"
                : "text-black"
            } px-4 py-2 rounded-lg text-sm ${
              activeButton === "reports" ? "bg-teal-600" : "bg-none"
            }`}
            onClick={() => setActiveButton("reports")}
          >
            Event Calendar
          </button>
        </div>
        <div className="p-1">
          {activeButton === "charts" && (
            <div>
              <div className="flex flex-col mt-1">
                <div className="flex flex-col gap-4 h-[350px]">
                  <ResourcesUsageChart
                    chartType={chartType}
                    setShowChartDropdown={setShowChartDropdown}
                    showChartDropdown={showChartDropdown}
                    setChartType={setChartType}
                    dropdownRef={chartDropdownRef}
                  />
                </div>
                <hr className="w-full border-t border-gray-200 mt-5 mb-5 shadow-lg" />
                <div className="flex flex-col gap-4 h-[350px]">
                  <TrendsOverTimeChart
                    trendsChartType={trendsChartType}
                    setShowTrendsDropdown={setShowTrendsDropdown}
                    showTrendsDropdown={showTrendsDropdown}
                    setTrendsChartType={setTrendsChartType}
                    dropdownRef={trendsDropdownRef}
                  />
                </div>
                <hr className="w-full border-t border-gray-200 mt-5 mb-5 shadow-lg" />
                <div className="flex flex-col gap-4 h-[350px]">
                  <UsageMonitoringChart />
                </div>
              </div>
            </div>
          )}
          {activeButton === "reports" && (
            <div className="flex flex-col items-center h-full">
              <div className="flex justify-center w-full mb-4">
                <div className="max-w-[350px]">
                  <CustomCalendar
                    handleDateClick={handleDateClick}
                    today={new Date().getDate()}
                  />
                </div>
              </div>
              <hr className="w-full border-t border-gray-200 mt-[-10px] mb-3 shadow-lg" />
              <div className="mb-2 w-full">
                <div className="w-full">
                  <Reminders
                    remindersChecked={remindersChecked}
                    setRemindersChecked={setRemindersChecked}
                  />
                </div>
              </div>

              <hr className="w-full border-t border-gray-200 mt-4 mb-5 shadow-lg" />

              <div className="flex flex-col gap-4 w-full">
                <h2 className="text-xl font-bold mb-4">
                  Janitor Schedule (Today)
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
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
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4 mt-4">Event Calendar</h2>
        <div className="mobileCalendar mb-4" style={{ height: "auto" }}>
          <MobileCalendar
            remindersChecked={remindersChecked}
            onDateClick={handleDateClick}
          />
        </div>
      </Modal>
    </div>
  );
}
