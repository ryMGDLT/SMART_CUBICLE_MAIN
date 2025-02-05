import React from 'react';
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
        display: true,
        text: 'Resources Usage',
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
        display: true,
        text: 'Trends Over Time',
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

              <Bar data={barData} options={barOptions} />
            </div>
            <div className="shadow-md bg-white rounded-lg p-4">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        
          <div className="shadow-md bg-white rounded-lg p-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Resources</th>
                  <th className="text-left p-2">Current Stock</th>
                  <th className="text-left p-2">Restock Threshold</th>
                  <th className="text-left p-2">Recommended Restocking Time</th>
                  <th className="text-left p-2">Recommended Restock</th>
                  <th className="text-left p-2">Last Restocked</th>
                  <th className="text-left p-2">Next Restocking Date</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{row.resource}</td>
                    <td className="p-2">{row.currentStock}</td>
                    <td className="p-2">{row.restockThreshold}</td>
                    <td className="p-2">{row.recommendedRestockTime}</td>
                    <td className="p-2">{row.recommendedRestock}</td>
                    <td className="p-2">{row.lastRestocked}</td>
                    <td className="p-2">{row.nextRestockDate}</td>
                    <td className="p-2">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div >
      </div>

      {/* Reminder Panel */}
      <div className="w-80 shrink-0">
        <div className="shadow-md h-full bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Reminder</h2>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              Janitors Usage
            </span>
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
