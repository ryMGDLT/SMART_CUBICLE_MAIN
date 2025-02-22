import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/controller/authController";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return !user ? children : null;
};

export default PublicRoute;
