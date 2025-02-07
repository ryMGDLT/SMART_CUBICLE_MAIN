import React from "react";
import { Camera } from "heroicons-react";
import { PROFILE_DATA, DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";

export default function Profile() {
  const profileData = PROFILE_DATA[0]; // Using the first profile data

  return (
    <div className="h-full bg-white p-4">
      <div className="mx-auto bg-white">
        {/* Profile Picture Section - Centered */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img
              src={DEFAULT_PROFILE_IMAGE}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              aria-label="Change profile picture"
            >
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Profile Information Form - Full Width */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border rounded-lg text-gray-700 cursor-not-allowed text-base"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={profileData.email}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border rounded-lg text-gray-700 cursor-not-allowed text-base"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Employee ID</label>
            <input
              type="text"
              value={profileData.employeeId}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border rounded-lg text-gray-700 cursor-not-allowed text-base"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Position</label>
            <input
              type="text"
              value={profileData.position}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border rounded-lg text-gray-700 cursor-not-allowed text-base"
            />
          </div>
        </div>

        {/* Save Button - Full Width */}
        <div className="mt-6">
          <button
            type="button"
            className="w-full py-3 bg-Icpetgreen text-white rounded-lg hover:bg-opacity-90 transition-colors text-base font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
