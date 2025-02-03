import "./styles/App.css";
import Nav from "./Components/Nav";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Controller/AuthController";
import PrivateRoute from "./pages/Auth/PrivateRoute";

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


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
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
