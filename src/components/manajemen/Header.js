import '../../styles/manajemen/Header.scss';
// import $ from "jquery";
// import React, { useState } from 'react';

function Header({pageName}) {
  const icon_arrow = require('../../assets/icons/arrow-down.svg').default;

  return (
    <div className="container-header-manajemen">
      <div className="head-title">
        <p className="title">{pageName}</p>
      </div>
      <div className="profile-container">
        <p className="name">La Ods</p>
        <img src={icon_arrow} alt="arrow" />
      </div>
    </div>
  );
}

export default Header;
