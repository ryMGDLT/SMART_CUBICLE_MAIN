import React from "react";
import { useAuth } from "../../../components/controller/AuthController";
import { Link } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function LoginPage() {
  const [fullname, setFullname] = React.useState("");
  const [employeeid, setEmployeeid] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
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
              <label className="block font-bold text-Icpetgreen text-sm mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Nathan Drake"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                value={fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            {/*Employee ID*/}
            <div className="w-1/2">
              <label className="block font-bold text-Icpetgreen text-sm mb-2">
                Employee ID
              </label>
              <Input
                type="text"
                placeholder="TUPM-21-XXXX"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                value={employeeid}
                required
                onChange={(e) => setEmployeeid(e.target.value)}
              />
            </div>
          </div>
          {/*username*/}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block font-bold text-Icpetgreen text-sm mb-2">
                Email
              </label>
              <Input
                type="text"
                placeholder="nathandrake@mail.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/*number*/}
            <div className="w-1/2">
              <label className="block font-bold text-Icpetgreen text-sm mb-2">
                Contact Number
              </label>
              <Input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="+63 XXX-XXX-XXXX"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                value={phoneNum}
                onChange={(e) => {
                  let value = e.target.value;

                  // Remove the prefix if it exists
                  if (value.startsWith("+63 ")) {
                    value = value.substring(4);
                  }

                  // Remove all non-digits
                  value = value.replace(/\D/g, "");

                  // Handle empty/backspace case
                  if (!value || value.length === 0) {
                    setPhoneNum("");
                    return;
                  }

                  // Format the number
                  if (value.length <= 10) {
                    const formattedNumber = value
                      .substring(0, 10)
                      .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
                    setPhoneNum("+63 " + formattedNumber);
                  }
                }}
                maxLength="17"
                required
              />
            </div>
          </div>

          <div className="mb-4 flex space-x-4">
            {/*Password*/}
            <div className="w-1/2">
              <div className="relative">
                <label className="block font-bold text-Icpetgreen text-sm mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
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
              <div className="relative">
                <label className="block font-bold text-Icpetgreen text-sm mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-Icpetgreen focus:outline-none bg-white  "
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Button
              type="submit"
              variant="link"
              className="w-1/2 mx-auto block mt-4"
            >
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </form>

        <Button
          type="submit"
          variant="default"
          className="w-1/4 mx-auto block mt-4"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
