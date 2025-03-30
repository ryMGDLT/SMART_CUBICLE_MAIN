import React, { useState, useEffect } from "react";
import { Switch } from "../../../components/ui/switch";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";
import { cn } from "../../../lib/utils";
import { useAuth } from "../../../components/controller/authController";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const { user, updateUserSettings, changePassword } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      console.log("User data loaded:", user);
      setNotificationsEnabled(user.notificationsEnabled !== false);
    } else {
      console.log("No user data available");
    }
  }, [user]);

  const handleNotificationToggle = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    setErrorMessage("");
    try {
      console.log("Attempting to update notificationsEnabled to:", newValue);
      await updateUserSettings({ notificationsEnabled: newValue });
      console.log("Notification preference successfully updated to:", newValue);
      toast({
        title: "Success",
        description: `Notifications ${newValue ? "enabled" : "disabled"} successfully!`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating notification preference:", error.message, error.response?.data);
      setNotificationsEnabled(!newValue);
      setErrorMessage(
        error.response?.data?.message || "Failed to update notification settings. Please try again."
      );
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast({
        title: "Success",
        description: "Password changed successfully!",
        variant: "default",
      });
    } catch (error) {
      setPasswordError(
        error.response?.data || "Failed to change password. Please try again."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

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
            <Switch
              id="notification-status"
              checked={notificationsEnabled}
              onCheckedChange={handleNotificationToggle}
              disabled={!user}
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
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
        <form onSubmit={handlePasswordChange}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="mb-2">Current Password</label>
              <Input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                className="focus-visible:ring-Icpetgreen"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">New Password</label>
              <Input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                className="focus-visible:ring-Icpetgreen"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                className="focus-visible:ring-Icpetgreen"
              />
            </div>
          </div>
          {passwordError && (
            <p className="text-sm text-red-500 mt-4">{passwordError}</p>
          )}
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              variant="default"
              className="bg-Icpetgreen hover:bg-Icpetgreen/90 px-16"
              disabled={!user}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}