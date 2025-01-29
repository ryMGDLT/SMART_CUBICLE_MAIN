
import './App.css';
import Nav from './Nav';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UsageMonitor from './pages/UsageMonitor';
import Janitors from './pages/Janitors';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import Users from './pages/Users';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
        {/* Parent Route (Layout) */}
        <Route path="/" element={<Nav />}>
          {/* Child Routes (Rendered in Outlet) */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usage-monitor" element={<UsageMonitor />} />
          <Route path="janitors" element={<Janitors />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
