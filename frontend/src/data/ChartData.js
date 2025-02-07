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
export const resourcesChartData = (chartType) => ({
    labels: ["Water", "Bleach (Toilet)", "Bleach (Walls & Floor)", "Detergent"],
    datasets: [
      {
        label: "Actual Usage",
        data: [5.5, 6.5, 7.5, 7.5],
        backgroundColor: chartType === "line" ? "rgba(59, 130, 246, 0.1)" : "rgb(59, 130, 246)",
        borderColor: "rgb(59, 130, 246)",
        barPercentage: 0.6,
        fill: true,
      },
      {
        label: "Recommended",
        data: [4, 8, 2, 2],
        backgroundColor: chartType === "line" ? "rgba(74, 222, 128, 0.1)" : "rgb(74, 222, 128)",
        borderColor: "rgb(74, 222, 128)",
        barPercentage: 0.6,
        fill: true,
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
      backgroundColor: (chartType) === "line" ? "rgba(59, 130, 246, 0.1)" : "rgb(59, 130, 246)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Resources Consumed",
      data: [3, 4, 5.5, 6, 7],
      borderColor: "rgb(74, 222, 128)",
      backgroundColor: (chartType) === "line" ? "rgba(74, 222, 128, 0.1)" : "rgb(74, 222, 128)",
      tension: 0.4,
      fill: true,
    },
  ],
});

// Usage Monitoring Chart Data
export const usageData = {

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
      data: [null, null, null, null, null, null, null, null, null, null, 85, null],
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
          if (isPeakShown && dataIndex === 10 && tooltipItem.dataset.label === "Usage") {
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