import React, { useState } from "react";
import { Switch } from "../../../components/ui/switch";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState("light");

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
            <Switch id="notification-status" />
          </div>
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-medium mb-4">Theme</h2>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => setSelectedTheme("light")}
            className={cn(
              "flex items-center justify-between w-full p-3 h-auto rounded-lg",
              selectedTheme === "light"
                ? "border-2 border-Icpetgreen"
                : "border border-gray-300 hover:border-Icpetgreen/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-Icpetblue border-2 border-Icpetgreen" />
              <span className="text-sm">Light Mode</span>
            </div>
            {selectedTheme === "light" && (
              <span className="text-xs text-Icpetgreen font-medium">
                Active
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => setSelectedTheme("dark")}
            className={cn(
              "flex items-center justify-between w-full p-3 h-auto rounded-lg",
              selectedTheme === "dark"
                ? "border-2 border-Icpetgreen"
                : "border border-gray-300 hover:border-Icpetgreen/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-300" />
              <span className="text-sm">Dark Mode</span>
            </div>
            {selectedTheme === "dark" && (
              <span className="text-xs text-Icpetgreen font-medium">
                Active
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-medium mb-4">Change Password</h2>
        <label className="text-sm text-gray-500 block mb-4">
          You can change your password here
        </label>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-2">Current Password</label>
            <Input
              type="password"
              placeholder="Current Password"
              className="focus-visible:ring-Icpetgreen"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">New Password</label>
            <Input
              type="password"
              placeholder="New Password"
              className="focus-visible:ring-Icpetgreen"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="focus-visible:ring-Icpetgreen"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
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
