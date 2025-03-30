import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon, UserIcon } from "@heroicons/react/solid";

const NotificationDropdown = ({
  isDropdownVisible,
  setIsDropdownVisible,
  dropdownRef,
  userRole,
  token,
  notifications,
  setNotifications,
  unreadCount,
  setUnreadCount,
  setActive,
  notificationsEnabled,
  onBellClick,
}) => {
  const [loading, setLoading] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://192.168.5.45:5000";
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  const fetchNotifications = async () => {
    if (!notificationsEnabled) {
      console.log("Notifications disabled, skipping fetch");
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((notif) => !notif.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible && (userRole === "Admin" || userRole === "Superadmin") && notificationsEnabled) {
      fetchNotifications();
    }
  }, [isDropdownVisible, userRole, notificationsEnabled]);

  const markAsRead = async () => {
    if (!notificationsEnabled) return;
    try {
      const response = await fetch(`${backendUrl}/notifications/mark-read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to mark as read");
      setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error.message);
    }
  };

  const clearAll = async () => {
    if (!notificationsEnabled) return;
    try {
      const response = await fetch(`${backendUrl}/notifications/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to clear notifications");
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error("Error clearing notifications:", error.message);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    if (!notificationsEnabled) return;
    try {
      const notification = notifications.find((n) => n._id === notificationId);
      if (!notification) return;

      if (notification.message.includes("New User")) {
        setActive("Users");
        navigate("/users");
      
        setIsDropdownVisible(false);
      } else if (isMobile) {
      
        setIsDropdownVisible(false);
      }

      if (notification.read) return;

      const response = await fetch(`${backendUrl}/notifications/${notificationId}/toggle-read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) throw new Error("Failed to mark notification as read");

      const updatedNotifications = notifications.map((notif) =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      );
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error in markNotificationAsRead:", error.message);
    }
  };

  if (userRole !== "Admin" && userRole !== "Superadmin") {
    return (
      <div className="relative" ref={dropdownRef}>
        <BellIcon
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-300 hover:scale-110"
          onClick={onBellClick}
        />
      </div>
    );
  }

  // Full-page view for mobile
  if (isMobile && isDropdownVisible) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsDropdownVisible(false)}
          >
            Close
          </button>
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <p className="text-xs text-Icpetgreen cursor-pointer" onClick={clearAll}>
            Clear all
          </p>
          <p className="text-xs text-Icpetgreen cursor-pointer" onClick={markAsRead}>
            Mark as read
          </p>
        </div>
        <ul className="flex-1 overflow-y-auto divide-y">
          {loading ? (
            <li className="p-4 text-sm text-gray-500 text-center">Loading...</li>
          ) : notificationsEnabled ? (
            notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <li
                  key={notif._id || index}
                  className={`p-4 flex items-center cursor-pointer hover:bg-gray-300 transition-colors duration-200 ${
                    notif.read ? "bg-white" : "bg-gray-200"
                  }`}
                  onClick={() => markNotificationAsRead(notif._id)}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm text-[#333] font-semibold">{notif.message}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-sm text-gray-500 text-center">No notifications</li>
            )
          ) : (
            <li className="p-4 text-sm text-gray-500 text-center">Notifications are disabled</li>
          )}
        </ul>
      </div>
    );
  }

  // Dropdown view for desktop
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <BellIcon
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-300 hover:scale-110"
          onClick={onBellClick}
        />
        {unreadCount > 0 && notificationsEnabled && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>
      {isDropdownVisible && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[999] md:hidden"
            onClick={() => setIsDropdownVisible(false)}
          />
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[280px] md:max-w-[410px] md:absolute md:top-full md:left-auto md:transform-none md:right-0 bg-white shadow-lg rounded-lg py-4 z-[1000] max-h-[500px] overflow-auto">
            <div className="flex items-center justify-between px-4 mb-4">
              <p className="text-xs text-Icpetgreen cursor-pointer" onClick={clearAll}>
                Clear all
              </p>
              <p className="text-xs text-Icpetgreen cursor-pointer" onClick={markAsRead}>
                Mark as read
              </p>
            </div>
            <ul className="divide-y">
              {loading ? (
                <li className="p-4 text-sm text-gray-500 text-center">Loading...</li>
              ) : notificationsEnabled ? (
                notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <li
                      key={notif._id || index}
                      className={`p-4 flex items-center cursor-pointer hover:bg-gray-300 transition-colors duration-200 ${
                        notif.read ? "bg-white" : "bg-gray-200"
                      }`}
                      onClick={() => markNotificationAsRead(notif._id)}
                    >
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm text-[#333] font-semibold">{notif.message}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-sm text-gray-500 text-center">No notifications</li>
                )
              ) : (
                <li className="p-4 text-sm text-gray-500 text-center">Notifications are disabled</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;