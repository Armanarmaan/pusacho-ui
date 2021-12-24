import '../../styles/lapangan/Navbar.scss';
import $ from "jquery";
import React, { useState } from 'react';

function Navbar() {
  const HomeBlue = require('../../assets/icons/HomeBlue.svg').default;
  const HomeGray = require('../../assets/icons/HomeGray.svg').default;
  const AktivitasBlue = require('../../assets/icons/AktivitasBlue.svg').default;
  const AktivitasGray = require('../../assets/icons/AktivitasGray.svg').default;

  return (
    <div className="container-navbar">
      <div className="homebtn">
        <a className="homelapangan" href="home-lapangan" ><img src={HomeGray} alt="home" className="imghome" /></a>
        <p>Home</p>
      </div>
      <div className="aktivitasbtn">
        <a className="aktivitas" href="aktivitas" ><img src={AktivitasBlue} alt="aktivitas" className="imgaktivitas" /></a>
        <p>Aktivitas</p>
      </div>
    </div>
  );
}

export default Navbar;
