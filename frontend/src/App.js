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
import PrivateRoute from "./pages/auth/privateRoute";
import PublicRoute from "./pages/auth/publicRoute";
import { ToastProvider } from "./components/ui/toast"; 
import { Toaster } from "./components/ui/toaster"; 

// Context Providers
import { AuthProvider } from "./components/controller/authController";
import ViewController from "./components/controller/viewController";

// Authentication Pages
import LoginDesktop from "./pages/auth/desktop/login";
import SignupDesktop from "./pages/auth/desktop/signup";
import VerifyEmailPage from "./pages/auth/verifyEmailPage";
import LoginMobile from "./pages/auth/mobile/login";
import SignupMobile from "./pages/auth/mobile/signup";

// View Pages
import DashboardDesktop from "./pages/views/desktop/dashboard";
import UsageMonitorDesktop from "./pages/views/desktop/usageMonitor";
import JanitorsDesktop from "./pages/views/desktop/janitors";
import ResourcesDesktop from "./pages/views/desktop/resources";
import SettingsDesktop from "./pages/views/desktop/settings";
import UsersDesktop from "./pages/views/desktop/users";
import ProfileDesktop from "./pages/views/desktop/profile";
import DashboardMobile from "./pages/views/mobile/dashboard";
import UsageMonitorMobile from "./pages/views/mobile/usageMonitor";
import JanitorsMobile from "./pages/views/mobile/janitor";
import ResourcesMobile from "./pages/views/mobile/resources";
import SettingsMobile from "./pages/views/mobile/settings";
import UsersMobile from "./pages/views/mobile/users";
import ProfileMobile from "./pages/views/mobile/profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider> 
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
          <Toaster /> 
        </ToastProvider>
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