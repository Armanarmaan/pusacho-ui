import '../../styles/lapangan/HomeLapangan.scss';
import $ from "jquery";
import React, { useState } from 'react';
import Navbar from '../../components/lapangan/Navbar';
import Modal from 'react-bootstrap/Modal';

function HomeLapangan() {
  const ButtonMeatballs = require('../../assets/icons/ButtonMeatballs.svg').default;
  const Scanner = require('../../assets/icons/Scanner.svg').default;
  const ScanBarang = require('../../assets/icons/ScanBarang.svg').default;
  const LogoutBtn = require('../../assets/icons/LogoutBtn.svg').default;
  const Garis = require('../../assets/icons/Garis.svg').default;

  const [show, setShow] = useState(false);

  const handleClose = () => {
    $('.slide-up').addClass('slide-down');
    setTimeout(function () {
      setShow(false);
    }, 800);

  }
  const handleShow = () => {
    setShow(true);
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
              <p className="placeholder" id="kodeproduk"></p>
              <input type="text" placeholder="Input kode pada barang" />
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
