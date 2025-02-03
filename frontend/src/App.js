import "./styles/App.css";
import Nav from "./Components/Nav";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Controller/AuthController";
import PrivateRoute from "./pages/Auth/PrivateRoute";
<<<<<<< HEAD

// Responsive Views
// Auth
import ResponsiveLogin from "./pages/Auth/ResponsiveLogin";
import ResponsiveSignup from "./pages/Auth/ResponsiveSignup";

// Views
// Note: Not implemented yet due to no available Figma designs
import DashboardDesktop from "./pages/Views/desktop/Dashboard";
import UsageMonitorDesktop from "./pages/Views/desktop/UsageMonitor";
import JanitorsDesktop from "./pages/Views/desktop/Janitors";
import ResourcesDesktop from "./pages/Views/desktop/Resources";
import SettingsDesktop from "./pages/Views/desktop/Settings";
import UsersDesktop from "./pages/Views/desktop/Users";
import ProfileDesktop from "./pages/Views/desktop/Profile";


=======
import Dashboard from "./pages/Views/Dashboard";
import UsageMonitor from "./pages/Views/UsageMonitor";
import Janitors from "./pages/Views/Janitors";
import Resources from "./pages/Views/Resources";
import Settings from "./pages/Views/Settings";
import Users from "./pages/Views/Users";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Views/Profile";
import Signup from "./pages/Auth/Signup";
>>>>>>> main
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
<<<<<<< HEAD
            <Route path="/login" element={<ResponsiveLogin />} />
            <Route path="/signup" element={<ResponsiveSignup />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Nav />}>
                <Route path="dashboard" element={<DashboardDesktop />} />
                <Route path="usage-monitor" element={<UsageMonitorDesktop />} />
                <Route path="janitors" element={<JanitorsDesktop />} />
                <Route path="resources" element={<ResourcesDesktop />} />
                <Route path="settings" element={<SettingsDesktop />} />
                <Route path="users" element={<UsersDesktop />} />
                <Route path="user_profile" element={<ProfileDesktop />} />
=======
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Nav />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="usage-monitor" element={<UsageMonitor />} />
                <Route path="janitors" element={<Janitors />} />
                <Route path="resources" element={<Resources />} />
                <Route path="settings" element={<Settings />} />
                <Route path="users" element={<Users />} />
                <Route path="user_profile" element={<Profile />} />
>>>>>>> main
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
