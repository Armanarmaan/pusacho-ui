import '../../styles/lapangan/PDP.scss';
import $, { event } from "jquery";
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';


function PDP() {
    const env_api = process.env.REACT_APP_API_ENDPOINT;
    const BackArrow = require('../../assets/icons/BackArrow.svg').default;
    const ExampleProduct = require('../../assets/icons/ExampleProduct.svg').default;
    const Garis = require('../../assets/icons/Garis.svg').default;
    const [searchParams, setSearchParams] = useSearchParams();

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(null);
    const [show, setShow] = useState(false);
    const [produk, setProduk] = useState({
        name: "",
        stock: "",
        price: "",
        size:"",
        images:"",
    });

    const currencyFormat = (nominal) => {
        const number = Number(nominal);
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }


    const fetchItems = async () => {
        const token = localStorage.getItem('auth_token');
        const required_role = '1,2';
        
        const id = searchParams.get("id")
        try {
            const datas = await fetch(`${env_api}/lapangan/produk?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': token,
                    'required_role': required_role
                }
            }).then(response => response.json())
            // console.log(datas);

            setProduk(datas.data[0])

        } catch (error) {
            // console.log(error);
        }
    }

    const refreshPage = ()=>{
        window.location.reload();
     }

    const handleSearch = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('auth_token');
        const required_role = '1,2';
    
        const id = searchParams.get("id")
        const actorID = localStorage.getItem("id");
        console.log(produk.stock - keyword >= 0);
        console.log(keyword);
        if (produk.stock - keyword >= 0 && keyword >= 1) {
            try {
                const datas = await fetch(`${env_api}/lapangan/pengurangan?id=${id}&jumlah=${keyword}&actorID=${actorID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth_token': token,
                        'required_role': required_role
                    }
                }).then(response => response.json())
                console.log(datas);
                handleClose();
                fetchItems();
                handleClick();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Stock 0")
            handleClose();
            fetchItems();
            handleClick1();
        }
    }

    
    // ROUTER 
    useEffect(() => {
        if (!localStorage.getItem("auth_token")) {
            localStorage.clear();
            window.location.href = "/";
        }
        else {
            // verifyToken();
            fetchItems();

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //modal bootstrap
    const handleClose = () => {
        $('.slide-up').addClass('slide-down');
        setTimeout(function () {
            setShow(false);
            refreshPage();
        }, 800);

    }
    const handleShow = () => {
        setShow(true);
    }

    //snackbar success
    const handleClick = () => {
        setOpen(true);
    };

    const handleCloseSB = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSB}>
                OK
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSB}
            >
            </IconButton>
        </React.Fragment>
    );

    //snackbar fail
    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleCloseSBF = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const action1 = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSBF}>

            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSBF}
            >
            </IconButton>
        </React.Fragment>
    );

    //inputan pengurangan
    const changeKeyword = (event) => {
        setKeyword(event.target.value);
        // console.log(keyword);
    }

    return (
        <div className="container-pdp">
            <div className="section-1">
                <div className="headerdetailproduk">
                    <Link to="/lapangan">
                        <div className="backbutton">
                            <img src={BackArrow} alt="backarrow" className="img" />
                        </div>
                    </Link>
                    <div className="text">
                        <p className="header">Detail Produk</p>
                    </div>
                </div>
                <div className="detailproduk">
                    <div className="container-produk">
                        <div className="produk">
                            <div>
                                <p className="namaproduk">{produk.name} - {produk.size}</p>
                                <p className="updateproduk">Silahkan update stok barang ini atau ubah detail produk</p>
                            </div>
                        </div>
                        <div className="imgproduk">
                            <img src={`${env_api}${produk.images}`} alt="exampleproduct" className="img" />
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
                                <form onSubmit={event => { event.preventDefault(); }}>
                                    <p className="placeholder" id="jumlah"></p>
                                    <input type="number" placeholder="Masukkan jumlah" onChange={changeKeyword} required/>
                                    <div className="btnkurangistock" type="submit" onClick={handleSearch}>
                                        <p>Kurangi Stock</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <div className="containerbtn">
                            <div className="btnkurangistock" onClick={handleSearch}>
                                <p>Kurangi Stock</p>
                            </div>
                        </div> */}
                    </div>
                </Modal.Body>
            </Modal>
            <Snackbar
                id="sbSuccess"
                open={open}
                autoHideDuration={3000}
                onClose={handleCloseSB}
                message="Stock produk berhasil diupdate"
                action={action}
            />

            <Snackbar
                id="sbFail"
                open={open1}
                autoHideDuration={3000}
                onClose={handleCloseSBF}
                message="Terjadi kesalahan pada proses pengurangan"
                action={action1}
            />
        </div>
    );
}

export default PDP;
