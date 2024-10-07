// src/SideNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SideNavbar.css';
import { IonIcon } from '@ionic/react'; // Import IonIcon component from Ionic React
import { analyticsOutline, peopleOutline } from 'ionicons/icons'; // Import specific icons

const SideNavbar = ({ isOpen }) => {
  return (
    <nav id="navbar" className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
      <ul className="navbar-items flexbox-col">
        {/* Navbar Logo */}
        <li className="navbar-logo flexbox-left">
          <img src={`${process.env.PUBLIC_URL}/sesiLogo.png`} alt="SESI Logo" className="navbar-logo-img" />
        </li>
        {/* Navbar Links */}
        <li className="navbar-item flexbox-left">
          <Link to="/" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={analyticsOutline} /> 
            </div>
            <span className="link-text">Inteligência de mercado</span>
          </Link>
        </li>
        <li className="navbar-item flexbox-left">
          <Link to="/report2" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={peopleOutline} />
            </div>
            <span className="link-text">Capital Humano</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavbar;
