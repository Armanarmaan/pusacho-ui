import React from 'react'
import Select from 'react-select'

import '../../styles/Product.scss';

export default function Product() {
  const magnifierIcon = require('../../assets/magnifier-icon.svg').default;
  const scanIcon = require('../../assets/scan-barcode-icon.svg').default;
  const addIcon = require('../../assets/add-icon.svg').default;

  const categoryOptions = [
    { value: "Hitam", label: "Manik-manik Hitam" },
    { value: "Putih", label: "Manik-manik Putih" },
    { value: "Merah", label: "Manik-manik Merah" }
  ];

  const sortOptions = [
    { value: "Urutkan", label: "Urutkan" },
    { value: "Modal Termurah", label: "Modal Termurah" },
    { value: "Modal Termahal", label: "Modal Termahal" },
    { value: "Jumlah Terbanyak", label: "Jumlah Terbanyak" },
    { value: "Jumlah Paling Sedikit", label: "Jumlah Paling Sedikit" },
    { value: "Harga Jual Termurah", label: "Harga Jual Termurah" },
    { value: "Harga Jual Termahal", label: "Harga Jual Termahal" },
  ];

  

  return (
    <div className="product-list-container">

      <h1>Product Admin Page</h1>

      <div className="product-list-header">

        <div class="input-group">
          <input class="form-control input-search" name="search" type="search" placeholder="Cari Produk" autocomplete="off"/>
          <div class="input-group-append">
            <img src={magnifierIcon} alt="maginifier-icon"/>
          </div>
        </div>

        <div className="filter-and-buttons-wrapper">
          <div className="filter-wrapper">
            <Select placeholder="Kategori" options={categoryOptions} classNamePrefix="product-select"/>
            <Select placeholder="Urutkan" options={sortOptions} classNamePrefix="product-select-lc"/>            
          </div>

          <div className="button-wrapper">
            <button className="button-primary button-scan">
              <img className="button-icon" src={scanIcon} alt="Scan Icon" />
              <p className="button-text">Scan Produk</p>
            </button>
            <button className="button-primary button-add">
              <img className="button-icon" src={addIcon} alt="Add Icon" />
              <p className="button-text">Tambah</p>
            </button>
          </div>

        </div>

      </div>

      <div className="product-list-table">

        <div className="table-header">
          <input type="checkbox" className="header-checkbox"/>
          <p className="header-name">Nama Produk</p>
          <p className="header-size">Ukuran</p>
          <p className="header-amount">Jumlah</p>
        </div>

        <div className="table-body">
          <input type="checkbox" className="product-checkbox" />
          <div className="product-title-wrapper">
            <div className="img-wrapper"></div>
            <div className="text-wrapper">
              <p className="product-title">Manik manik Nigger</p>
              <p className="product-sub-title">
                ID: 5684236583
                <div className="blue-dot"></div>
                Manik manik
              </p>
            </div>
          </div>
          <p className="product-size">10 x 10 mm</p>
        </div>

      </div>

    </div>
  )
}
