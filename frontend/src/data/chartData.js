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

// Register ChartJS components
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

// Resources Usage Chart Data
export const resourcesChartData = (resourceChartType) => ({
  labels: ["Water", "Bleach (Toilet)", "Bleach (Walls & Floor)", "Detergent"],
  datasets: [
    {
      label: "Actual Usage",
      data: [5.5, 6.5, 7.5, 7.5],
      backgroundColor:
        resourceChartType === "line"
          ? "rgba(59, 130, 246, 0.1)"
          : "rgb(59, 130, 246)",
      borderColor: "rgb(59, 130, 246)",
      barPercentage: 0.8,
    },
    {
      label: "Recommended",
      data: [4, 8, 2, 2],
      backgroundColor:
        resourceChartType === "line"
          ? "rgba(74, 222, 128, 0.1)"
          : "rgb(74, 222, 128)",
      borderColor: "rgb(74, 222, 128)",
      barPercentage: 0.8,
    },
  ],
});

// Trends Over Time Chart Data
export const trendsChartData = (chartType) => ({
  labels: ["1st Week", "2nd Week", "3rd Week", "4th Week", "5th Week"],
  datasets: [
    {
      label: "Cleaning Pattern",
      data: [2, 3, 5, 6, 8],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor:
        chartType === "line" ? "rgba(59, 130, 246, 0.1)" : "rgb(59, 130, 246)",
      tension: 0.4,
    },
    {
      label: "Resources Consumed",
      data: [3, 4, 5.5, 6, 7],
      borderColor: "rgb(74, 222, 128)",
      backgroundColor:
        chartType === "line" ? "rgba(74, 222, 128, 0.1)" : "rgb(74, 222, 128)",
      tension: 0.4,
    },
  ],
});

// Usage Monitoring Chart Data
export const usageData = (chartType) => ({
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
      fill: chartType === "line",
      backgroundColor:
        chartType === "line"
          ? function (context) {
              const chart = context.chart;
              if (!chart.chartArea) {
                return "rgba(54, 162, 235, 0.2)";
              }
              const ctx = chart.ctx;
              const gradient = ctx.createLinearGradient(
                0,
                chart.chartArea.bottom,
                0,
                chart.chartArea.top
              );
              gradient.addColorStop(0, "rgba(54, 162, 235, 0.1)");
              gradient.addColorStop(1, "rgba(54, 162, 235, 0.6)");
              return gradient;
            }
          : "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      tension: 0.4,
      pointBackgroundColor: function(context) {
        const value = context.raw;
        const max = Math.max(...context.dataset.data);
        return value === max ? 'red' : 'rgba(54, 162, 235, 1)';
      },
      pointRadius: function(context) {
        const value = context.raw;
        const max = Math.max(...context.dataset.data);
        return value === max ? 6 : 4;
      },
      pointHoverRadius: function(context) {
        const value = context.raw;
        const max = Math.max(...context.dataset.data);
        return value === max ? 10 : 6;
      },
    },
    chartType === "bar"
      ? {
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
          hoverRadius: 8,
          hitRadius: 10,
        }
      : null,
  ].filter(Boolean),
});

// Chart Options
export const chartOptions = {
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

export const resourcesChartOptions = {
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

export const trendsChartOptions = {
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
