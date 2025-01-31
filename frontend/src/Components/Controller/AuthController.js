import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (username, password) => {
  
    if (username === "bongbong" && password === "P@ssw0rd") {
      setUser({ username });
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};