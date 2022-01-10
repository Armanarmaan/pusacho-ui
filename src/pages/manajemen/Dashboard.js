import '../../styles/manajemen/Dashboard.scss';
import $ from "jquery";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';
import moment from 'moment';
import Select from 'react-select';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import DialogLogBarang from '../../components/manajemen/mobile/DialogLogBarang';
import DialogActivity from '../../components/manajemen/mobile/DialogActivity';

function Dashboard() {
  const env_api = process.env.REACT_APP_API_ENDPOINT;
  const icon_stockin = require('../../assets/icons/icon-stock-in.svg').default;
  const icon_stockout = require('../../assets/icons/icon-stock-out.svg').default;
  const icon_arrow_download = require('../../assets/icons/icon-arrow-download.svg').default;
  const icon_expand = require('../../assets/icons/icon-expand.svg').default;
  const icon_calendar = require('../../assets/icons/icon-calendar.svg').default;
  const icon_search = require('../../assets/icons/icon-search.svg').default;
  const icon_seemore = require('../../assets/icons/icon-see-more.svg').default;
  const sample_manik = require('../../assets/sample-manik.png').default;
  const icon_three_dot_white = require('../../assets/icons/three_dot_icon_white.svg').default;
  const icon_arrow_blue_mobile = require('../../assets/icons/arrow_blue_mobile.svg').default;
  
  // 0 is Dashboard Barang, 1 is Aktivitas
  const [activeTab, setActiveTab] = useState(0);
  const [dashboardDatas, setDashboardDatas] = useState([]);
  const [activityDatas, setActivityDatas] = useState([]);
  const [statistics, setStatistics] = useState({
    masuk: 0,
    keluar: 0
  })
  const [categoryOptions, setCategories] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [paramsDashB, setParamsDashB] = useState({
    keyword: null,
    categories: [],
    dateStart: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
    dateEnd: moment().format('YYYY-MM-DD HH:mm:ss')
  });


  const [showLog, setShowLog] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [selectedDateMobile, setSelectedDateMobile] = useState('');

  // Check if admin is logged in or not && check token if valid based on token & required role for this page
  // const verifyToken = async () => {
  //   const token = localStorage.getItem('auth_token');
  //   const required_role = '0,';

  //   const respon = await fetch(`${env_api}/auth/user/verify`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth_token': token,
  //       'required_role': required_role
  //     }
  //   })
  //   if(respon.status !== 200){
  //     localStorage.clear();
  //     window.location.href = "/";
  //   }
  // }

  // Fetch data for this page
  const fetchItems = async () => {
    const token = localStorage.getItem('auth_token');
    const required_role = '0,';
    const params = 
    `activeTab=${activeTab}&keyword=${paramsDashB.keyword}&categories=${paramsDashB.categories}&datestart=${paramsDashB.dateStart}&dateend=${paramsDashB.dateEnd}`;
    try {
      const datas = await fetch(`${env_api}/manajemen/dashboard/activity?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': token,
          'required_role': required_role
        }
      }).then(response => response.json())
      
      if(datas.data !== []){
        if(activeTab === 0){
          setDashboardDatas(datas.data.datas);
          setCategories(datas.data.categories);
        }
        else{
          setActivityDatas(datas.data.datas);
          setCategories(datas.data.categories);
        }
      }
      else{
        if(activeTab === 0){
          setDashboardDatas([]);
          setCategories([]);
        }
        else{
          setActivityDatas([]);
          setCategories([]);
        }
      }
      
    } catch (error) {
      if(activeTab === 0){
        setDashboardDatas([]);
        setCategories([]);
      }
      else{
        setActivityDatas([]);
        setCategories([]);
      }
    }
    
  }

  const fetchStatistics = async () => {
    const token = localStorage.getItem('auth_token');
    const required_role = '0,';
    try {
      const datas = await fetch(`${env_api}/manajemen/dashboard/statistics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': token,
          'required_role': required_role
        }
      }).then(response => response.json())
      setStatistics({
        masuk: datas.data.totalMasuk,
        keluar: datas.data.totalKeluar
      })
    } catch (error) {
      if(activeTab === 0){
        setStatistics({
          masuk: 0,
          keluar: 0
        })
      }
    }
  }

  // ROUTER 
  useEffect( () => {
    if(!localStorage.getItem("auth_token")){
      localStorage.clear();
      window.location.href = "/";
    }
    else{
      // verifyToken();
      fetchStatistics();
      fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, paramsDashB]);

  const currencyFormat = (nominal) => {
    const number = Number(nominal);
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }
  
  const tableContents = dashboardDatas.map((item) =>
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.product_id}</td>
      <td>{item.difference}</td>
      <td>{moment(item.created_at).format('D MMMM YYYY, HH:mm')}</td>
      <td>{currencyFormat(item.price)}</td>
      <td><div className={`status-wrapper ${item.activity_id === 1 ? 'masuk' : 'keluar'}`}>{item.activity_id === 1 ? 'MASUK' : 'KELUAR'}</div></td>
      <td><div className="action-wrapper"><img src={icon_seemore} alt="sm" /></div></td>
    </tr>
  );

  const ActivityContents = () => {
    return activityDatas.map((item, index) =>
      <div className="activity-item" key={index}>
        <div className="date">{moment(item[0].created_at).format("MMMM D, YYYY")}</div>
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
  const changeKeyword = (event) => {
    setKeyword(event.target.value);
  }
  const handleSearch = (event) => {
    event.preventDefault();
    if(keyword !== null && keyword !== ''){
      setParamsDashB({
        ...paramsDashB,
        keyword: keyword
      })
    }
  }
  const handleCategoryChange = (event) => {
    let arrCategories = [];
    event.forEach((item) => {
      arrCategories.push(item.value);
    })
    setParamsDashB({
      ...paramsDashB,
      categories: arrCategories
    })
  }
  const setDateRangeFilter = (event) => {
    if(event.startDate && event.endDate){
      $('.label-chosen-date-filter').text(`${moment(event.startDate).format('YYYY-MM-D')} - ${moment(event.endDate).format('YYYY-MM-D')}`);
      setSelectedDateMobile(`${moment(event.startDate).format('YYYY-MM-D')} - ${moment(event.endDate).format('YYYY-MM-D')}`);
      setParamsDashB({
        ...paramsDashB,
        dateStart: moment(event.startDate).format('YYYY-MM-DD HH:mm:ss'),
        dateEnd: moment(event.endDate).format('YYYY-MM-DD HH:mm:ss'),
      })
    }
  }
  
  const showDateFilter = () => {
    let daterangeObj = document.getElementById("daterangepicker-filter").ej2_instances[0]; 
    daterangeObj.show();
  }

  const handleCategoryChangeTwo = (event) => {
    let arrCategories = [];
    event.forEach((item) => {
      arrCategories.push(item.value);
    })
    setParamsDashB({
      ...paramsDashB,
      categories: arrCategories
    })
  }
  const setDateRangeFilterTwo = (event) => {
    if(event.startDate && event.endDate){
      $('.label-chosen-date-filter').text(`${moment(event.startDate).format('YYYY-MM-D')} - ${moment(event.endDate).format('YYYY-MM-D')}`);
      setParamsDashB({
        ...paramsDashB,
        dateStart: moment(event.startDate).format('YYYY-MM-DD HH:mm:ss'),
        dateEnd: moment(event.endDate).format('YYYY-MM-DD HH:mm:ss'),
      })
    }
  }
  
  const showDateFilterTwo = () => {
    let daterangeObj = document.getElementById("daterangepicker-filter-two").ej2_instances[0]; 
    daterangeObj.show();
  }

  const showDateLaporanOne = () => {
    let daterangeObj = document.getElementById("daterangepicker-laporan-one").ej2_instances[0]; 
    daterangeObj.show();
  }

  const showDateLaporanTwo = () => {
    let daterangeObj = document.getElementById("daterangepicker-laporan-two").ej2_instances[0]; 
    daterangeObj.show();
  }

  const openModalMobile = (tab) => {
    if(tab === 0){
      setActiveTab(0);
      setTimeout(
        function(){ 
          setShowLog(true);
        }, 
      300);
    }
    else{
      setActiveTab(1);
      setTimeout(
        function(){ 
          setShowActivity(true);
        }, 
      300);
    }
  }

  const handleCloseLogMobile = () => {
    setShowLog(false);
  }
  const handleCloseActivityMobile = () => {
    setShowActivity(false);
  }

  return (
    <div className="container-manajemen">
      <Navbar pageName="Dashboard"/>
      <div className="container-content-manajemen">
        <Header pageName="Dashboard"/>
        <div className="container-manajemen-dashboard desktop-view">
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
                          <div className="val"><p>{statistics.masuk}</p> <p className="label">Produk</p></div>
                        </div>
                      </div>
                      <div className="in-out">
                        <div className="img-wrapper blue"><img src={icon_stockout} alt="stkout"/></div>
                        <div className="desc-wrapper">
                          <p className="title">Barang Keluar</p>
                          <div className="val"><p>{statistics.keluar}</p> <p className="label">Produk</p></div>
                        </div>
                      </div>
                    </div>
                    <div className="btn-download">
                      <div className="wrapper" onClick={showDateLaporanOne}>
                        <img src={icon_arrow_download} alt="dwnld"/>
                        <p>Download Laporan</p>
                      </div>
                      <DateRangePickerComponent id="daterangepicker-laporan-one" 
                      // change={setDateRangeLaporanOne}
                      cssClass="laporan-one"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <form onSubmit={handleSearch}>
                      <div className="search">
                        <input type="text" placeholder="Cari produk" onChange={changeKeyword}/>
                        <button type="submit"><img src={icon_search} alt="srch"/></button>
                      </div>
                    </form>
                    <div className="dropdowns">
                      <Select placeholder="Kategori" options={categoryOptions} classNamePrefix="product-select" isMulti={true} onChange={handleCategoryChange}/>
                      <button className="filter" onClick={showDateFilter}>
                        <div>
                          {/* <input type="text" className="d-none" id="daterangepicker-filter" onChange={() => {alert(this.event.target.value)}}/> */}
                          <img src={icon_calendar} alt="clndr" />
                          <p className="label-chosen-date-filter">Pilih Tanggal</p>
                        </div>
                        <img src={icon_expand} alt="expnd" />
                      </button>
                      <DateRangePickerComponent id="daterangepicker-filter" 
                      change={setDateRangeFilter}
                      startDate={paramsDashB.startDate}
                      endDate={paramsDashB.endDate}
                      />
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
                      <Select placeholder="Kategori" options={categoryOptions} classNamePrefix="product-select" isMulti={true} onChange={handleCategoryChangeTwo}/>
                      <button className="filter" onClick={showDateFilterTwo}>
                        <div>
                          {/* <input type="text" className="d-none" id="daterangepicker-filter" onChange={() => {alert(this.event.target.value)}}/> */}
                          <img src={icon_calendar} alt="clndr" />
                          <p className="label-chosen-date-filter">Pilih Tanggal</p>
                        </div>
                        <img src={icon_expand} alt="expnd" />
                      </button>
                      <DateRangePickerComponent id="daterangepicker-filter-two" 
                      change={setDateRangeFilterTwo}
                      startDate={paramsDashB.startDate}
                      endDate={paramsDashB.endDate}
                      cssClass="daterangepickerTwo"
                      />
                    </div>
                    <div className="btn-download">
                      <div className="wrapper" onClick={showDateLaporanTwo}>
                        <img src={icon_arrow_download} alt="dwnld"/>
                        <p>Download Laporan</p>
                      </div>
                      <DateRangePickerComponent id="daterangepicker-laporan-two" 
                      // change={setDateRangeLaporanOne}
                      />
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
        <div className="container-manajemen-dashboard mobile-view">
          <div className="dashboard-mobile-header">
            <div className="container-content-header-mobile">
              <p>Dashboard</p>
              <img src={icon_three_dot_white} alt="dots" />
            </div>
          </div>
          <div className="dashboard-mobile-contents">
            <div className="item">
              <div className="content-statistics">
                <div className="statistic-item">
                  <img src={icon_stockin} alt="stckin" />
                  <div className="descriptions">
                    <p className="label-title">Barang Masuk</p>
                    <div className="values"><p>{statistics.masuk}</p> <p className="label">Produk</p></div>
                  </div>
                </div>
                <div className="statistic-item">
                  <img src={icon_stockout} alt="stckout" />
                  <div className="descriptions">
                    <p className="label-title">Barang Keluar</p>
                    <div className="values"><p>{statistics.keluar}</p> <p className="label">Produk</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" onClick={() => openModalMobile(0)}>
              <div className="tabs-item">
                <div className="item-label">
                  <p className="item-label-title">Log Barang</p>
                  <p className="item-label-subtitle">Lihat semua log masuk dan keluar stok barang</p>
                </div>
                <img src={icon_arrow_blue_mobile} alt="arrbl" />
              </div>
            </div>
            <div className="item" onClick={() => openModalMobile(1)}>
              <div className="tabs-item">
                <div className="item-label">
                  <p className="item-label-title">Aktivitas</p>
                  <p className="item-label-subtitle">Lihat semua aktivitas</p>
                </div>
                <img src={icon_arrow_blue_mobile} alt="arrbl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogLogBarang showDialog={showLog} handleCloseDialog={handleCloseLogMobile} 
        changeKeyword={changeKeyword} datas={dashboardDatas} currencyFormat={currencyFormat} handleSearch={handleSearch}
        categoryOptions={categoryOptions} handleCategoryChange={handleCategoryChange} setDateRangeFilter={setDateRangeFilter}
        selectedDateMobile={selectedDateMobile}/>
      <DialogActivity showDialog={showActivity} handleCloseDialog={handleCloseActivityMobile} datas={activityDatas}
        categoryOptions={categoryOptions} handleCategoryChange={handleCategoryChange} setDateRangeFilter={setDateRangeFilter}
        selectedDateMobile={selectedDateMobile}/>
    </div>
  );
}

export default Dashboard;
