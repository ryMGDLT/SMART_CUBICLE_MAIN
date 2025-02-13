import React from "react";
import { useAuth } from "../../../components/controller/AuthController";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  // const togglePassword = () => {
  // setShowPassword((prevState) => !prevState);
  //};

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
              type="text"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
