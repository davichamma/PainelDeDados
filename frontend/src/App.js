import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DynamicPowerBIReport from './DynamicPowerBIReport';
import reportConfig from './reportList';
import SideNavBar from './SideNavbar';
import AdminDashboard from './views/AdminDashboard';
import AdminLogin from './views/AdminLogin'; // Import AdminLogin page
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute component
import '@ionic/react/css/core.css';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Router>
      <div className="App">
        {/* Sidebar */}
        <SideNavBar isOpen={isOpen} />

        {/* Main Content */}
        <div className="main">
          <Routes>
            <Route path="/" element={<DynamicPowerBIReport reportUrl={reportConfig.report1} />} />
            <Route path="/report2" element={<DynamicPowerBIReport reportUrl={reportConfig.report2} />} />
            <Route path="/report3" element={<DynamicPowerBIReport reportUrl={reportConfig.report3} />} />
            <Route path="/report4" element={<DynamicPowerBIReport reportUrl={reportConfig.report4} />} />
            <Route path="/report5" element={<DynamicPowerBIReport reportUrl={reportConfig.report5} />} />
            <Route path="/report6" element={<DynamicPowerBIReport reportUrl={reportConfig.report6} />} />
            <Route path="/report7" element={<DynamicPowerBIReport reportUrl={reportConfig.report7} />} />

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} /> {/* Admin Login */}
            
            {/* Protect the Admin route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <p>2024 Elaborado por Gerência Executiva SESI. Todos os direitos reservados.</p>
          {/* Link to Admin Area */}
          <Link to="/admin-login" className="admin-link">Área Administrativa</Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;
