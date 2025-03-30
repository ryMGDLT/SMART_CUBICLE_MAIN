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
    <div className="h-full shadow-md bg-white rounded-lg p-4">
      <div className="w-full mx-auto shadow-md bg-white rounded-lg p-6">
        <h2 className="text-2xl font-medium">Notification</h2>
        <label className="text-sm text-gray-500">
          You can customize your notification settings
        </label>
        <div className="flex flex-row gap-4 mt-4 items-center">
          <label className="text-md">Status</label>
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

      <div className="w-full mx-auto mt-4 shadow-md bg-white rounded-lg p-6 pb-4">
        <h2 className="text-2xl font-medium">Change Password</h2>
        <label className="text-sm text-gray-500">
          You can change your password here
        </label>
        <form onSubmit={handlePasswordChange}>
          <div className="flex flex-row gap-6 mb-6 mt-4">
            <div className="flex flex-col flex-1">
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
            <div className="flex flex-col flex-1">
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
            <div className="flex flex-col flex-1">
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
            <p className="text-sm text-red-500 mb-4">{passwordError}</p>
          )}
          <div className="flex justify-end">
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