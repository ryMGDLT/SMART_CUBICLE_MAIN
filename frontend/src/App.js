import './styles/App.css';
import Nav from './Components/Nav';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Controller/AuthController";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Dashboard from './pages/Views/Dashboard';
import UsageMonitor from './pages/Views/UsageMonitor';
import Janitors from './pages/Views/Janitors';
import Resources from './pages/Views/Resources';
import Settings from './pages/Views/Settings';
import Users from './pages/Views/Users';
import Login from './pages/Auth/Login';
import Profile from './pages/Views/Profile';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <div className='App'>
          <Routes>
            <Route path="/login" element={<Login/>} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Nav />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="usage-monitor" element={<UsageMonitor />} />
                <Route path="janitors" element={<Janitors />} />
                <Route path="resources" element={<Resources />} />
                <Route path="settings" element={<Settings />} />
                <Route path="users" element={<Users />} />
                <Route path="user_profile" element={<Profile/>}/>
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
