import React from "react";
import { useAuth } from "../../../Components/Controller/AuthController";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [additionalField, setAdditionalField] = React.useState("");
  //const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  //const togglePassword = () => {
  //setShowPassword((prevState) => !prevState);
  //};

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
          {/*full name*/}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/*Employee ID*/}
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">
                Employee ID
              </label>
              <input
                type="text"
                placeholder="Employee ID"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                value={additionalField}
                onChange={(e) => setAdditionalField(e.target.value)}
              />
            </div>
          </div>
          {/*username*/}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
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
            {/*number*/}
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">
                Contact Number
              </label>
              <input
                type="text"
                placeholder="+63"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
                value={additionalField}
                onChange={(e) => setAdditionalField(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4 flex space-x-4">
            {/*Password*/}
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  //type={showPassword ? "text" : "password"}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
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
                )} */}
              </div>
            </div>
            {/*confirm password*/}
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  //type={showPassword ? "text" : "password"}
                  type="password"
                  name="Confirm Password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none"
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
                )} */}
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm">
              <Link
                to="/login"
                className="text-Icpetgreen text-lg py-2 rounded-lg hover:underline transition duration-300"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>

        <button
          type="submit"
          className="text-white w-1/2 mx-auto block mt-4 bg-Icpetgreen py-2 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
