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

export default function Resources() {
  // Add these new state variables
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Import RESOURCES_DATA and calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RESOURCES_DATA.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(RESOURCES_DATA.length / itemsPerPage);

  // Add pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
  };

  // Table data
  const tableData = [
    {
      resource: 'Water Usage',
      currentStock: '20 L',
      restockThreshold: '10 L',
      recommendedRestockTime: '06/20/24',
      recommendedRestock: '30 L',
      lastRestocked: '05/10/24',
      nextRestockDate: '06/30/24',
      status: 'Sufficient',
    },
    // Add more rows as needed
  ];

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

  return (
    <div className="flex gap-4 h-full">
      {/* Main content */}
      <div className="shadow-md h-full bg-white rounded-lg p-4">
        <div className="flex flex-col gap-4 flex-grow">
          <div className="grid grid-cols-2 gap-4">
            <div className="shadow-md bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Resources Usage</h2>
                <span className="text-gray-400">...</span>
              </div>
              <Bar data={barData} options={barOptions} />
            </div>
            <div className="shadow-md bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Trends Over Time</h2>
                <span className="text-gray-400">...</span>
              </div>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        
          {/* Updated Inventory Section */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Inventory</h2>
              
              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <ChevronUp className="w-5 h-5 text-gray-500 cursor-pointer" />
                <span className="text-gray-700 font-bold">June 2024</span>
                <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
              </div>


              {/* Generate Graph and Print Buttons */}
              <div className="flex items-center gap-0">
                <button className="bg-teal-600 text-white px-2 py-1 rounded-lg hover:bg-teal-700">
                  Generate Graph
                </button>
                <button className="bg-white text-teal-600 p-2 rounded-lg hover:bg-teal-700">
                  <Printer className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200">
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-4 text-left font-medium text-gray-900">Resources</th>
                      <th className="px-4 py-4 text-left font-medium text-gray-900">Current Stock</th>
                      <th className="px-4 py-4 text-left font-medium text-gray-900">Restock Threshold</th>
                      <th className="px-4 py-4 text-left font-medium text-gray-900">Recommended Restocking Time</th>
                      <th className="px-4 py-4 text-left font-medium text-gray-900">Recommended Restock</th>
                      <th className="px-4 py-4 text-left font-medium text-gray-900">Last Restocked</th>
                      <th className="px-4 py-4 text-left font-medium text-gray-900">Next Restocking Date</th>
                      <th className="px-4 py-4 text-left font-medium text-gray-900">Status</th>
                      <th className="px-4 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((row, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-gray-700">{row.resources}</td>
                        <td className="px-4 py-4 text-gray-700">{row.currentStock}</td>
                        <td className="px-4 py-4 text-gray-700">{row.restockThreshold}</td>
                        <td className="px-4 py-4 text-gray-700">{row.recommendedRestockingTime}</td>
                        <td className="px-4 py-4 text-gray-700">{row.recommendedRestock}</td>
                        <td className="px-4 py-4 text-gray-700">{row.lastRestocked}</td>
                        <td className="px-4 py-4 text-gray-700">{row.nextRestockingDate}</td>
                        <td className="px-4 py-4 text-gray-700">{row.status}</td>
                        <td className="px-4 py-4">
                          <button className="text-teal-600 hover:text-teal-700">
                            <Pencil className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Pagination */}
              <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <ol className="flex justify-center gap-1 text-xs font-medium">
                  <li>
                    <button
                      onClick={handlePrevPage}
                      className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180 hover:bg-gray-50"
                      disabled={currentPage === 1}
                    >
                      <span className="sr-only">Prev Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>

                  {pageNumbers.map((page) => (
                    <li key={page}>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`h-8 w-8 rounded border ${
                          currentPage === page
                            ? "border-teal-600 bg-teal-600 text-white"
                            : "border-gray-100 bg-white text-gray-900 hover:bg-gray-50"
                        } text-center leading-8`}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={handleNextPage}
                      className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180 hover:bg-gray-50"
                      disabled={currentPage === totalPages}
                    >
                      <span className="sr-only">Next Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Panel */}
      <div className="w-80 shrink-0">
        <div className="shadow-md h-full bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Reminder</h2>
            <button 
              className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded hover:bg-green-200 transition-colors"
            >
              Janitors Usage
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {reminderData.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-medium mb-2">{section.date}</h3>
                <div className="flex flex-col gap-2">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-700">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.resource}</p>
                        </div>
                        <p className={`text-sm flex items-center ${getStatusColor(item.status)}`}>
                          {item.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
