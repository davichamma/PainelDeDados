import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonIcon } from '@ionic/react'; // Importing Ionicons
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'; // Importing arrow icons
import * as allIcons from 'ionicons/icons'; // Importing all icons
import '../styles/AdminDashboard.css'; // Assuming you have a CSS file for styling

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({ title: '', url: '', icon: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const iconsPerPage = 9; // 3x3 grid, so we display 9 icons at once

  const iconKeys = Object.keys(allIcons); // List of all icon keys
  const totalPages = Math.ceil(iconKeys.length / iconsPerPage); // Total number of pages

  const handleChange = (e) => {
    setNewReport({ ...newReport, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axios.post('/admin/reports', newReport);
    alert('Report created successfully');
    fetchReports(); // Fetch updated reports
  };

  const fetchReports = async () => {
    const res = await axios.get('/reports');
    setReports(res.data);
  };

  const handleIconSelect = (iconName) => {
    setNewReport({ ...newReport, icon: iconName });
    setDropdownOpen(false); // Close dropdown after selecting
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Get the icons to display on the current page
  const displayedIcons = iconKeys.slice(
    (currentPage - 1) * iconsPerPage,
    currentPage * iconsPerPage
  );

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Form for creating/updating reports */}
      <div>
        <input
          type="text"
          name="title"
          placeholder="Report Title"
          value={newReport.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          placeholder="Report URL"
          value={newReport.url}
          onChange={handleChange}
        />

        {/* Custom Dropdown for Icon Selection */}
        <div className="custom-dropdown">
          <button
            type="button"
            className="dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {newReport.icon ? (
              <IonIcon icon={allIcons[newReport.icon]} />
            ) : (
              'Select Icon'
            )}
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="icon-grid">
                {displayedIcons.map((iconKey) => (
                  <div
                    key={iconKey}
                    className="icon-grid-item"
                    onClick={() => handleIconSelect(iconKey)}
                  >
                    <IonIcon icon={allIcons[iconKey]} />
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="pagination-controls">
                <button
                  className="pagination-button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <IonIcon icon={chevronBackOutline} />
                </button>
                <button
                  className="pagination-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <IonIcon icon={chevronForwardOutline} />
                </button>
              </div>
            </div>
          )}
        </div>

        <button onClick={handleSave}>Save Report</button>
      </div>

      {/* List of Existing Reports */}
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <IonIcon icon={allIcons[report.icon]} /> {/* Dynamic Icon */}
            {report.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
