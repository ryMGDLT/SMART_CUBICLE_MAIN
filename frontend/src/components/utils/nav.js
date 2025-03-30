import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useAuth } from "../controller/authController";
import { DEFAULT_PROFILE_IMAGE } from "../../data/placeholderData";
import { axiosInstance } from "../controller/authController";
import NotificationDropdown from "./notificationDropdown";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(() => {
    const storedActive = localStorage.getItem("activeItem");
    return location.pathname === "/user_profile"
      ? ""
      : storedActive || "Dashboard";
  });
  const [collapsed, setCollapsed] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("sidebarCollapsed")) ||
      window.innerWidth < 768
    );
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("sidebarVisible")) ||
      window.innerWidth >= 768
    );
  });
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const { logout, user } = useAuth();

  const [profileImageUrl, setProfileImageUrl] = useState(DEFAULT_PROFILE_IMAGE);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || !user.token || !user.id) return;
        const response = await axiosInstance.get(`/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfileImageUrl(response.data.profileImage || DEFAULT_PROFILE_IMAGE);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setProfileImageUrl(DEFAULT_PROFILE_IMAGE);
      }
    };
    fetchUserData();
  }, [user]);

  const fetchNotifications = async () => {
    if (
      !user ||
      !user.token ||
      (user.role !== "Admin" && user.role !== "Superadmin") ||
      !user.notificationsEnabled
    ) {
      console.log("Notifications not fetched: disabled or invalid role/user");
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    try {
      const response = await axiosInstance.get(`/notifications`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log("Fetched notifications in Nav:", data);
      setNotifications(data);
      setUnreadCount(data.filter((notif) => !notif.read).length);
    } catch (error) {
      console.error("Error fetching notifications in Nav:", error.message);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user, user?.notificationsEnabled]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(false);
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
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
    if (isDropdownVisible && window.innerWidth >= 768) { 
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownVisible]);

  useEffect(() => {
    localStorage.setItem("activeItem", active);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
    localStorage.setItem("sidebarVisible", JSON.stringify(isSidebarVisible));
  }, [active, collapsed, isSidebarVisible]);

  const ProfileClick = () => {
    setActive("");
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setCollapsed(false);
    }
    setIsSidebarVisible((prev) => !prev);
    setTimeout(() => {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 300);
    }, 0);
  };

  const handleSidebarCollapse = () => {
    setCollapsed((prev) => !prev);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleSidebarItemClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  };

  const handleBellClick = () => {
    if (window.innerWidth < 768) {
      // For mobile, toggle full-page view without navigation
      setIsDropdownVisible((prev) => !prev);
    } else {
      // For desktop, toggle dropdown
      setIsDropdownVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    if (location.pathname === "/user_profile") {
      setActive("");
    }
  }, [location.pathname]);

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: "/images/dashboard.png",
      path: "/dashboard",
      roles: ["Admin", "Superadmin", "Janitor"],
    },
    {
      name: "Usage Monitor",
      icon: "/images/desktop windows.png",
      path: "/usage-monitor",
      roles: ["Admin", "Superadmin", "Janitor"],
    },
    {
      name: "Janitors",
      icon: "/images/supervised user_circle.png",
      path: "/janitors",
      roles: ["Admin", "Superadmin", "Janitor"],
    },
    {
      name: "Resources",
      icon: "/images/add shopping_cart.png",
      path: "/resources",
      roles: ["Admin", "Superadmin", "Janitor"],
    },
    {
      name: "Settings",
      icon: "/images/settings.png",
      path: "/settings",
      roles: ["Admin", "Superadmin", "Janitor"],
    },
    {
      name: "Users",
      icon: "/images/supervisor account.png",
      path: "/users",
      roles: ["Admin", "Superadmin"],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {isSidebarVisible && window.innerWidth < 768 && (
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
        {window.innerWidth < 768 && (
          <button
            className="absolute top-4 right-4 p-1 text-white hover:text-gray-300 transition-colors duration-300"
            onClick={toggleSidebar}
          >
            <XIcon className="w-6 h-6" />
          </button>
        )}
        <button
          className={`absolute top-12 right-[-12px] p-1 bg-Icpetgreen text-white rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out shadow-lg ${
            window.innerWidth < 768 ? "hidden" : ""
          }`}
          onClick={handleSidebarCollapse}
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>
        <div
          className={`flex items-center justify-center mb-2 mt-5 transition-all duration-500 ease-in-out`}
        >
          <img
            src="/images/ICPET.png"
            alt="Tupseal Logo"
            className={`transition-all duration-500 ease-in-out ${
              collapsed ? "w-12 h-12" : "w-40 h-40"
            }`}
          />
        </div>
        <nav className="flex flex-col space-y-2">
          {sidebarItems
            .filter((item) => item.roles.includes(user?.role))
            .map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center p-3 rounded-lg transition-all duration-500 ease-in-out ${
                  active === item.name
                    ? "bg-Icpetgreen text-white"
                    : "hover:bg-Icpetgreen1"
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
        <button
          className="mt-auto flex items-center p-3 rounded-lg hover:bg-red-700 transition-all duration-500 ease-in-out transform hover:scale-105"
          onClick={logout}
        >
          <LogoutIcon
            className={`w-6 h-6 transition-all duration-500 ease-in-out ${
              collapsed ? "mr-0" : "mr-3"
            }`}
          />
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            Log Out
          </span>
        </button>
      </aside>
      <div
        className="flex-1 flex flex-col w-full transition-all duration-500 ease-in-out"
        style={{
          marginLeft:
            isSidebarVisible && window.innerWidth >= 768
              ? collapsed
                ? "5rem"
                : "16rem"
              : "0",
        }}
      >
        <header className="bg-fafbfe p-4 flex justify-between items-center w-full md:px-6 shadow-md relative z-10 mb-3">
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
            onClick={toggleSidebar}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <span className="text-lg font-semibold"></span>
          <div className="flex items-center space-x-4 ml-auto">
            <NotificationDropdown
              isDropdownVisible={isDropdownVisible}
              setIsDropdownVisible={setIsDropdownVisible}
              dropdownRef={dropdownRef}
              userRole={user?.role}
              token={user?.token}
              notifications={notifications}
              setNotifications={setNotifications}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
              setActive={setActive}
              notificationsEnabled={user?.notificationsEnabled}
              onBellClick={handleBellClick} // Pass the handler
            />
            <div className="flex items-center">
              <Link
                to="/user_profile"
                className="flex items-center space-x-2 mr-4 hover:opacity-80 transition-opacity duration-300"
                onClick={ProfileClick}
              >
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = DEFAULT_PROFILE_IMAGE;
                  }}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                />
                @{user?.username || "Guest"}
              </Link>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6 bg-Canvas flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}