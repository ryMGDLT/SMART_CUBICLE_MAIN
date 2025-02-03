import React from "react";
import { useAuth } from "../../../Components/Controller/AuthController";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
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

      <div className="relative p-4 md:p-8 w-full max-w-3xl z-20 mx-6 md:mx-auto">
        <div className="flex justify-center mb-2 mt-[-30px] md:mt-[-60px]">
          <img
            src="/images/ICPET.png"
            alt="Logo"
            className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] object-contain"
          />
        </div>
        <form className="mt-2 mx-12 md:mx-18" onSubmit={handleSubmit}>
          {/* Full name and Employee ID row */}
          <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <label className="block text-white text-sm mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-white text-sm mb-2">
                Employee ID
              </label>
              <input
                type="text"
                placeholder="Employee ID"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Username and Contact Number row */}
          <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
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
            <div className="w-full md:w-1/2">
              <label className="block text-white text-sm mb-2">
                Contact Number
              </label>
              <input
                type="text"
                placeholder="+63"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password and Confirm Password row */}
          <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
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
            <div className="w-full md:w-1/2">
              <label className="block text-white text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-2">
            <Link
              to="/login"
              className="text-Icpetgreen text-lg py-2 rounded-lg hover:underline transition duration-300"
            >
              Log In
            </Link>
          </div>
        </form>

        <button
          type="submit"
          className="w-1/2 md:w-1/3 mx-auto block mt-4 bg-Icpetgreen text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
