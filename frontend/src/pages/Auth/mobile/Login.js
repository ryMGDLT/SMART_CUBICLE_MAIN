import React from "react";
import { useAuth } from "../../../components/controller/AuthController";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
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

          <div className="text-left mb-2">
            <a href="" className="text-sm text-Icpetgreen hover:underline">
              Forgot Password?
            </a>
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
