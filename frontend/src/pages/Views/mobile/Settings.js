import React, { useState } from "react";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState('light');

  return (
    <div className="h-full flex flex-col p-2 gap-2 overflow-y-auto">
      {/* Notification Section */}
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-medium mb-2">Notification</h2>
        <label className="text-sm text-gray-500 block mb-4">
          You can customize your notification settings
        </label>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-base">Status</label>
            <label
              htmlFor="notifStatus"
              className="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-Icpetgreen"
            >
              <input type="checkbox" id="notifStatus" className="peer sr-only" />
              <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6" />
            </label>
          </div>
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-medium mb-4">Theme</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setSelectedTheme('light')}
            className={`flex items-center justify-between w-full p-3 rounded-lg border-${
              selectedTheme === 'light' ? '2 border-Icpetgreen' : '1 border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-Icpetblue border-2 border-Icpetgreen" />
              <span className="text-sm">Light Mode</span>
            </div>
            {selectedTheme === 'light' && (
              <span className="text-xs text-Icpetgreen font-medium">Active</span>
            )}
          </button>

          <button
            onClick={() => setSelectedTheme('dark')}
            className={`flex items-center justify-between w-full p-3 rounded-lg border-${
              selectedTheme === 'dark' ? '2 border-Icpetgreen' : '1 border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-300" />
              <span className="text-sm">Dark Mode</span>
            </div>
            {selectedTheme === 'dark' && (
              <span className="text-xs text-Icpetgreen font-medium">Active</span>
            )}
          </button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-medium mb-4">Change Password</h2>
        <label className="text-sm text-gray-500 block mb-4">
          You can change your password here
        </label>
        {/* Change Password - Horizontal 3 inputs positions*/}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-2">Current Password</label>
            <input
              type="currentPassword"
              placeholder="Current Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">New Password</label>
            <input
              type="newPassword"
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Confirm Password</label>
            <input
              type="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-Icpetgreen text-white px-16 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
