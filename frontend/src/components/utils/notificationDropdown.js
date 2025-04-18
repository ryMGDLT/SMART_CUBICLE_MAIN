import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon, UserIcon } from "@heroicons/react/solid";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

// Singleton WebSocket instance
let wsSingleton = null;

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
  const [notificationToasts, setNotificationToasts] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://smart-cubicle-backend.onrender.com"; // Updated default to production URL
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const processedIds = useRef(new Set());

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      console.log(`Screen size changed. Is mobile: ${newIsMobile}, Width: ${window.innerWidth}px`);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch initial notifications
  const fetchInitialNotifications = async () => {
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
      console.error("Error fetching initial notifications:", error.message);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === "Admin" || userRole === "Superadmin") {
      fetchInitialNotifications();
    }
  }, [userRole, notificationsEnabled, token]);

  // WebSocket setup with toast notifications
  useEffect(() => {
    if (!notificationsEnabled || (userRole !== "Admin" && userRole !== "Superadmin")) {
      setNotifications([]);
      setUnreadCount(0);
      setNotificationToasts([]);
      processedIds.current.clear();
      if (wsSingleton) {
        wsSingleton.close();
        wsSingleton = null;
      }
      return;
    }

    if (!wsSingleton) {
      console.log("Initializing WebSocket connection");
      const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://"; // Dynamic protocol
      const wsUrl = `${wsProtocol}${backendUrl.split("://")[1]}?token=${token}`;
      wsSingleton = new WebSocket(wsUrl);

      wsSingleton.onopen = () => {
        console.log("WebSocket connected");
      };

      wsSingleton.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        console.log("New notification received via WebSocket:", newNotification);

        if (processedIds.current.has(newNotification._id)) {
          console.log(`Duplicate notification skipped: ${newNotification._id}`);
          return;
        }
        processedIds.current.add(newNotification._id);

        setNotifications((prev) => {
          if (prev.some((n) => n._id === newNotification._id)) {
            console.log(`Notification ${newNotification._id} already in list, skipping update`);
            return prev;
          }
          const updatedNotifications = [newNotification, ...prev].slice(0, 10);
          setUnreadCount(updatedNotifications.filter((n) => !n.read).length);
          return updatedNotifications;
        });

        setNotificationToasts((prev) => {
          if (prev.some((t) => t.id === newNotification._id)) {
            console.log(`Toast for ${newNotification._id} already exists, skipping`);
            return prev;
          }
          const toastId = newNotification._id;
          const newToast = { id: toastId, message: newNotification.message, open: true };

          console.log(`Adding toast for notification ${toastId}`);

          setTimeout(() => {
            setNotificationToasts((current) =>
              current.map((t) => (t.id === toastId ? { ...t, open: false } : t))
            );
            setTimeout(() => {
              setNotificationToasts((current) => current.filter((t) => t.id !== toastId));
              console.log(`Toast ${toastId} removed`);
            }, 300);
          }, 2000);

          return [...prev, newToast];
        });
      };

      wsSingleton.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      wsSingleton.onclose = () => {
        console.log("WebSocket connection closed");
        wsSingleton = null;
      };
    }

    return () => {
      // Cleanup moved to component unmount only if needed
    };
  }, [notificationsEnabled, userRole, token, backendUrl]);

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
      processedIds.current.clear();
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

  // Custom Notification Toast Component
  const NotificationToast = ({ id, message, open, onOpenChange }) => (
    <ToastPrimitives.Root
      open={open}
      onOpenChange={onOpenChange}
      className={cn(
        "pointer-events-auto relative flex w-full max-w-[380px] items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
        "bg-[#23897D] text-white",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        "data-[state=open]:duration-300"
      )}
    >
      <div className="grid gap-1">
        <ToastPrimitives.Title className="text-sm font-semibold">{message}</ToastPrimitives.Title>
      </div>
      <ToastPrimitives.Close className="absolute right-1 top-1 rounded-md p-1 text-white/50 hover:text-white focus:outline-none focus:ring-1 group-hover:opacity-100">
        <X className="h-4 w-4" />
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  );

  // Notification Toast Viewport
  const NotificationToastViewport = () => (
    <ToastPrimitives.Viewport
      className={cn(
        "fixed z-[100] flex max-h-screen w-full max-w-[380px] flex-col p-4",
        isMobile
          ? "top-20 left-1/2 -translate-x-1/2 -translate-y-1/2" // Mobile
          : "bottom-10 left-60 m-5" // Desktop
      )}
    />
  );

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

  return (
    <>
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

      {/* Notification Toast Provider */}
      <ToastPrimitives.Provider>
        {notificationToasts.map(({ id, message, open }) => (
          <NotificationToast
            key={id}
            id={id}
            message={message}
            open={open}
            onOpenChange={(open) => {
              setNotificationToasts((prev) => prev.map((t) => (t.id === id ? { ...t, open } : t)));
              if (!open) {
                setTimeout(() => {
                  setNotificationToasts((prev) => prev.filter((t) => t.id !== id));
                  console.log(`Toast ${id} manually closed and removed`);
                }, 300);
              }
            }}
          />
        ))}
        <NotificationToastViewport />
      </ToastPrimitives.Provider>
    </>
  );
};

export default NotificationDropdown;