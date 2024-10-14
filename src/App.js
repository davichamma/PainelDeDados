import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicPowerBIReport from './DynamicPowerBIReport';
import reportConfig from './reportList';
import SideNavBar from './SideNavbar';
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
          </Routes>
        </div>
         {/* Footer */}
         <footer className="app-footer">
          <p>2024 Elaborado por Gerência Executiva SESI. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
