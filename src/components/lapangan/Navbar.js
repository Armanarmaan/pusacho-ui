import '../../styles/lapangan/Navbar.scss';
import $ from "jquery";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({pageName}) {
  const HomeBlue = require('../../assets/icons/HomeBlue.svg').default;
  const HomeGray = require('../../assets/icons/HomeGray.svg').default;
  const AktivitasBlue = require('../../assets/icons/AktivitasBlue.svg').default;
  const AktivitasGray = require('../../assets/icons/AktivitasGray.svg').default;

  // const home = "/home-lapangan" ? true : false;
    
  return (
    <div className="container-navbar">
      {/* <Link to="/lapangan" id="homebtn" activeClassName="active">
       
        { home ? <img src={HomeBlue} alt="home" className="imghome" /> : <img src={HomeGray} alt="home" className="imghome" />}

        <p className="text">Home</p>
      </Link> */}

      <Link to="/lapangan">
            <div className={`nav-btn ${pageName === "Lapangan" ? "active" : ""}`}>
              {pageName === "Lapangan" ? 
              <img src={HomeBlue} alt="lapangan" className="icon" />
              :
              <img src={HomeGray} alt="lapangan" className="icon" />
              }
              <p className="text">Home</p>
            </div>
          </Link>

          <Link to="/lapangan/aktivitas">
            <div className={`nav-btn ${pageName === "Aktivitas" ? "active" : ""}`}>
              {pageName === "Aktivitas" ? 
              <img src={AktivitasBlue} alt="aktivitas" className="icon" />
              :
              <img src={AktivitasGray} alt="aktivitas" className="icon" />
              }
              <p className="text">Aktivitas</p>
            </div>
          </Link>
          




      {/* <div className="homebtn">
        <a className="homelapangan" href="home-lapangan" ><img src={HomeGray} alt="home" className="imghome" /></a>
        <p>Home</p>
      </div> */}
      {/* <div className="aktivitasbtn">
        <a className="aktivitas" href="aktivitas" ><img src={AktivitasGray} alt="aktivitas" className="imgaktivitas" /></a>
        <p>Aktivitas</p>
      </div> */}

      {/* <Link to="/lapangan/aktivitas" id="aktivitasbtn" activeClassName="active">
        <img src={AktivitasGray} alt="aktivitas" className="imgaktivitas" />
        <p className="text">Aktivitas</p>
      </Link> */}
    </div>
  );
}

export default Navbar;
