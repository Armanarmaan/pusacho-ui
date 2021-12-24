import '../../styles/manajemen/Dashboard.scss';
// import $ from "jquery";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';
import moment from 'moment';

function Dashboard() {
  const env_api = process.env.REACT_APP_API_ENDPOINT;
  const icon_stockin = require('../../assets/icons/icon-stock-in.svg').default;
  const icon_stockout = require('../../assets/icons/icon-stock-out.svg').default;
  const icon_arrow_download = require('../../assets/icons/icon-arrow-download.svg').default;
  const icon_expand = require('../../assets/icons/icon-expand.svg').default;
  const icon_calendar = require('../../assets/icons/icon-calendar.svg').default;
  const icon_search = require('../../assets/icons/icon-search.svg').default;
  const icon_filters = require('../../assets/icons/icon-filters.svg').default;
  const icon_seemore = require('../../assets/icons/icon-see-more.svg').default;
  const sample_manik = require('../../assets/sample-manik.png').default;

  // const [paramsDashB, setParamsDashB] = useState({
  //   username: '',
  //   password: ''
  // });

  // 0 is Dashboard Barang, 1 is Aktivitas
  const [activeTab, setActiveTab] = useState(0);
  const [dashboardDatas, setDashboardDatas] = useState([]);
  const [activityDatas, setActivityDatas] = useState([]);

  // Check if admin is logged in or not && check token if valid based on token & required role for this page
  const verifyToken = async () => {
    const token = localStorage.getItem('auth_token');
    const required_role = '0,';

    const respon = await fetch(`${env_api}/auth/user/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': token,
        'required_role': required_role
      }
    })
    if(respon.status !== 200){
      localStorage.clear();
      window.location.href = "/";
    }
  }

  // Fetch data for this page
  const fetchItems = async () => {
    const token = localStorage.getItem('auth_token');
    const required_role = '0,';
    const params = `activeTab=${activeTab}`
    const datas = await fetch(`${env_api}/manajemen/dashboard/activity?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': token,
        'required_role': required_role
      }
    }).then(response => response.json())
    activeTab === 0 ? setDashboardDatas(datas.data) : setActivityDatas(datas.data);
  }

  // ROUTER 
  useEffect( () => {
    if(!localStorage.getItem("auth_token")){
      localStorage.clear();
      window.location.href = "/";
    }
    else{
      verifyToken();
      fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const currencyFormat = (nominal) => {
    const number = Number(nominal);
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }
  
  const numbers2 = [1, 2];
  const tableContents = dashboardDatas.map((item) =>
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.product_id}</td>
      <td>{item.final_value}</td>
      <td>{moment(item.created_at).format('DD MMMM YYYY, HH:mm')}</td>
      {/* <td>12 September 2021, 18:00</td> */}
      <td>{currencyFormat(item.price)}</td>
      <td><div className={`status-wrapper ${item.activity_id === 1 ? 'masuk' : 'keluar'}`}>{item.activity_id === 1 ? 'MASUK' : 'KELUAR'}</div></td>
      <td><div className="action-wrapper"><img src={icon_seemore} alt="sm" /></div></td>
    </tr>
  );

  const ActivityContents = () => {
    return activityDatas.map((item, index) =>
      <div className="activity-item" key={index}>
        <div className="date">{moment(item[0].created_at).format("MMMM DD, YYYY")}</div>
        {item.map((item2) => 
          <div className="item-row" key={item2.id}>
            <div className="item-details">
              <div className="img-wrapper">
                <img src={sample_manik} alt="pic" />
              </div>
              <div className="desc">
                <p className="actor">{item2.actor_name}</p>
                <p className="action">{item2.wording}</p>
                <p className="item">{item2.name}</p>
                <p className="from-after">dari</p>
                <p className="value">{item2.initial_value}</p>
                <p className="from-after">menjadi</p>
                <p className="value">{item2.final_value}</p>
              </div>
            </div>
            <div className="time">{moment(item2.created_at).format("HH:mm")}</div>
          </div>
        )}
      </div>
    );
    }
  const tabChange = (tab) => {
    setActiveTab(tab);
  }

  return (
    <div className="container-manajemen">
      <Navbar pageName="Dashboard"/>
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
                  <table className="table-dashboard" cellSpacing="0" cellPadding="0">
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
                    <tbody>
                      {tableContents}
                    </tbody>
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
                    <ActivityContents />
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
