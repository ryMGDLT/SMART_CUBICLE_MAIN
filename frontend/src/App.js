import "./styles/App.css";
import "./styles/Calendar.css";
import Nav from "./components/utils/nav";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import PrivateRoute from "./pages/Auth/privateRoute";
import PublicRoute from "./pages/Auth/publicRoute";

// Context Providers
import { AuthProvider } from "./components/controller/authController";
import ViewController from "./components/controller/viewController";

// Authentication Pages
import LoginDesktop from "./pages/Auth/desktop/logIn";
import SignupDesktop from "./pages/Auth/desktop/signUp";
import VerifyEmailPage from "./pages/Auth/verifyEmailPage";
import LoginMobile from "./pages/Auth/mobile/logIn";
import SignupMobile from "./pages/Auth/mobile/signup";

// View Pages
import DashboardDesktop from "./pages/Views/desktop/dashboard";
import UsageMonitorDesktop from "./pages/Views/desktop/usageMonitor";
import JanitorsDesktop from "./pages/Views/desktop/janitors";
import ResourcesDesktop from "./pages/Views/desktop/resources";
import SettingsDesktop from "./pages/Views/desktop/settings";
import UsersDesktop from "./pages/Views/desktop/users";
import ProfileDesktop from "./pages/Views/desktop/profile";
import DashboardMobile from "./pages/Views/mobile/dashboard";
import UsageMonitorMobile from "./pages/Views/mobile/usageMonitor";
import JanitorsMobile from "./pages/Views/mobile/janitor";
import ResourcesMobile from "./pages/Views/mobile/resources";
import SettingsMobile from "./pages/Views/mobile/settings";
import UsersMobile from "./pages/Views/mobile/users";
import ProfileMobile from "./pages/Views/mobile/profile";

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
