import '../../styles/lapangan/HomeLapangan.scss';
import $ from "jquery";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/lapangan/Navbar';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function HomeLapangan() {
  const env_api = process.env.REACT_APP_API_ENDPOINT;
  const ButtonMeatballs = require('../../assets/icons/ButtonMeatballs.svg').default;
  const Scanner = require('../../assets/icons/Scanner.svg').default;
  const ScanBarang = require('../../assets/icons/ScanBarang.svg').default;
  const LogoutBtn = require('../../assets/icons/LogoutBtn.svg').default;
  const Garis = require('../../assets/icons/Garis.svg').default;

  const [keyword, setKeyword] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    // const token = localStorage.getItem('auth_token');
    // const required_role = '0,';
    // const params = `activeTab=${activeTab}`
    try {
      const datas = await fetch(`${env_api}/lapangan/produk?id=${keyword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'auth_token': token,
          // 'required_role': required_role
        }
      }).then(response => response.json())
      console.log(datas);
      if(datas.data.length > 0 ){
        navigate(`/pdp?id=${keyword}`);;
      }else{
        console.log("data tidak ditemukan")
      }

    } catch (error) {
      console.log(error);
    }
    console.log(keyword)
  }

  const handleClose = () => {
    $('.slide-up').addClass('slide-down');
    setTimeout(function () {
      setShow(false);
    }, 800);

  }
  const handleShow = () => {
    setShow(true);
  }

  const changeKeyword = (event) => {
    setKeyword(event.target.value);
  }

  return (
    <div className="container-homelapangan">
      <div className="section-1">
        <div className="headerlapangan">
          <div>
            <p className="header">Lapangan</p>
          </div>
          <div className="button" onClick={handleShow}>
            <img src={ButtonMeatballs} alt="buttonmeatballs" className="img" />
          </div>
        </div>
        <div className="scan">
          <div className="container-scan">
            <div className="scanbrg">
              <div>
                <p className="scanbarang">Scan Barang</p>
                <p className="detailbarang">Lihat atau ubah detail barang</p>
              </div>
              <img src={Scanner} alt="scanner" className="img" />
            </div>
            <div className="scannerbtn">
              <img src={ScanBarang} alt="scanbarang" className="img" />
              <p>Scan Barang</p>
            </div>
          </div>
          <div className="grayline"></div>
          <div className="cotainer-kodebarang">
            <div className="textkodebrg">
              <p className="masukkankodebrg">Masukkan Kode Barang</p>
              <p className="lihatubahkode">Lihat atau ubah detail barang</p>
            </div>
            <div className="inputkode">
              <form onSubmit={handleSearch}>
                <p className="placeholder" id="kodeproduk"></p>
                <input type="text" placeholder="Input kode pada barang" onChange={changeKeyword} />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      <Modal id="ModalLogout" show={show} onHide={handleClose} animation={false} dialogClassName="slide-up">
        <Modal.Body>
          <div className="garis">
            <img src={Garis} alt="garis" className="img" />
          </div>
          <div className="menu">
            <div className="text">
              <p>Menu Lainnya</p>
            </div>
            <div className="btnlogout">
              <img src={LogoutBtn} alt="logoutbtn" className="img" />
              <p>Keluar</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HomeLapangan;
