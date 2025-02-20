import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/controller/AuthController";

const PrivateRoute = ({ roles, status, verified, children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (roles && !roles.includes(user.role)) {
      console.log("Unauthorized: Role mismatch");
      navigate("/unauthorized", { replace: true });
      return;
    }

    if (status && user.status !== status) {
      console.log("Unauthorized: Status mismatch");
      navigate("/unauthorized", { replace: true });
      return;
    }

    if (verified !== undefined && user.verified !== verified) {
      console.log("Unauthorized: Verification mismatch");
      navigate("/unauthorized", { replace: true });
      return;
    }
  }, [user, roles, status, verified, navigate]);

  return user ? children : null;
};

export default PrivateRoute;
