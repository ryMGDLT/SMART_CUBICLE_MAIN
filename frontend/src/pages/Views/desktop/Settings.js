import React, { useState } from "react";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState('light');

  return (
    <div className="h-full shadow-md bg-white rounded-lg p-4">
      {/* Notification Section */}
      <div className="w-full mx-auto shadow-md bg-white rounded-lg p-6">
        <h2 className="text-2xl font-medium">Notification</h2>
        <label className="text-sm text-gray-500">
          You can customize your notification settings
        </label>

        <div className="flex flex-row gap-4 mt-4 items-center">
          <label className="text-md">Status</label>
          <label
            htmlFor="notifStatus"
            className="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-Icpetgreen"
          >
            <input type="checkbox" id="notifStatus" className="peer sr-only" />
            <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6"></span>
          </label>
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="w-full p-6 bg-white rounded-lg mt-4 shadow-md">
        <h2 className="text-2xl font-medium">Theme</h2>
        <label className="text-sm text-gray-500">You can customize your theme settings</label>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => setSelectedTheme('light')}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-${
              selectedTheme === 'light' ? '2 border-Icpetgreen' : '1 border-gray-300'
            } hover:border-Icpetgreen/50 transition-all`}
          >
            <div className="w-16 h-16 rounded-full bg-Icpetblue border-4 border-Icpetgreen mb-3" />
            <span className="text-base font-medium">Light Mode</span>
            {selectedTheme === 'light' && (
              <span className="text-sm text-Icpetgreen mt-2">Active</span>
            )}
          </button>

          <button
            onClick={() => setSelectedTheme('dark')}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-${
              selectedTheme === 'dark' ? '2 border-Icpetgreen' : '1 border-gray-300'
            } hover:border-Icpetgreen/50 transition-all`}
          >
            <div className="w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-300 mb-3" />
            <span className="text-base font-medium">Dark Mode</span>
            {selectedTheme === 'dark' && (
              <span className="text-sm text-Icpetgreen mt-2">Active</span>
            )}
          </button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="w-full mx-auto mt-4 shadow-md bg-white rounded-lg p-6 pb-4">
        <h2 className="text-2xl font-medium">Change Password</h2>
        <label className="text-sm text-gray-500">
          You can change your password here
        </label>
        {/* Change Password - Horizontal 3 inputs positions*/}
        <div className="flex flex-row gap-6 mb-6 mt-4">
          <div className="flex flex-col flex-1">
            <label className="mb-2">Current Password</label>
            <input
              type="currentPassword"
              placeholder="Current Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="mb-2">New Password</label>
            <input
              type="newPassword"
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="mb-2">Confirm Password</label>
            <input
              type="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
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
