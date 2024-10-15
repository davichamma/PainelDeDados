// src/SideNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SideNavbar.css';
import { IonIcon } from '@ionic/react'; // Import IonIcon component from Ionic React
import { analyticsOutline, peopleOutline, schoolOutline, trophyOutline, statsChartOutline, libraryOutline, pencilOutline} from 'ionicons/icons'; // Import specific icons

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
          <Link to="/report5" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={statsChartOutline} />
            </div>
            <span className="link-text">Mercado</span>
          </Link>
        </li>
        <li className="navbar-item flexbox-left">
          <Link to="/" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={analyticsOutline} /> 
            </div>
            <span className="link-text">Inteligência de mercado</span>
          </Link>
        </li>
        <li className="navbar-item flexbox-left">
          <Link to="/report7" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={pencilOutline} />
            </div>
            <span className="link-text">Escolas mercado</span>
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
        <li className="navbar-item flexbox-left">
          <Link to="/report3" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={schoolOutline} />
            </div>
            <span className="link-text">Matrículas</span>
          </Link>
        </li>
        <li className="navbar-item flexbox-left">
          <Link to="/report4" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={trophyOutline} />
            </div>
            <span className="link-text">Vendeu, Ganhou!</span>
          </Link>
        </li>
        <li className="navbar-item flexbox-left">
          <Link to="/report6" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={libraryOutline} />
            </div>
            <span className="link-text">Bibliotecas</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavbar;
