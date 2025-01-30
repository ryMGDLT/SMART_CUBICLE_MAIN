import React from "react";
import { useAuth } from "../../Components/Controller/AuthController";

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <img
        src="/images/ICPET.png"
        alt="Background"
        className="absolute top-[-250px] left-[-470px] w-[150%] h-auto object-cover opacity-50 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#23897D] to-white opacity-90 z-10"></div>


      <div className="relative p-8 w-full max-w-md z-20">
        <div className="flex justify-center mb-2 mt-[-60px]">
          <img src="/images/ICPET.png" alt="Logo" className="w-50 h-50" />
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Email/Username</label>
            <input
              type="text"
              placeholder="Email/Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password && ( 
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              )}
            </div>
          </div>

          <div className="text-left mb-4">
            <a href="#" className="text-sm text-Icpetgreen hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-Icpetgreen text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm"><a href="#" className="text-Icpetgreen text-lg hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}
