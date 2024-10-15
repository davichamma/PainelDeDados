import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SideNavbar.css';

const SideNavbar = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get('/reports', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReports(res.data);
    };
    fetchReports();
  }, []);

  return (
    <nav className="sidenav">
      <ul className="navbar-items flexbox-col">
        {reports.map((report) => (
          <li key={report.id} className="navbar-item">
            <Link to={`/report/${report.id}`} className="navbar-item-inner">
              {report.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavbar;
