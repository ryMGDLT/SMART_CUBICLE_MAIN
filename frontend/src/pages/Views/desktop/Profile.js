import React from "react";
import { Camera } from "lucide-react";
import {
  PROFILE_DATA,
  DEFAULT_PROFILE_IMAGE,
} from "../../../data/placeholderData";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function Profile() {
  const profileData = PROFILE_DATA[0]; // Using the first profile data

  return (
    <div className="h-full shadow-md bg-white rounded-lg p-6">
      <div className="mx-auto shadow-md bg-white rounded-lg p-6">
        <div className="flex gap-8">
          {/* Profile Picture Section - Left Side */}
          <div className="relative">
            <div className="relative">
              <Avatar className="w-40 h-40">
                <AvatarImage
                  src={DEFAULT_PROFILE_IMAGE}
                  alt={profileData.name}
                />
                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-2 right-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                aria-label="Change profile picture"
              >
                <Camera className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Profile Information Form - Right Side */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Full Name</label>
                <Input
                  type="text"
                  value={profileData.name}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Email</label>
                <Input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Employee ID
                </label>
                <Input
                  type="text"
                  value={profileData.employeeId}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Position</label>
                <Input
                  type="text"
                  value={profileData.position}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button
            variant="default"
            className="bg-Icpetgreen hover:bg-Icpetgreen/90"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
