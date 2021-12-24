import '../../styles/manajemen/Navbar.scss';
import $ from "jquery";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({pageName}) {
  const icon_warehouse = require('../../assets/icons/warehouse_logo.svg').default;
  const icon_dashboard = require('../../assets/icons/dashboard_logo.svg').default;
  const icon_products = require('../../assets/icons/products_logo.svg').default;
  const icon_settings = require('../../assets/icons/settings_logo.svg').default;
  const icon_arrow = require('../../assets/icons/arrow-blue.svg').default;

  const [collapsed, setCollapsed] = useState(false);
  
  const collapseNavbar = () => {
    if(collapsed){
      $('.container-navbar-manajemen').removeClass("collapsed");
      setCollapsed(false);
    }
    else{
      $('.container-navbar-manajemen').addClass("collapsed");
      setCollapsed(true);
    }
  }
  return (
    <div className="container-navbar-manajemen">
      <div className="btn-collapse" onClick={collapseNavbar}>
        <img src={icon_arrow} alt="arrow" />
      </div>
      <div className="nav-head">
        <div className="logo-wrapper">
          <img src={icon_warehouse} alt="warehouse" />
        </div>
        <div className="title-wrapper">
          <p className="title">Warehouse</p>
          <p className="desc">Manajemen</p>
        </div>
      </div>
      <div className="nav-items">
        <p className="sub-title">Menu</p>
        <Link to="/manajemen">
          <div className={`nav-item ${pageName === "Dashboard" ? "active" : ""}`}>
            <img src={icon_dashboard} alt="dashboard" className="icon" />
            <p className="nav-label">Dashboard</p>
          </div>
        </Link>
        <Link to="/manajemen/produk">
          <div className={`nav-item ${pageName === "Daftar Produk" ? "active" : ""}`}>
            <img src={icon_products} alt="produk" className="icon" />
            <p className="nav-label">Produk</p>
          </div>
        </Link>
        <p className="sub-title">General</p>
        <div className="nav-item">
          <img src={icon_settings} alt="pengaturan" className="icon" />
          <p className="nav-label">Pengaturan</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
