import '../../styles/lapangan/PDP.scss';
import $ from "jquery";
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

function PDP() {
    const env_api = process.env.REACT_APP_API_ENDPOINT;
    const BackArrow = require('../../assets/icons/BackArrow.svg').default;
    const ExampleProduct = require('../../assets/icons/ExampleProduct.svg').default;
    const Garis = require('../../assets/icons/Garis.svg').default;
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(null);
    const [show, setShow] = useState(false);
    const [produk, setProduk] = useState({
        name: "",
        stock: "",
        price: ""
    });
    const [pengurangan, setPengurangan] = useState({
        jumlah: "",
        actorID: ""
    });

    const currencyFormat = (nominal) => {
        const number = Number(nominal);
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }


    const fetchItems = async () => {
        // const token = localStorage.getItem('auth_token');
        // const required_role = '0,';
        // const params = `activeTab=${activeTab}`
        const id = searchParams.get("id")
        try {
            const datas = await fetch(`${env_api}/lapangan/produk?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth_token': token,
                    // 'required_role': required_role
                }
            }).then(response => response.json())
            // console.log(datas);

            setProduk(datas.data[0])

        } catch (error) {
            // console.log(error);
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        // const token = localStorage.getItem('auth_token');
        // const required_role = '0,';
        // const params = `activeTab=${activeTab}`
        const id = searchParams.get("id")
        console.log(produk.stock - keyword >= 0);
        console.log(keyword);
        if(produk.stock - keyword >= 0){
            try {
                const datas = await fetch(`${env_api}/lapangan/pengurangan?id=${id}&jumlah=${keyword}&actorID=4`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'auth_token': token,
                        // 'required_role': required_role
                    }
                }).then(response => response.json())
                console.log(datas);
                handleClose();
                fetchItems();
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log("Stock 0")
        }
    }

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        // console.log(keyword);
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
                                <p className="namaproduk">{produk.name}</p>
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
                                <p>{produk.stock} pcs</p>
                            </div>
                        </div>
                        <div className="infoharga">
                            <div className="textharga">
                                <p>Harga</p>
                            </div>
                            <div className="harga">
                                <p>{currencyFormat(produk.price)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="containerbtn">
                    <div className="btnkurangistock" onClick={handleShow} animation="false">
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
                                <p>{produk.stock} pcs</p>
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
                                <form >
                                    <p className="placeholder" id="jumlah"></p>
                                    <input type="text" placeholder="Masukkan jumlah" onChange={changeKeyword} />
                                </form>
                            </div>
                        </div>
                        <div className="containerbtn">
                            <div className="btnkurangistock" onClick={handleSearch}>
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
