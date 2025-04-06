import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom"; 
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { axiosInstance } from "../../../components/controller/authController";
import Swal from "sweetalert2";

export default function ResetPasswordDesktop() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "No reset token provided. Please request a new password reset link.",
      }).then(() => navigate("/login"));
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/users/reset-password", {
        token,
        newPassword: password,
      });

      Swal.fire({
        icon: "success",
        title: "Password Reset",
        text: response.data.message,
      }).then(() => navigate("/login"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to reset password. The link may have expired or is invalid.",
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <img
        src="/images/ICPET.png"
        alt="Background"
        className="absolute top-[-250px] left-[-580px] w-[150%] h-auto object-cover opacity-50 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#23897D] to-white opacity-90 z-10"></div>

      <div className="relative p-8 w-full max-w-md z-20">
        <div className="flex justify-center mb-1 mt-[-60px]">
          <img
            src="/images/ICPET.png"
            alt="Logo"
            className="w-[250px] h-[250px] object-contain"
          />
        </div>
        <form className="mt-2" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-Icpetgreen mb-6 text-center">
            Reset Your Password
          </h2>

          <div className="mb-4">
            <label className="block font-bold text-Icpetgreen text-sm mb-2">
              New Password:
            </label>
            <Input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-Icpetgreen text-sm mb-2">
              Confirm Password:
            </label>
            <Input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-1/2 mx-auto block"
            variant="default"
          >
            Reset Password
          </Button>
        </form>

        <div className="text-center mt-4">
          <Button variant="link" className="w-1/2 mx-auto block">
            <Link to="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}