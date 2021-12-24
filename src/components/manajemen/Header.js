import '../../styles/manajemen/Header.scss';
// import $ from "jquery";
import React, { useState } from 'react';

function Header({pageName}) {
  const icon_arrow = require('../../assets/icons/arrow-down.svg').default;
  const icon_logout = require('../../assets/icons/icon-logout-mnjmn.svg').default;
  const username = localStorage.getItem("username");

  const [dropdownClosed, setDropdownClosed] = useState(true);

  const openDropdown = () => {
    dropdownClosed ? setDropdownClosed(false) : setDropdownClosed(true);
  }
  const hideSet = () => {
    setTimeout(function(){ 
      setDropdownClosed(true);
    }, 100);
  }
  const submitLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }
  return (
    <div className="container-header-manajemen">
      <div className="head-title">
        <p className="title">{pageName}</p>
      </div>
      <button type="button" className="profile-container" onClick={openDropdown} onBlur={hideSet}>
        {username}
        <img src={icon_arrow} alt="arrow" />
      </button>
      <div className={`dropdown-profile ${dropdownClosed ? "d-none" : ""}`} id="dropdown-profile">
        <div className="item" onClick={submitLogout}>
          <img src={icon_logout} alt="logout" />
          <p>Keluar</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
