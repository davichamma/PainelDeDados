import React, { useEffect, useCallback, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import DynamicPowerBIReport from './DynamicPowerBIReport';
import reportConfig from './reportList';
import SideNavBar from './SideNavbar';
import AdminDashboard from './views/AdminDashboard';
import AdminLogin from './views/AdminLogin';
import Login from './views/Login';
import { useMsal } from '@azure/msal-react';
import '@ionic/react/css/core.css';

function App() {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0; // Azure AD Authentication
  const isAdminAuthenticated = localStorage.getItem('isAuthenticatedAdmin') === 'true'; // Admin Authentication
  const [isUserRegistered, setIsUserRegistered] = useState(false); // Start with false

  // Assume that Login.js sets the local storage after registration or login
  useEffect(() => {
    // Fetch the registration status from local storage if user is authenticated
    if (isAuthenticated) {
      const userStatus = localStorage.getItem('isUserRegistered') === 'true';
      setIsUserRegistered(userStatus);
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="App">
        {/* If the user is not authenticated, show the login page */}
        {isAuthenticated && isUserRegistered ? (
          <>
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<Navigate to="/report1" />} />

              {/* Admin Login Route */}
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* Admin Dashboard Protected Route */}
              <Route
                path="/admin"
                element={
                  isAdminAuthenticated ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/admin-login" /> // Redirect to admin login if not authenticated
                  )
                }
              />

              {/* Report Routes (Protected by isAuthenticated) */}
              <Route path="/report1" element={<DynamicPowerBIReport reportUrl={reportConfig.report1} />} />
              <Route path="/report2" element={<DynamicPowerBIReport reportUrl={reportConfig.report2} />} />
              <Route path="/report3" element={<DynamicPowerBIReport reportUrl={reportConfig.report3} />} />
              <Route path="/report4" element={<DynamicPowerBIReport reportUrl={reportConfig.report4} />} />
              <Route path="/report5" element={<DynamicPowerBIReport reportUrl={reportConfig.report5} />} />
              <Route path="/report6" element={<DynamicPowerBIReport reportUrl={reportConfig.report6} />} />
              <Route path="/report7" element={<DynamicPowerBIReport reportUrl={reportConfig.report7} />} />

              {/* Catch-All Route */}
              <Route path="*" element={<Navigate to="/report1" />} />
            </Routes>

            {/* If user is authenticated and registered, show the sidebar and footer */}
            <SideNavBar isOpen={true} />
            <footer className="app-footer">
              <p>2024 Elaborado por Gerência Executiva SESI. Todos os direitos reservados.</p>
              <Link to="/admin-login" className="admin-link">Área Administrativa</Link>
            </footer>
          </>
        ) : (
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login if not authenticated */}
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
