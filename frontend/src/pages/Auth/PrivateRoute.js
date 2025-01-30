import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Components/Controller/AuthController";

export default function PrivateRoute() {
  const { user } = useAuth(); 

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
