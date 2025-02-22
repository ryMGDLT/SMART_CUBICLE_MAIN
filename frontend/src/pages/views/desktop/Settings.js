import React, { useState } from "react";
import { Switch } from "../../../components/ui/switch";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState("light");

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
          <Switch id="notification-status" />
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="w-full p-6 bg-white rounded-lg mt-4 shadow-md">
        <h2 className="text-2xl font-medium">Theme</h2>
        <label className="text-sm text-gray-500">
          You can customize your theme settings
        </label>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => setSelectedTheme("light")}
            className={cn(
              "flex flex-col items-center justify-center p-4 h-auto rounded-xl",
              selectedTheme === "light"
                ? "border-2 border-Icpetgreen"
                : "border border-gray-300 hover:border-Icpetgreen/50"
            )}
          >
            <div className="w-16 h-16 rounded-full bg-Icpetblue border-4 border-Icpetgreen mb-3" />
            <span className="text-base font-medium">Light Mode</span>
            {selectedTheme === "light" && (
              <span className="text-sm text-Icpetgreen mt-2">Active</span>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => setSelectedTheme("dark")}
            className={cn(
              "flex flex-col items-center justify-center p-4 h-auto rounded-xl",
              selectedTheme === "dark"
                ? "border-2 border-Icpetgreen"
                : "border border-gray-300 hover:border-Icpetgreen/50"
            )}
          >
            <div className="w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-300 mb-3" />
            <span className="text-base font-medium">Dark Mode</span>
            {selectedTheme === "dark" && (
              <span className="text-sm text-Icpetgreen mt-2">Active</span>
            )}
          </Button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="w-full mx-auto mt-4 shadow-md bg-white rounded-lg p-6 pb-4">
        <h2 className="text-2xl font-medium">Change Password</h2>
        <label className="text-sm text-gray-500">
          You can change your password here
        </label>
        <div className="flex flex-row gap-6 mb-6 mt-4">
          <div className="flex flex-col flex-1">
            <label className="mb-2">Current Password</label>
            <Input
              type="password"
              placeholder="Current Password"
              className="focus-visible:ring-Icpetgreen"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="mb-2">New Password</label>
            <Input
              type="password"
              placeholder="New Password"
              className="focus-visible:ring-Icpetgreen"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="mb-2">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="focus-visible:ring-Icpetgreen"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="default"
            className="bg-Icpetgreen hover:bg-Icpetgreen/90 px-16"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
