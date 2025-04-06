import React from "react";
import { useAuth } from "../../../components/controller/authController";
import { Link } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";

export default function SignUpPage() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { signup } = useAuth();

  // Validate Email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const isStrongPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Validate employeeId format TUPM-XXX-XXXX
  const isValidEmployeeId = (employeeId) => {
    const employeeIdRegex = /^TUPM-\d{2}-\d{4}$/;
    return employeeIdRegex.test(employeeId);
  };

  // Handle Employee ID input
  const handleEmployeeIdChange = (e) => {
    const value = e.target.value;
    setEmployeeId(value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Trim whitespace from both password fields
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Validate fullName
    if (!fullName || !fullName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Full Name",
        text: "Full Name is required!",
      });
      setLoading(false);
      return;
    }
    const nameParts = fullName.trim().split(/\s+/);
    if (nameParts.length < 2) {
      Swal.fire({
        icon: "error",
        title: "Invalid Full Name",
        text: "Please enter both your First Name and Last Name separated by a space (e.g., John Doe)!",
      });
      setLoading(false);
      return;
    }

    // Validate employeeId
    if (!employeeId || employeeId === "TUPM-" || employeeId === "") {
      Swal.fire({
        icon: "error",
        title: "Invalid Employee ID",
        text: "Employee ID is required!",
      });
      setLoading(false);
      return;
    }
    if (!isValidEmployeeId(employeeId)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Employee ID",
        text: "Employee ID must follow the format TUPM-XX-XXXX (e.g., TUPM-21-4567)!",
      });
      setLoading(false);
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
      });
      setLoading(false);
      return;
    }

    // Validate passwords
    if (trimmedPassword !== trimmedConfirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
      });
      setLoading(false);
      return;
    }
    if (!isStrongPassword(trimmedPassword)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters!",
      });
      setLoading(false);
      return;
    }

    // Validate contactNumber
    if (!contactNumber || !contactNumber.trim()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Contact Number",
        text: "Contact Number is required!",
      });
      setLoading(false);
      return;
    }

    // Create the user data object
    const userData = {
      fullName,
      password: trimmedPassword,
      confirmPassword: trimmedConfirmPassword,
      employeeId,
      contactNumber,
      email,
      role: "User",
    };

    try {
      console.log("Submitting userData:", userData);
      await signup(userData);
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: "An error occurred during signup. Please try again later.",
      });
    } finally {
      setLoading(false);
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

      <div className="relative p-8 w-full max-w-3xl z-20">
        <div className="flex justify-center mb-2 mt-[-60px]">
          <img
            src="/images/ICPET.png"
            alt="Logo"
            className="w-[250px] h-[250px] object-contain"
          />
        </div>
        <form className="mt-2" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block font-bold text-Icpetgreen text-sm mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Firstname Lastname"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* Employee ID with Masking */}
            <div className="w-1/2">
              <label className="block font-bold text-Icpetgreen text-sm mb-2">
                Employee ID
              </label>
              <InputMask
                mask="TUPM-99-9999"
                value={employeeId}
                onChange={handleEmployeeIdChange}
                placeholder="TUPM-XX-XXXX"
                maskChar="_"
                alwaysShowMask={true}
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                    required
                  />
                )}
              </InputMask>
            </div>
          </div>
          {/* Email */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block font-bold text-Icpetgreen text-sm mb-2">
                Email
              </label>
              <Input
                type="text"
                placeholder="email@email.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Contact Number */}
            <div className="w-1/2">
              <label className="block font-bold text-Icpetgreen text-sm mb-2">
                Contact Number
              </label>
              <Input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                value={contactNumber}
                placeholder="+63-9xx-xxx-xxxx"
                onChange={(e) => {
                  let value = e.target.value;

                  // Remove all non-digits
                  value = value.replace(/\D/g, "");

                  // Remove the "+63" prefix for processing
                  if (value.startsWith("63")) {
                    value = value.substring(2);
                  }

                  // Remove leading zero if it exists
                  if (value.startsWith("0")) {
                    value = value.substring(1);
                  }

                  // Ensure the number starts with "9"
                  if (value.length > 0 && value[0] !== "9") {
                    Swal.fire({
                      icon: "error",
                      title: "Invalid Contact Number",
                      text: "Contact number must start with 9!",
                    });
                    return;
                  }

                  // Limit the input to 10 digits
                  if (value.length > 10) {
                    value = value.substring(0, 10);
                  }

                  let formattedNumber = "+63 ";
                  if (value.length > 0) {
                    if (value.length <= 3) {
                      formattedNumber += value;
                    } else if (value.length <= 6) {
                      formattedNumber += value.replace(
                        /(\d{3})(\d{0,3})/,
                        "$1-$2"
                      );
                    } else {
                      formattedNumber += value.replace(
                        /(\d{3})(\d{3})(\d{0,4})/,
                        "$1-$2-$3"
                      );
                    }
                  }

                  setContactNumber(formattedNumber);
                }}
                maxLength="17"
              />
            </div>
          </div>

          <div className="mb-4 flex space-x-4">
            {/* Password */}
            <div className="w-1/2">
              <div className="relative">
                <label className="block font-bold text-Icpetgreen text-sm mb-2">
                  Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-10 text-sm text-Icpetgreen hover:underline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* Confirm Password */}
            <div className="w-1/2">
              <div className="relative">
                <label className="block font-bold text-Icpetgreen text-sm mb-2">
                  Confirm Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-10 text-sm text-Icpetgreen hover:underline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <Button
              type="submit"
              variant="link"
              className="w-1/2 mx-auto block mt-4"
            >
              <Link to="/login">Log In</Link>
            </Button>
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-1/4 mx-auto block mt-4"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
}