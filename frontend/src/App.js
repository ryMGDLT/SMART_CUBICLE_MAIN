import "./styles/App.css";
import "./styles/Calendar.css";
import Nav from "./Components/Nav";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import PrivateRoute from "./pages/Auth/PrivateRoute";

// Context Providers
import { AuthProvider } from "./Components/Controller/AuthController";
import ViewController from "./Components/Controller/ViewController";

// Authentication Pages
import LoginDesktop from "./pages/Auth/desktop/Login";
import SignupDesktop from "./pages/Auth/desktop/Signup";
import LoginMobile from "./pages/Auth/mobile/Login";
import SignupMobile from "./pages/Auth/mobile/Signup";

// View Pages
import DashboardDesktop from "./pages/Views/desktop/Dashboard";
import UsageMonitorDesktop from "./pages/Views/desktop/UsageMonitor";
import JanitorsDesktop from "./pages/Views/desktop/Janitors";
import ResourcesDesktop from "./pages/Views/desktop/Resources";
import SettingsDesktop from "./pages/Views/desktop/Settings";
import UsersDesktop from "./pages/Views/desktop/Users";
import ProfileDesktop from "./pages/Views/desktop/Profile";
import DashboardMobile from "./pages/Views/mobile/Dashboard";
import UsageMonitorMobile from "./pages/Views/mobile/UsageMonitor";
import JanitorsMobile from "./pages/Views/mobile/Janitors";
import ResourcesMobile from "./pages/Views/mobile/Resources";
import SettingsMobile from "./pages/Views/mobile/Settings";
import UsersMobile from "./pages/Views/mobile/Users";
import ProfileMobile from "./pages/Views/mobile/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Redirect Root ("/") to Login if Not Authenticated */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<ViewController desktopComponent={LoginDesktop} mobileComponent={LoginMobile} />} />
            <Route path="/signup" element={<ViewController desktopComponent={SignupDesktop} mobileComponent={SignupMobile} />} />

            {/* Private Routes - Only Accessible After Logging In */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Nav />}>
                <Route path="dashboard" element={<ViewController desktopComponent={DashboardDesktop} mobileComponent={DashboardMobile} />} />
                <Route path="usage-monitor" element={<ViewController desktopComponent={UsageMonitorDesktop} mobileComponent={UsageMonitorMobile} />} />
                <Route path="janitors" element={<ViewController desktopComponent={JanitorsDesktop} mobileComponent={JanitorsMobile} />} />
                <Route path="resources" element={<ViewController desktopComponent={ResourcesDesktop} mobileComponent={ResourcesMobile} />} />
                <Route path="settings" element={<ViewController desktopComponent={SettingsDesktop} mobileComponent={SettingsMobile} />} />
                <Route path="users" element={<ViewController desktopComponent={UsersDesktop} mobileComponent={UsersMobile} />} />
                <Route path="user_profile" element={<ViewController desktopComponent={ProfileDesktop} mobileComponent={ProfileMobile} />} />
              </Route>
            </Route>

            {/* Catch-All Redirects Unauthenticated Users to Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
