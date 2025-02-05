import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ChevronUp, ChevronDown, Pencil, Printer } from 'heroicons-react';
import { RESOURCES_DATA } from '../../../data/placeholderData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function MobileResources() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Reduced for mobile view

  // Add the missing data definitions
  // Bar chart data
  const barData = {
    labels: ['Water Usage', 'Bleach (Toilet)', 'Bleach (Walls & Floor)', 'Detergent'],
    datasets: [
      {
        label: 'Actual Usage',
        data: [6, 4, 8, 8],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Recommended',
        data: [4, 8, 4, 6],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  // Line chart data
  const lineData = {
    labels: ['1st Week', '2nd Week', '3rd Week', '4th Week', '5th Week'],
    datasets: [
      {
        label: 'Cleaning Pattern',
        data: [2, 3, 4, 4.5, 5],
        borderColor: 'rgba(54, 162, 235, 0.8)',
        tension: 0.4,
      },
      {
        label: 'Resources Consumed',
        data: [2, 2.5, 3, 3.5, 4],
        borderColor: 'rgba(75, 192, 192, 0.8)',
        tension: 0.4,
      },
    ],
  };

  // Reminder data
  const reminderData = [
    {
      date: 'Today',
      items: [
        { name: 'John Doe', resource: 'Water Usage', status: 'Excessive Usage' },
        { name: 'John Doe', resource: 'Detergent', status: 'Higher than Average' }
      ]
    },
    {
      date: '06/20/24',
      items: [
        { name: 'John Doe', resource: 'Water Usage', status: 'Excessive Usage' },
        { name: 'John Doe', resource: 'Detergent', status: 'Higher than Average' }
      ]
    }
  ];

  // Status color utility function
  const getStatusColor = (status) => {
    switch (status) {
      case 'Excessive Usage':
        return 'text-red-500';
      case 'Higher than Average':
        return 'text-yellow-500';
      default:
        return 'text-gray-700';
    }
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RESOURCES_DATA.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(RESOURCES_DATA.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Chart options optimized for mobile
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 10
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      {/* Charts Section */}
      <div className="flex flex-col gap-4">
        {/* Resources Usage Chart */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Resources Usage</h2>
            <button className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded hover:bg-green-200 transition-colors">
              Janitors Usage
            </button>
          </div>
          <div className="h-[300px]">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        {/* Trends Chart */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Trends Over Time</h2>
            <span className="text-gray-400">...</span>
          </div>
          <div className="h-[300px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Inventory Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Inventory</h2>
            <div className="flex items-center gap-2">
              <ChevronUp className="w-4 h-4 text-gray-500 cursor-pointer" />
              <span className="text-gray-700 font-bold text-sm">June 2024</span>
              <ChevronDown className="w-4 h-4 text-gray-500 cursor-pointer" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-700">
              Generate Graph
            </button>
            <button className="text-teal-600 p-1.5 rounded-lg hover:bg-teal-50">
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile-optimized table/cards */}
        <div className="flex flex-col gap-3">
          {currentItems.map((item, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{item.resources}</h3>
                <button className="text-teal-600 hover:text-teal-700">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Current Stock</p>
                  <p className="font-medium">{item.currentStock}</p>
                </div>
                <div>
                  <p className="text-gray-500">Threshold</p>
                  <p className="font-medium">{item.restockThreshold}</p>
                </div>
                <div>
                  <p className="text-gray-500">Restock Date</p>
                  <p className="font-medium">{item.recommendedRestockingTime}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium">{item.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-friendly pagination */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border disabled:opacity-50"
          >
            ←
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>

      {/* Reminders Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="font-bold text-lg mb-4">Reminders</h2>
        <div className="space-y-3">
          {reminderData.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-medium text-sm text-gray-500 mb-2">{section.date}</h3>
              <div className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.resource}</p>
                      </div>
                      <span className={`text-sm ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
