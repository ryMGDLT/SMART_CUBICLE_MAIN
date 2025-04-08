import React from "react";
import { useAuth } from "../../../components/controller/authController";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../components/controller/authController";
import Swal from "sweetalert2";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showResendLink, setShowResendLink] = React.useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username.trim().toLowerCase(), password.trim())
      .then((response) => {})
      .catch((error) => {
        if (error.response?.status === 403) {
          const errorMessage = error.response?.data;
          console.log("Error message from backend:", errorMessage);

          if (
            errorMessage ===
            "Pending approval. Please contact your employer to approve your signup request."
          ) {
            Swal.fire({
              icon: "warning",
              title: "Pending Approval",
              text: errorMessage,
            });
          } else if (
            errorMessage ===
            "Your account has been declined. Please contact support for further assistance."
          ) {
            Swal.fire({
              icon: "error",
              title: "Account Declined",
              text: errorMessage,
            });
          } else if (
            errorMessage ===
            "Email not verified. Please verify your email before logging in."
          ) {
            setShowResendLink(true);
            Swal.fire({
              icon: "warning",
              title: "Email Not Verified",
              text: errorMessage,
            });
          } else if (errorMessage === "Your account is not accepted yet.") {
            Swal.fire({
              icon: "warning",
              title: "Account Not Accepted",
              text: errorMessage,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: errorMessage || "An unexpected error occurred.",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.response?.data || "An unexpected error occurred.",
          });
        }
      });
  };

  const handleResendVerificationEmail = async () => {
    try {
      const response = await axiosInstance.post("/users/resend-verification-email", { email: username });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data || "Failed to resend verification email.",
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address to reset your password",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/users/forgot-password", {
        email: username.trim().toLowerCase(),
      });
      Swal.fire({
        icon: "success",
        title: "Reset Link Sent",
        text: "If an account exists with this email, a password reset link has been sent. Please check your inbox (and spam/junk folder).",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to send password reset email. Please try again.",
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <img
        src="/images/ICPET.png"
        alt="Background"
        className="absolute top-0 left-0 w-[200%] md:w-[150%] h-auto object-cover opacity-50 z-0 
                   md:top-[-250px] md:left-[-580px]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#23897D] to-white opacity-90 z-10"></div>

      <div className="relative p-4 md:p-8 w-full max-w-md z-20">
        <div className="flex justify-center mb-1 mt-[-30px] md:mt-[-60px]">
          <img
            src="/images/ICPET.png"
            alt="Logo"
            className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] object-contain"
          />
        </div>
        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Email/Username
            </label>
            <input
              type="text"
              placeholder="Email/Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            {showResendLink && (
              <p className="text-center mt-4 text-sm text-white">
                Didn't receive a verification email?{" "}
                <button
                  type="button"
                  onClick={handleResendVerificationEmail}
                  className="text-Icpetgreen hover:underline font-medium"
                >
                  Resend verification email
                </button>
              </p>
            )}
          </div>

          <div className="text-left mb-2">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-Icpetgreen hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-1/2 md:w-1/3 mx-auto block bg-Icpetgreen text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            <Link
              to="/signup"
              className="text-Icpetgreen text-lg hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;