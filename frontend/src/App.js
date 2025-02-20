import "./styles/App.css";
import "./styles/Calendar.css";
import Nav from "./components/utils/Nav";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import PrivateRoute from "./pages/auth/PrivateRoute";
import PublicRoute from "./pages/auth/PublicRoute";

// Context Providers
import { AuthProvider } from "./components/controller/AuthController";
import ViewController from "./components/controller/ViewController";

// Authentication Pages
import LoginDesktop from "./pages/auth/desktop/Login";
import SignupDesktop from "./pages/auth/desktop/Signup";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import LoginMobile from "./pages/auth/mobile/Login";
import SignupMobile from "./pages/auth/mobile/Signup";

// View Pages
import DashboardDesktop from "./pages/views/desktop/Dashboard";
import UsageMonitorDesktop from "./pages/views/desktop/UsageMonitor";
import JanitorsDesktop from "./pages/views/desktop/Janitors";
import ResourcesDesktop from "./pages/views/desktop/Resources";
import SettingsDesktop from "./pages/views/desktop/Settings";
import UsersDesktop from "./pages/views/desktop/Users";
import ProfileDesktop from "./pages/views/desktop/Profile";
import DashboardMobile from "./pages/views/mobile/Dashboard";
import UsageMonitorMobile from "./pages/views/mobile/UsageMonitor";
import JanitorsMobile from "./pages/views/mobile/Janitors";
import ResourcesMobile from "./pages/views/mobile/Resources";
import SettingsMobile from "./pages/views/mobile/Settings";
import UsersMobile from "./pages/views/mobile/Users";
import ProfileMobile from "./pages/views/mobile/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Redirect Root ("/") to Login if Not Authenticated */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Authentication Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <ViewController
                    desktopComponent={LoginDesktop}
                    mobileComponent={LoginMobile}
                  />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <ViewController
                    desktopComponent={SignupDesktop}
                    mobileComponent={SignupMobile}
                  />
                </PublicRoute>
              }
            />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            {/* Private Routes */}
            <Route
              element={
                <PrivateRoute
                  roles={["Admin", "Superadmin", "Janitor"]}
                  status="Accepted"
                  verified={true}
                >
                  <LayoutWithNav />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard"
                element={
                  <ViewController
                    desktopComponent={DashboardDesktop}
                    mobileComponent={DashboardMobile}
                  />
                }
              />
              <Route
                path="/usage-monitor"
                element={
                  <ViewController
                    desktopComponent={UsageMonitorDesktop}
                    mobileComponent={UsageMonitorMobile}
                  />
                }
              />
              <Route
                path="/janitors"
                element={
                  <ViewController
                    desktopComponent={JanitorsDesktop}
                    mobileComponent={JanitorsMobile}
                  />
                }
              />
              <Route
                path="/resources"
                element={
                  <ViewController
                    desktopComponent={ResourcesDesktop}
                    mobileComponent={ResourcesMobile}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <ViewController
                    desktopComponent={SettingsDesktop}
                    mobileComponent={SettingsMobile}
                  />
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute
                    roles={["Admin", "Superadmin"]}
                    status="Accepted"
                    verified={true}
                  >
                    <ViewController
                      desktopComponent={UsersDesktop}
                      mobileComponent={UsersMobile}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user_profile"
                element={
                  <PrivateRoute
                    roles={["Janitor", "Admin", "Superadmin"]}
                    status="Accepted"
                    verified={true}
                  >
                    <ViewController
                      desktopComponent={ProfileDesktop}
                      mobileComponent={ProfileMobile}
                    />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* Catch-All Redirects Unauthenticated Users to Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

function LayoutWithNav() {
  return (
    <div className="layout">
      <Nav />
      <div className="content"></div>
    </div>
  );
}

export default App;
