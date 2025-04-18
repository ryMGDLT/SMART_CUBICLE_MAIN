import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "https://smart-cubicle-backend.onrender.com",
});
console.log("Axios baseURL:", process.env.REACT_APP_BACKEND_URL);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const inactivityTimerRef = useRef(null);

  const logout = useCallback(() => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You will be logged out.",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "red",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearUserSession();
        Swal.fire({
          icon: "info",
          title: "Logged Out",
          text: "You have been successfully logged out.",
        });
        navigate("/login");
      }
    });
  }, [navigate]);

  const autoLogout = useCallback(() => {
    if (user) {
      clearUserSession();
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "You have been automatically logged out due to inactivity.",
      });
      navigate("/login");
    }
  }, [navigate, user]);

  const clearUserSession = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("activeItem");
    localStorage.removeItem("sidebarCollapsed");
    localStorage.removeItem("sidebarVisible");
  };

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    if (user) {
      inactivityTimerRef.current = setTimeout(() => {
        autoLogout();
      }, 300000); // 5 minutes
    }
  }, [autoLogout, user]);

  useEffect(() => {
    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    const handleActivity = () => resetInactivityTimer();

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    resetInactivityTimer();

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [resetInactivityTimer]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", { email, password });
      const { token, user } = response.data;

      const userData = {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        token: token,
        profileImage: user.profileImage,
        role: user.role,
        status: user.status,
        verified: user.verified,
        notificationsEnabled: user.notificationsEnabled,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      console.log("Logged-in user:", userData);

      if (user.role === "Admin" || user.role === "Superadmin") {
        navigate("/dashboard");
      } else if (user.role === "Janitor") {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const { email } = userData;

      await axiosInstance.post("/users/signup", userData);

      Swal.fire({
        title: `<strong class="text-left text-xl font-bold text-black">Confirm your Email Address</strong>`,
        html: `
          <div class="text-left text-sm text-black">
            We've sent a confirmation email to ${email}. 
            Please check your inbox (and spam/junk folder) and click the 
            link in the email to verify your email address.
            <br><br>
            If you don't receive the email within a few minutes, you can:<br>
            <button id="resend-email-btn" class="text-[#23897D] hover:underline cursor-pointer">• Resend verification email</button><br>
            <button id="edit-email-btn" class="text-[#23897D] hover:underline cursor-pointer">• Edit Email Address</button><br><br>
            Thank you for verifying your email!
            <br>
            <br>
          </div>
        `,
        icon: false,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          popup: "custom-swal-popup",
        },
        didOpen: () => {
          const resendEmailBtn = document.getElementById("resend-email-btn");
          const editEmailBtn = document.getElementById("edit-email-btn");

          if (resendEmailBtn) {
            resendEmailBtn.addEventListener("click", async () => {
              try {
                await axiosInstance.post("/users/resend-verification-email", { email });
                Swal.fire({
                  icon: "success",
                  title: "Verification Email Sent",
                  text: "A new verification email has been sent. Please check your inbox.",
                });
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: error.response?.data || "Failed to resend verification email. Please try again later.",
                });
              }
            });
          }

          if (editEmailBtn) {
            editEmailBtn.addEventListener("click", () => {
              Swal.close();
              navigate("/signup");
            });
          }
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.response?.data || "An error occurred during signup. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserSettings = async (settings) => {
    setLoading(true);
    try {
      if (!user || !user.token || !user.id) {
        throw new Error("User not authenticated");
      }
      const response = await axiosInstance.patch(`/users/${user.id}`, settings);
      const updatedUser = {
        ...user,
        ...response.data,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("User settings updated:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user settings:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }
      const response = await axiosInstance.post(`/users/${user.id}/change-password`, {
        currentPassword,
        newPassword,
      });
      console.log("Password changed successfully:", response.data);
    } catch (error) {
      console.error("Error changing password:", error.message, error.response?.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, signup, logout, loading, updateUserSettings, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};