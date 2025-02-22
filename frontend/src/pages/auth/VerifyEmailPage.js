import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../components/controller/authController"; 
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Extract token from query parameters
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        if (!token) {
          setMessage("Invalid verification link.");
          setLoading(false);
          setTimeout(() => navigate("/login"), 3000);
          return;
        }

        // Send token to backend for verification using axiosInstance
        const response = await axiosInstance.post("/users/verify-email", { token });

        if (response.data && response.data.message) {
          setMessage(response.data.message || "Email verified successfully");
        } else {
          setMessage("Unexpected response from server.");
        }

        setLoading(false);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setMessage(error.response?.data || "Verification failed");
        setLoading(false);
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    verifyEmail();
  }, [navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Verifying your email...</h2>
      {loading ? (
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-Icpetgreen"
          aria-label="Verifying email..."
        ></div>
      ) : (
        <p className="text-lg text-center text-gray-700">
          {message} You will be redirected to the login page shortly.
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 underline ml-2"
          >
            Click here to go now.
          </button>
        </p>
      )}
    </div>
  );
}