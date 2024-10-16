import React, { useEffect, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import DynamicPowerBIReport from './DynamicPowerBIReport';
import reportConfig from './reportList';
import SideNavBar from './SideNavbar';
import AdminDashboard from './views/AdminDashboard';
import AdminLogin from './views/AdminLogin';
import Login from './views/Login'; 
import { useMsal } from '@azure/msal-react'; 
import { loginRequest } from './authConfig';
import '@ionic/react/css/core.css';

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0; // Azure AD Authentication
  const isAdminAuthenticated = localStorage.getItem('isAuthenticatedAdmin') === 'true'; // Admin Authentication

  const getAccessToken = useCallback(async () => {
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      return response.accessToken; // Use this token when needed
    } catch (error) {
      console.error('Silent token acquisition failed, trying popup...', error);
      try {
        const response = await instance.acquireTokenPopup({
          ...loginRequest,
          account: accounts[0],
        });
        return response.accessToken; // Use this token when needed
      } catch (popupError) {
        console.error('Popup token acquisition failed:', popupError);
        return null;
      }
    }
  }, [instance, accounts]);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch the token when the user is authenticated
      getAccessToken().then((token) => {
        if (token) {
          console.log('Token fetched successfully');
        }
      });
    }
  }, [isAuthenticated, getAccessToken]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/report1" /> : <Navigate to="/login" />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} /> 

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
          <Route path="/report1" element={isAuthenticated ? <DynamicPowerBIReport reportUrl={reportConfig.report1} /> : <Navigate to="/login" />} />
          <Route path="/report2" element={isAuthenticated ? <DynamicPowerBIReport reportUrl={reportConfig.report2} /> : <Navigate to="/login" />} />
          <Route path="/report3" element={isAuthenticated ? <DynamicPowerBIReport reportUrl={reportConfig.report3} /> : <Navigate to="/login" />} />
          <Route path="/report4" element={isAuthenticated ? <DynamicPowerBIReport reportUrl={reportConfig.report4} /> : <Navigate to="/login" />} />
          <Route path="/report5" element={isAuthenticated ? <DynamicPowerBIReport reportUrl={reportConfig.report5} /> : <Navigate to="/login" />} />
          <Route path="/report6" element={isAuthenticated ? <DynamicPowerBIReport reportUrl={reportConfig.report6} /> : <Navigate to="/login" />} />
          <Route path="/report7" element={isAuthenticated ? <DynamicPowerBIReport reportUrl={reportConfig.report7} /> : <Navigate to="/login" />} />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* If user is authenticated, show the sidebar and footer */}
        {isAuthenticated && (
          <>
            <SideNavBar isOpen={true} />
            <footer className="app-footer">
              <p>2024 Elaborado por Gerência Executiva SESI. Todos os direitos reservados.</p>
              <Link to="/admin-login" className="admin-link">Área Administrativa</Link>
            </footer>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
