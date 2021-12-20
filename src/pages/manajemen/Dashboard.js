import '../../styles/manajemen/Dashboard.scss';
// import $ from "jquery";
import React, { useState } from 'react';
import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';

function Dashboard() {
  const icon_stockin = require('../../assets/icons/icon-stock-in.svg').default;
  const icon_stockout = require('../../assets/icons/icon-stock-out.svg').default;
  const icon_arrow_download = require('../../assets/icons/icon-arrow-download.svg').default;
  const icon_expand = require('../../assets/icons/icon-expand.svg').default;
  const icon_calendar = require('../../assets/icons/icon-calendar.svg').default;
  const icon_search = require('../../assets/icons/icon-search.svg').default;
  const icon_filters = require('../../assets/icons/icon-filters.svg').default;
  const icon_seemore = require('../../assets/icons/icon-see-more.svg').default;
  const sample_manik = require('../../assets/sample-manik.png').default;

  const [activeTab, setActiveTab] = useState(0);
  const numbers = [1, 2, 3, 2, 3];
  const numbers2 = [1, 2];
  const tableContents = numbers.map((item) =>
    <tbody>
      <tr>
        <td>Mote Mutiara Diameter 8mm</td>
        <td>5684236583</td>
        <td>300</td>
        <td>12 September 2021, 18:00</td>
        <td>Rp 500.000</td>
        <td><div className="status-wrapper keluar">KELUAR</div></td>
        <td><div className="action-wrapper"><img src={icon_seemore} alt="sm" /></div></td>
      </tr>
      <tr>
        <td>Mote Mutiara Diameter 8mm</td>
        <td>5684236583</td>
        <td>300</td>
        <td>12 September 2021, 18:00</td>
        <td>Rp 500.000</td>
        <td><div className="status-wrapper masuk">MASUK</div></td>
        <td><div className="action-wrapper"><img src={icon_seemore} alt="sm" /></div></td>
      </tr>
    </tbody>
  );
  const activityContents = numbers2.map((item) =>
    <div className="activity-item">
      <div className="date">May 29, 2021</div>
      <div className="item-row">
        <div className="item-details">
          <div className="img-wrapper">
            <img src={sample_manik} alt="pic" />
          </div>
          <div className="desc">
            <p className="actor">Manajemen</p>
            <p className="action">merubah harga jual</p>
            <p className="item">manik manik 10x10mm</p>
            <p className="from-after">dari</p>
            <p className="value">Rp 500.000</p>
            <p className="from-after">menjadi</p>
            <p className="value">Rp 550.000</p>
          </div>
        </div>
        <div className="time">10 : 12 PM</div>
      </div>
      <div className="item-row">
        <div className="item-details">
          <div className="img-wrapper">
            <img src={sample_manik} alt="pic" />
          </div>
          <div className="desc">
            <p className="actor">Manajemen</p>
            <p className="action">merubah harga jual</p>
            <p className="item">manik manik 10x10mm</p>
            <p className="from-after">dari</p>
            <p className="value">Rp 500.000</p>
            <p className="from-after">menjadi</p>
            <p className="value">Rp 550.000</p>
          </div>
        </div>
        <div className="time">10 : 12 PM</div>
      </div>
    </div>
  );
  const tabChange = (tab) => {
    setActiveTab(tab);

  }

  return (
    <div className="container-manajemen">
      <Navbar/>
      <div className="container-content-manajemen">
        <Header pageName="Dashboard"/>
        <div className="container-manajemen-dashboard">
          <div className="manajemen-dashboard">

            <div className="tabs">
              <div className={`tab-item ${activeTab === 0 ? 'active' : null}`} onClick={() => tabChange(0)}>Dashboard Barang</div>
              <div className={`tab-item ${activeTab === 1 ? 'active' : null}`} onClick={() => tabChange(1)}>Aktivitas</div>
              <div className={`underline ${activeTab === 0 ? 'dashboard' : 'aktivitas'}`}></div>
            </div>

            <div className="tab-contents">

              <div className={`tab-content ${activeTab === 0 ? 'active' : null}`}>
                <div className="head-content">
                  <div className="row">
                    <div className="in-out-content">
                      <div className="in-out">
                        <div className="img-wrapper"><img src={icon_stockin} alt="stkin"/></div>
                        <div className="desc-wrapper">
                          <p className="title">Barang Masuk</p>
                          <div className="val"><p>115</p> <p className="label">Produk</p></div>
                        </div>
                      </div>
                      <div className="in-out">
                        <div className="img-wrapper blue"><img src={icon_stockout} alt="stkout"/></div>
                        <div className="desc-wrapper">
                          <p className="title">Barang Keluar</p>
                          <div className="val"><p>260</p> <p className="label">Produk</p></div>
                        </div>
                      </div>
                    </div>
                    <div className="btn-download">
                      <div className="wrapper">
                        <img src={icon_arrow_download} alt="dwnld"/>
                        <p>Download Laporan</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="search">
                      <input type="text" placeholder="Cari produk"/>
                      <img src={icon_search} alt="srch"/>
                    </div>
                    <div className="dropdowns">
                      <div className="filter">
                        <div>
                          <img src={icon_filters} alt="fltr" />
                          <p>Filter</p>
                        </div>
                        <img src={icon_expand} alt="expnd" />
                      </div>
                      <div className="filter">
                        <div>
                          <img src={icon_calendar} alt="clndr" />
                          <p>Pilih Tanggal</p>
                        </div>
                        <img src={icon_expand} alt="expnd" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-content">
                  <table className="table-dashboard" cellspacing="0" cellpadding="0">
                    <thead>
                      <tr>
                        <td>Nama Produk</td>
                        <td>Kode Produk</td>
                        <td>Jumlah</td>
                        <td>Tanggal</td>
                        <td>Harga</td>
                        <td>Keterangan</td>
                        <td></td>
                      </tr>
                    </thead>
                    {tableContents}
                  </table>
                </div>
              </div>

              <div className={`tab-content ${activeTab === 1 ? 'active' : null}`}>
                <div className="head-content activity">
                  <div className="row">
                    <div className="dropdowns">
                      <div className="filter">
                        <div>
                          <img src={icon_filters} alt="fltr" />
                          <p>Filter</p>
                        </div>
                        <img src={icon_expand} alt="expnd" />
                      </div>
                      <div className="filter">
                        <div>
                          <img src={icon_calendar} alt="clndr" />
                          <p>Pilih Tanggal</p>
                        </div>
                        <img src={icon_expand} alt="expnd" />
                      </div>
                    </div>
                    <div className="btn-download">
                      <div className="wrapper">
                        <img src={icon_arrow_download} alt="dwnld2"/>
                        <p>Download Laporan</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-content">
                  <div className="activity-items">
                    {activityContents}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
