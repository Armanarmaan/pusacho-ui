import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import { makeStyles } from "@mui/styles";

import $ from "jquery";

export default function ScanDialog({ showScan, closeScan }) {
  const classes = useStyles();

  // Asset Imports
  const gClose = require('../../assets/icons/gray-close-icon.svg').default;
  const editIcon = require('../../assets/icons/blue-pencil-icon.svg').default;
  const scanBarcode = require('../../assets/scan-barcode.png').default;
  const manikExample = require('../../assets/contoh-manik.png').default;

  // Constant data
  const env_api = process.env.REACT_APP_API_ENDPOINT;

  // Functions
  const formatToCurrency = (num) => {
    return `Rp ${Number(num).toLocaleString("ID")}`;
  };

  const changeActiveTab = (type) => {
    $(".produk-modal-header-item").removeClass("active");
    $(".active-indicator").removeClass("detil modal");
    
    $(`.${type}`).addClass("active");
    $(".active-indicator").addClass(type);

    if (type === "modal") {
      $(".detil-produk-wrapper").addClass("d-none");
      $(".modal-wrapper").removeClass("d-none");
    } else {
      $(".detil-produk-wrapper").removeClass("d-none");
      $(".modal-wrapper").addClass("d-none");
    }
  };

  // Product
  const [product, setProduct] = useState();

  // Product Amount
  const [productStock, setProductStock] = useState(0);
  const handleProductStock = (type) => {
    if (type === "-") setProductStock(productStock - 1);
    if (type === "+") setProductStock(productStock + 1);
  }

  // Steps
  const [scanStep, setScanStep] = useState(1);
  const nextScanStep = async (event) => {
    event.preventDefault();
    let fetchedProduct = await fetch(`${env_api}/manajemen/products/${barcode}`)
                    .then(response => response.json())
                    .catch(error => console.log(error));
    if (fetchedProduct.code === 200) { 
      setProduct(fetchedProduct.data);
      setProductStock(fetchedProduct.data.stock);
      setScanStep(2); 
    } 

  };
  const submitProduct = async () => {  
    const postProduct = await fetch(`${env_api}/manajemen/products/update/amount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.id, amount: productStock })
    })
    .then(response => response.json())
    .catch(error => console.log(error));
  }
  const backScanStep = () => {
    setProduct();
    setProductStock(0);
    setScanStep(1);
  };
  const isScanButtonDisabled = () => {
    if (scanStep === 1) return barcode.length > 0 ? false : true;
    else if (scanStep === 2) return productStock > 0 ? false: true;
  };

  // Input 
  const [barcode, setBarcode] = useState("");
  const handleBarcode = (code) => setBarcode(code);

  // Close Modal
  const handleCloseScan = () => {
    setProduct();
    setProductStock(0);
    setScanStep(1);
    closeScan();
  };

  return (
    <Dialog
      open={showScan}
      fullWidth={true}
      classes={{ container: classes.root, paper: classes.paper }}
    >
      <div className="dialog-scan-wrapper">
        {scanStep === 1 ?
          <div className="scan-first-step">
            <form onSubmit={nextScanStep}>
              <div className="dialog-header">
                <h1 className="dialog-title">Scan Barcode</h1>
                <button className="btn btn-close" onClick={handleCloseScan}>
                  <img src={gClose} alt="Close Icon" />
                </button>
              </div>

              <div className="dialog-body">
                <p className="dialog-subtitle">
                  Scan barcode yang ada di produk Anda untuk melihat data produk, atau memasukkan kode barcode di kolom bawah ini.
                </p>

                <img className="dialog-icon" src={scanBarcode} alt="Scan Barcode Illustration" />
                <input className="dialog-input-code" type="text" placeholder="Masukkan kode barcode" onInput={(val) => handleBarcode(val.target.value)}/>

              </div>

              <div className="dialog-button-wrapper">
                <button className="btn btn-primary" disabled={isScanButtonDisabled()}>Selanjutnya</button>
              </div>
            </form>
          </div>
          :
          <div className="scan-second-step">
            <div className="dialog-header">
              <h1 className="dialog-title">Detail Produk</h1>
              <button className="btn btn-close" onClick={handleCloseScan}>
                <img src={gClose} alt="Close Icon" />
              </button>
            </div>

            <div className="dialog-body">
              <p className="dialog-subtitle">
                Silahkan update stok barang ini, atau ubah detail produk.
              </p>

              <div className="img-and-update-stock-wrapper">
                <div className="img-wrapper">
                  <img src={manikExample} alt="Manik Manik" />
                </div>
                <div className="update-stock-wrapper">
                  <p className="stock-title">{product.name} - {product.size}</p>

                  <div className="stock-value-wrapper">
                    <p className="stock-value-title">Update stok produk?</p>

                    <div className="button-input-wrapper">
                      <button className="add-dec-button" onClick={() => handleProductStock("-")}>-</button>
                      <div className="value-input-wrapper">
                        <p className="value-input-title">Stok di gudang</p>
                        <input className="value-input" type="text" value={productStock} onInput={(val) => setProductStock(val.target.value)}/>
                      </div>
                      <button className="add-dec-button" onClick={() => handleProductStock("+")}>+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detil-produk-and-modal-wrapper">

                <ul className="produk-modal-header">
                  <li className="produk-modal-header-item detil active" onClick={() => changeActiveTab("detil")}>Detil Produk</li>
                  <li className="produk-modal-header-item modal" onClick={() => changeActiveTab("modal")}>Modal</li>
                  <div className="active-indicator detil"></div>
                </ul>

                <div className="produk-modal-body">
                  <div className="detil-produk-wrapper">
                    <ul className="detil-produk-left">
                      <li className="detil-produk-item">
                        <p className="produk-title">Kategori</p>
                        <p className="produk-value">{product.category_name}</p>
                      </li>
                      <li className="detil-produk-item">
                        <p className="produk-title">Nama Produk</p>
                        <p className="produk-value">{product.name}</p>
                      </li>
                    </ul>
                    <ul className="detil-produk-right">
                      <li className="detil-produk-item">
                        <p className="produk-title">Ukuran</p>
                        <p className="produk-value">{product.size}</p>
                      </li>
                      <li className="detil-produk-item">
                        <p className="produk-title">ID Produk</p>
                        <p className="produk-value">{product.id}</p>
                      </li>
                    </ul>
                  </div>

                  <div className="modal-wrapper d-none">
                    <table className="modal-table">
                      <thead>
                        <tr>
                          <th>Supplier</th>
                          <th>Harga Modal</th>
                          <th>Harga Modal Nett</th>
                          <th>Harga Jual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product && product.suppliers ? product.suppliers.map((item, index) => (
                           <tr key={index}>
                             <td>{item}</td>
                             <td>{formatToCurrency(product.modals[index])}</td>
                             <td>{formatToCurrency(product.modal_nett[index])}</td>
                             <td>{formatToCurrency(product.price)}</td>
                           </tr>
                         )) : <tr></tr>}
                        <tr></tr>
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>

            </div>

            <div className="dialog-button-wrapper">
              <p className="change-detail">
                <img className="change-icon" src={editIcon} alt="" />
                Ubah Detail Produk
              </p>
              <button className="btn btn-secondary" onClick={() => backScanStep()}>Batal</button>
              <button className="btn btn-primary" onClick={() => submitProduct()} disabled={isScanButtonDisabled()}>Selanjutnya</button>
            </div>
          </div>
        }
      </div>
    </Dialog>
  )
};

const useStyles = makeStyles(() => ({
  root: {
    "@media (max-width: 771px)": {
      alignItems: "flex-end",
    }
  },
  paper: { 
    minWidth:"694px",
    "@media (max-width: 771px)": {
      width: "100%",
      margin: 0,
      maxWidth: "unset",
    }
 },
}));
