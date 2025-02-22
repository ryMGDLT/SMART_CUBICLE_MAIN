import React from "react";
import { useAuth } from "../../../components/controller/authController";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { axiosInstance } from "../../../components/controller/authController";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  //const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showResendLink, setShowResendLink] = React.useState("");
  //const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email.trim().toLowerCase(), password.trim())
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
  // const togglePassword = () => {
  // setShowPassword((prevState) => !prevState);
  //};
  const handleResendVerificationEmail = async () => {
    try {
      const response = await axiosInstance.post(
        "/users/resend-verification-email",
        { email }
      );
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
          <div className="mb-4">
            <label className="block font-bold text-Icpetgreen text-sm mb-2">
              Email:
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-Icpetgreen text-sm mb-2">
              Password:
            </label>
            <div className="relative">
              <Input
                id="password"
                //type={showPassword ? "text" : "password"}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* {password && ( 
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              )}*/}
            </div>
          </div>
          <div>
            {showResendLink && (
              <p className="text-center mt-4 text-sm text-white">
                Didn't receive a verification email?{" "}
                <button
                  onClick={handleResendVerificationEmail}
                  className="text-Icpetgreen hover:underline font-medium"
                >
                  Resend verification email
                </button>
              </p>
            )}
          </div>
          <div className="text-left mb-2">
            <a href="" className="text-sm text-Icpetgreen hover:underline">
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-1/2 mx-auto block"
            variant="default"
          >
            Log In
          </Button>
        </form>

        <div className="text-center mt-4">
          <Button variant="link" className="w-1/2 mx-auto block">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
