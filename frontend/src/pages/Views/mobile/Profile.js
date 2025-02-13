import React from "react";
import { Camera } from "lucide-react";
import {
  PROFILE_DATA,
  DEFAULT_PROFILE_IMAGE,
} from "../../../data/placeholderData";
import { Avatar, AvatarImage, AvatarFallback } from "../../../Components/ui/avatar";
import { Input } from "../../../Components/ui/input";
import { Button } from "../../../Components/ui/button";

export default function Profile() {
  const profileData = PROFILE_DATA[0]; // Using the first profile data

  return (
    <div className="h-full bg-white p-4">
      <div className="mx-auto bg-white">
        {/* Profile Picture Section - Centered */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={DEFAULT_PROFILE_IMAGE} alt={profileData.name} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 bg-white rounded-full shadow-md hover:bg-gray-50"
              aria-label="Change profile picture"
            >
              <Camera className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Profile Information Form - Full Width */}
        <div className="space-y-4">
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

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Employee ID</label>
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

        {/* Save Button - Full Width */}
        <div className="mt-6">
          <Button 
            variant="default"
            className="w-full py-6 bg-Icpetgreen hover:bg-Icpetgreen/90 text-base font-medium"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
