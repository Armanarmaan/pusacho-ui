import React from 'react'
import Select from 'react-select'

import '../../styles/Product.scss';

import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';

export default function Product() {
  const magnifierIcon = require('../../assets/icons/magnifier-icon.svg').default;
  const scanIcon = require('../../assets/icons/scan-barcode-icon.svg').default;
  const addIcon = require('../../assets/icons/add-icon.svg').default;
  const dotsIcon = require('../../assets/icons/three-blue-dots.svg').default;
  const lbArrow = require('../../assets/icons/light-blue-arrow.svg').default;

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
    <div className="container-manajemen-produk">
      <Navbar />
      <div className="container-manajemen-produk-content">
        <Header />

        <div className="product-list-outer-wrapper">

          <div className="product-list-header">

            <div class="search-product-wrapper">
              <input class="form-control input-search" name="search" type="search" placeholder="Cari Produk" />
              <div class="input-group-append">
                <img src={magnifierIcon} alt="maginifier-icon" />
              </div>
            </div>

            <div className="filter-and-buttons-wrapper">
              <div className="filter-wrapper">
                <Select placeholder="Kategori" options={categoryOptions} classNamePrefix="product-select" isMulti={true}/>
                <Select placeholder="Urutkan" options={sortOptions} classNamePrefix="product-select-lc" />
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

          <div className="product-list-content">
            <table className="product-list-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th><p className="table-title">Nama Produk</p></th>
                  <th><p className="table-title">Ukuran</p></th>
                  <th><p className="table-title">Jumlah</p></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="img-and-name-wrapper">
                      <div className="img-wrapper"></div>
                      <div className="name-wrapper">
                        <p className="name-title">Manik-manik Hitam</p>
                        <p className="name-subtitle">
                          ID: 5684236583
                          <div className="blue-dot"></div>
                          Manik manik
                        </p>
                      </div>

                    </div>
                  </td>
                  <td><p className="table-title">10 x 10 mm</p></td>
                  <td><p className="table-title">20</p></td>
                  <td><img src={dotsIcon} alt="maginifier-icon" /></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <p className="see-all">
                      lihat selengkapnya 
                      <img className="lb-arrow" src={lbArrow} alt="blue arrow"/>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="img-and-name-wrapper">
                      <div className="img-wrapper"></div>
                      <div className="name-wrapper">
                        <p className="name-title">Manik-manik Hitam</p>
                        <p className="name-subtitle">
                          ID: 5684236583
                          <div className="blue-dot"></div>
                          Manik manik
                        </p>
                      </div>

                    </div>
                  </td>
                  <td><p className="table-title">10 x 10 mm</p></td>
                  <td><p className="table-title">20</p></td>
                  <td><img src={dotsIcon} alt="maginifier-icon" /></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <p className="see-all">
                      lihat selengkapnya 
                      <img className="lb-arrow" src={lbArrow} alt="blue arrow"/>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="img-and-name-wrapper">
                      <div className="img-wrapper"></div>
                      <div className="name-wrapper">
                        <p className="name-title">Manik-manik Hitam</p>
                        <p className="name-subtitle">
                          ID: 5684236583
                          <div className="blue-dot"></div>
                          Manik manik
                        </p>
                      </div>

                    </div>
                  </td>
                  <td><p className="table-title">10 x 10 mm</p></td>
                  <td><p className="table-title">20</p></td>
                  <td><img src={dotsIcon} alt="maginifier-icon" /></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <p className="see-all">
                      lihat selengkapnya 
                      <img className="lb-arrow" src={lbArrow} alt="blue arrow"/>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="img-and-name-wrapper">
                      <div className="img-wrapper"></div>
                      <div className="name-wrapper">
                        <p className="name-title">Manik-manik Hitam</p>
                        <p className="name-subtitle">
                          ID: 5684236583
                          <div className="blue-dot"></div>
                          Manik manik
                        </p>
                      </div>

                    </div>
                  </td>
                  <td><p className="table-title">10 x 10 mm</p></td>
                  <td><p className="table-title">20</p></td>
                  <td><img src={dotsIcon} alt="maginifier-icon" /></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <p className="see-all">
                      lihat selengkapnya 
                      <img className="lb-arrow" src={lbArrow} alt="blue arrow"/>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>


      </div>
    </div>
  )
}
