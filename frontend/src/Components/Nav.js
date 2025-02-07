import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BellIcon,
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useAuth } from "./Controller/AuthController";

// Custom hook to get window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// Custom hook to handle clicks outside an element
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

// Helper function to safely get localStorage items
const getLocalStorageItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return defaultValue;
  }
};

export default function Nav() {
  const { logout } = useAuth();
  const { width } = useWindowSize();
  const [active, setActive] = useState(getLocalStorageItem("activeItem", "Dashboard"));
  const [collapsed, setCollapsed] = useState(getLocalStorageItem("sidebarCollapsed", width < 768));
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(getLocalStorageItem("sidebarVisible", width >= 768));
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsDropdownVisible(false));

  useEffect(() => {
    localStorage.setItem("activeItem", active);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
    localStorage.setItem("sidebarVisible", JSON.stringify(isSidebarVisible));
  }, [active, collapsed, isSidebarVisible]);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleSidebarCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleSidebarItemClick = () => {
    if (width < 768) setIsSidebarVisible(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      {isSidebarVisible && width < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`bg-grayish text-white flex flex-col p-4 fixed top-0 left-0 h-full z-50 transition-all duration-500 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        } ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} sidebar-mobile`}
      >
        {/* Close Button Mobile */}
        {width < 768 && (
          <button
            className="absolute top-4 right-4 p-1 text-white hover:text-gray-300 transition-colors duration-300"
            onClick={toggleSidebar}
          >
            <XIcon className="w-6 h-6" />
          </button>
        )}

        {/* Collapse Expand Button Web */}
        <button
          className={`absolute top-12 right-[-12px] p-1 bg-Icpetgreen text-white rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out shadow-lg ${
            width < 768 ? "hidden" : ""
          }`}
          onClick={handleSidebarCollapse}
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>

        {/* Logo */}
        <div className={`flex items-center justify-center mb-2 mt-5 transition-all duration-500 ease-in-out`}>
          <img
            src="/images/ICPET.png"
            alt="Tupseal Logo"
            className={`transition-all duration-500 ease-in-out ${
              collapsed ? "w-12 h-12" : "w-40 h-40"
            }`}
          />
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col space-y-2">
          {[
            { name: "Dashboard", icon: "/images/dashboard.png", path: "/dashboard" },
            { name: "Usage Monitor", icon: "/images/desktop windows.png", path: "/usage-monitor" },
            { name: "Janitors", icon: "/images/supervised user_circle.png", path: "/janitors" },
            { name: "Resources", icon: "/images/add shopping_cart.png", path: "/resources" },
            { name: "Settings", icon: "/images/settings.png", path: "/settings" },
            { name: "Users", icon: "/images/supervisor account.png", path: "/users" },
          ].map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center p-3 rounded-lg transition-all duration-500 ease-in-out ${
                active === item.name ? "bg-Icpetgreen text-white" : "hover:bg-Icpetgreen1"
              } hover:scale-105 ${collapsed ? "justify-start" : ""}`}
              onClick={() => {
                setActive(item.name);
                handleSidebarItemClick();
              }}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-6 h-6 flex-shrink-0 transition-all duration-500 ease-in-out"
              />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out ${
                  collapsed ? "opacity-0 w-0" : "opacity-100 w-auto ml-3"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          className="mt-auto flex items-center p-3 rounded-lg hover:bg-red-700 transition-all duration-500 ease-in-out transform hover:scale-105"
          onClick={logout}
        >
          <LogoutIcon className={`w-6 h-6 transition-all duration-500 ease-in-out ${collapsed ? "mr-0" : "mr-3"}`} />
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            Log Out
          </span>
        </button>
      </aside>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col w-full transition-all duration-500 ease-in-out"
        style={{
          marginLeft: isSidebarVisible && width >= 768 ? (collapsed ? "5rem" : "16rem") : "0",
        }}
      >
        {/* Navbar */}
        <header className="bg-fafbfe p-4 flex justify-between items-center w-full md:px-6 shadow-md relative z-10 mb-3">
          {/* Menu Mobile */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
            onClick={toggleSidebar}
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          <span className="text-lg font-semibold"></span>

          {/* Notification and Profile */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Notification Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <BellIcon
                className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-300 hover:scale-110"
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              />
              {isDropdownVisible && (
                <>
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[999] md:hidden"
                    onClick={() => setIsDropdownVisible(false)}
                  />
                  <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[280px] md:max-w-[410px] md:absolute md:top-full md:left-auto md:transform-none md:right-0 bg-white shadow-lg rounded-lg py-4 z-[1000] max-h-[500px] overflow-auto">
                    <div className="flex items-center justify-between px-4 mb-4">
                      <p className="text-xs text-Icpetgreen cursor-pointer">Clear all</p>
                      <p className="text-xs text-Icpetgreen cursor-pointer">Mark as read</p>
                    </div>
                    <ul className="divide-y">
                      {["Yin", "Haper", "San", "Seeba"].map((name, index) => (
                        <li key={index} className="p-4 flex items-center hover:bg-gray-50 cursor-pointer">
                          <img
                            src={`https://readymadeui.com/team-${index + 2}.webp`}
                            alt={`${name}'s Avatar`}
                            className="w-10 h-10 rounded-full shrink-0"
                          />
                          <div className="ml-4 flex flex-col">
                            <h3 className="text-sm text-[#333] font-semibold">New message from {name}</h3>
                            <p className="text-xs text-gray-500 mt-1">Check this new item from the motion school.</p>
                            <p className="text-xs text-Icpetgreen mt-1">{index * 10} min ago</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs px-4 mt-6 mb-4 text-Icpetgreen cursor-pointer text-center">
                      View all Notifications
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center">
              <Link
                to="/user_profile"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
                onClick={handleSidebarItemClick}
              >
                <img
                  className="w-8 h-8 rounded-full border object-cover transition-transform duration-300"
                  src="/images/bongbong.jpg"
                  alt="User"
                />
                <span className="ml-2 mr-8 font-medium hidden sm:block">@BongBongBOBO</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-6 bg-Canvas flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}