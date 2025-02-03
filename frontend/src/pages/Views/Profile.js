import React from "react";
import { Camera } from "heroicons-react";

export default function Profile() {
  return (
    <div className="h-full shadow-md bg-white rounded-lg p-6">
      <div className="mx-auto shadow-md bg-white rounded-lg p-6">
        <div className="flex gap-8">
          {/* Profile Picture Section - Left Side */}
          <div className="relative">
            <div className="relative">
              <img
                src="/images/sadGato.jpg"
                alt="Profile Picture"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                aria-label="Change profile picture"
              >
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Profile Information Form - Right Side */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value="John Doe"
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value="john.doe@tup.edu.ph"
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  value="TUPM-21-0000"
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Position</label>
                <input
                  type="text"
                  value="Admin"
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button
            type="button"
            className="px-6 py-2 bg-Icpetgreen text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
