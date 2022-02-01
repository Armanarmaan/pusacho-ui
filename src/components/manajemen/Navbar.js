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
  const icon_dashboard_mobile = require('../../assets/icons/log_icon_mobile.svg').default;
  const icon_dashboard_mobile_active = require('../../assets/icons/log_icon_mobile_active.svg').default;
  const icon_products_mobile = require('../../assets/icons/produk_icon_mobile.svg').default;
  const icon_products_mobile_active = require('../../assets/icons/produk_icon_mobile_active.svg').default;
  const user_role = localStorage.getItem("role");

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
      <div className="desktop-view">
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
          {user_role !== '2' ? 
          <Link to="/manajemen">
            <div className={`nav-item ${pageName === "Dashboard" ? "active" : ""}`}>
              <img src={icon_dashboard} alt="dashboard" className="icon" />
              <p className="nav-label">Dashboard</p>
            </div>
          </Link>
          :
          null
          }
          <Link to="/manajemen/produk">
            <div className={`nav-item ${pageName === "Daftar Produk" ? "active" : ""}`}>
              <img src={icon_products} alt="produk" className="icon" />
              <p className="nav-label">Produk</p>
            </div>
          </Link>
          {user_role !== '2' ? 
          <p className={`sub-title ${user_role === '2' ? "d-none" : ""}`}>General</p>
          : null}
          {user_role !== '2' ? 
          <div className={`nav-item ${user_role === '2' ? "d-none" : ""}`}>
            <img src={icon_settings} alt="pengaturan" className="icon" />
            <p className="nav-label">Pengaturan</p>
          </div>
          :
          null
          }
        </div>
      </div>
      <div className="mobile-view">
        <div className="nav-items-mobile">
          {user_role !== '2' ? 
          <Link to="/manajemen">
            <div className={`nav-item-mobile ${pageName === "Dashboard" ? "active" : ""} ${user_role === '2' ? "d-none" : ""}`}>
              {pageName === "Dashboard" ? 
              <img src={icon_dashboard_mobile_active} alt="dashboard" className="icon" />
              :
              <img src={icon_dashboard_mobile} alt="dashboard" className="icon" />
              }
              <p className="nav-label">Dashboard</p>
            </div>
          </Link>
          : null}
          <Link to="/manajemen/produk">
            <div className={`nav-item-mobile ${pageName === "Daftar Produk" ? "active" : ""}`}>
              {pageName === "Daftar Produk" ? 
              <img src={icon_products_mobile_active} alt="produk" className="icon" />
              :
              <img src={icon_products_mobile} alt="produk" className="icon" />
              }
              <p className="nav-label">Produk</p>
            </div>
          </Link>
          {user_role === '2' ? 
          <Link to="/lapangan">
            <div className={`nav-item-mobile`}>
              <img src={icon_products_mobile} alt="produk" className="icon" />
              <p className="nav-label">Lapangan</p>
            </div>
          </Link>
          : null }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
