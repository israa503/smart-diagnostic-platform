import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import Analytics from './pages/Analytics';
import Diagnostic from './pages/Diagnostic';
import History from './pages/History';
import Settings from './pages/Settings';

import FactoryAdmin from './pages/FactoryAdmin';
import FactoryAnalytics from './pages/FactoryAnalytics';
import FactoryAI from './pages/FactoryAI';
import FactorySettings from './pages/FactorySettings';

import TechnicianProfile from './pages/TechnicianProfile';


function TechnicianRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem('isLoggedIn');

  return isLoggedIn
    ? children
    : <Navigate to="/" />;
}


function AdminRoute({ children }) {

  const isFactoryAdmin =
    localStorage.getItem(
      'isFactoryAdmin'
    );

  return isFactoryAdmin
    ? children
    : <Navigate to="/" />;
}


export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* TECHNICIAN ROUTES */}

        <Route
          path="/dashboard"
          element={
            <TechnicianRoute>
              <Dashboard />
            </TechnicianRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <TechnicianRoute>
              <AIAssistant />
            </TechnicianRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <TechnicianRoute>
              <Analytics />
            </TechnicianRoute>
          }
        />

        <Route
          path="/diagnostic"
          element={
            <TechnicianRoute>
              <Diagnostic />
            </TechnicianRoute>
          }
        />

        <Route
          path="/history"
          element={
            <TechnicianRoute>
              <History />
            </TechnicianRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <TechnicianRoute>
              <Settings />
            </TechnicianRoute>
          }
        />


        {/* FACTORY ADMIN ROUTES */}

        <Route
          path="/factory-admin"
          element={
            <AdminRoute>
              <FactoryAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/factory-analytics"
          element={
            <AdminRoute>
              <FactoryAnalytics />
            </AdminRoute>
          }
        />

        <Route
          path="/factory-ai"
          element={
            <AdminRoute>
              <FactoryAI />
            </AdminRoute>
          }
        />

        <Route
          path="/factory-settings"
          element={
            <AdminRoute>
              <FactorySettings />
            </AdminRoute>
          }
        />

        <Route
          path="/technician-profile"
          element={
            <AdminRoute>
              <TechnicianProfile />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}