import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import {BellIcon, LogoutIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useAuth } from "./Controller/AuthController";

export default function Nav() {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth(); 


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownVisible]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-grayish text-white flex flex-col p-4 relative transition-all duration-500 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="absolute top-12 right-[-12px] p-1 bg-Icpetgreen text-white rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out shadow-lg"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRightIcon className="w-5 h-5" /> : <ChevronLeftIcon className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <div className={`flex items-center justify-center mb-10 mt-5 transition-all duration-500 ease-in-out`}>
          <img
            src="/images/ICPET.png"
            alt="Tupseal Logo"
            className={`transition-all duration-500 ease-in-out ${collapsed ? "w-12 h-12" : "w-40 h-40"}`}
          />
        </div>

        {/* Navigation */}
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
              onClick={() => setActive(item.name)}
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6 flex-shrink-0 transition-all duration-500 ease-in-out" />
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
         //onClick={() => {console.log("Logout clicked");logout();}}>
          onClick={logout}>
          <LogoutIcon className={`w-6 h-6 transition-all duration-500 ease-in-out ${collapsed ? "mr-0" : "mr-3"}`} />
          <span className={`whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>Log Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <header className="bg-fafbfe p-4 flex justify-between items-center w-full md:px-6" style={{ borderBottom: "5px solid #EFF0F1" }}>
          <span className="text-lg font-semibold"></span>

          {/* Notification*/}
          <div className="flex items-center space-x-4 ml-auto"> 
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

                  {/* Dropdown */}
                  <div
                    className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[280px] md:max-w-[410px] md:absolute md:top-full md:left-auto md:transform-none md:right-0 bg-white shadow-lg rounded-lg py-4 z-[1000] max-h-[500px] overflow-auto"
                  >
                    {/*Header */}
                    <div className="flex items-center justify-between px-4 mb-4">
                      <p className="text-xs text-Icpetgreen cursor-pointer">Clear all</p>
                      <p className="text-xs text-Icpetgreen cursor-pointer">Mark as read</p>
                    </div>

                    {/*List */}
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

                    {/*Footer */}
                    <p className="text-xs px-4 mt-6 mb-4 text-Icpetgreen cursor-pointer text-center">View all Notifications</p>
                  </div>
                </>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center">
              <Link to="/user_profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
                {/*<img className="w-8 h-8 rounded-full border object-cover transition-transform duration-300 hover:scale-110" src="/images/bongbong.jpg" alt="User Avatar" />*/}
                <img className="w-8 h-8 rounded-full border object-cover transition-transform duration-300" src="/images/bongbong.jpg" alt="User"/> 
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
