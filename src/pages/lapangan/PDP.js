import '../../styles/lapangan/PDP.scss';
import $ from "jquery";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

function PDP() {
    const BackArrow = require('../../assets/icons/BackArrow.svg').default;
    const ExampleProduct = require('../../assets/icons/ExampleProduct.svg').default;
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
        <div className="container-pdp">
            <div className="section-1">
                <div className="headerdetailproduk">
                    <div className="backbutton">
                        <img src={BackArrow} alt="backarrow" className="img" />
                    </div>
                    <div className="text">
                        <p className="header">Detail Produk</p>
                    </div>
                </div>
                <div className="detailproduk">
                    <div className="container-produk">
                        <div className="produk">
                            <div>
                                <p className="namaproduk">Manik-manik hitam-10x10mm</p>
                                <p className="updateproduk">Silahkan update stok barang ini atau ubah detail produk</p>
                            </div>
                        </div>
                        <div className="imgproduk">
                            <img src={ExampleProduct} alt="exampleproduct" className="img" />
                        </div>
                        <div className="infostock">
                            <div className="totalstock">
                                <p>Total stock saat ini</p>
                            </div>
                            <div className="stock">
                                <p>350 pcs</p>
                            </div>
                        </div>
                        <div className="infoharga">
                            <div className="textharga">
                                <p>Harga</p>
                            </div>
                            <div className="harga">
                                <p>Rp.300.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="containerbtn">
                    <div className="btnkurangistock" onClick={handleShow} animation={false}>
                        <p>Kurangi Stock</p>
                    </div>
                </div>
            </div>
            <Modal id="KurangiStock" show={show} onHide={handleClose} animation={false} dialogClassName="slide-up">
                <Modal.Body>
                    <div className="garis">
                        <img src={Garis} alt="garis" className="img" />
                    </div>
                    <div className="container-up">
                        <div className="textup">
                            <p>Kurangi Stock</p>
                        </div>
                        <div className="infostock">
                            <div className="totalstock">
                                <p>Total stock saat ini</p>
                            </div>
                            <div className="stock">
                                <p>350 pcs</p>
                            </div>
                        </div>
                    </div>
                    <div className="grayline"></div>
                    <div className="container-bottom">
                        <div className="textjumlah">
                            <p>Masukkan jumlah stock yang ingin dikurangi</p>
                        </div>
                        <div className="containerbtn">
                            <div className="inputjumlah">
                                <p className="placeholder" id="kodeproduk"></p>
                                <input type="text" placeholder="Masukkan jumlah" />
                            </div>
                        </div>
                        <div className="containerbtn">
                            <div className="btnkurangistock">
                                <p>Kurangi Stock</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PDP;
