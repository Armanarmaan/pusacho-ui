import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import { makeStyles } from "@mui/styles";

import $ from "jquery";

export default function ScanDialog({ showScan, closeScan, editFunction, auth }) {
  const classes = useStyles();

  // Asset Imports
  const gClose = require('../../assets/icons/gray-close-icon.svg').default;
  const editIcon = require('../../assets/icons/blue-pencil-icon.svg').default;
  const scanBarcode = require('../../assets/scan-barcode.png').default;
  const manikExample = require('../../assets/contoh-manik.png').default;
  
  // Asset Imports mobile
  const bWhite = require('../../assets/icons/back-white-icon.svg').default;

  // Constant data
  const env_api = process.env.REACT_APP_API_ENDPOINT;
  const role_user = localStorage.getItem("role");

  // Functions
  const formatToCurrency = (num) => {
    return `Rp ${Number(num).toLocaleString("ID")}`;
  };

  const changeActiveTab = (type) => {
    $(".produk-modal-header-item").removeClass("active");
    $(".active-indicator").removeClass("detil supplier");
    
    $(`.${type}`).addClass("active");
    $(".active-indicator").addClass(type);

    if (type === "supplier") {
      $(".detil-produk-wrapper").addClass("d-none");
      $(".supplier-wrapper").removeClass("d-none");
    } else {
      $(".detil-produk-wrapper").removeClass("d-none");
      $(".supplier-wrapper").addClass("d-none");
    }
  };

  const changeActiveTabMobile = (type) => {
    if (type == "product") {
      $(".body-suppliers-detail").addClass("d-none");
      $(".body-product-detail").removeClass("d-none");
      $(".type-active-indicator").removeClass("supplier").addClass("detail");
    } else {
      $(".body-product-detail").addClass("d-none");
      $(".body-suppliers-detail").removeClass("d-none");
      $(".type-active-indicator").addClass("supplier").removeClass("detail");
    }
  };

  // // Product
  const [product, setProduct] = useState({
  });

  // Product Amount
  const [originalStock, setOriginalStock] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const handleProductStock = (type) => {
    if (type === "-") setProductStock(productStock - 1);
    if (type === "+") setProductStock(productStock + 1);
  };

  // Edit Product
  const editFromScan = (id) => {
    if (typeof window !== undefined) localStorage.setItem("editId", id);
    if ($(window).width() > 770) $(".ScanDialog").addClass("d-none");
    editFunction(id);
  };

  // Steps
  const [scanStep, setScanStep] = useState(1);
  const nextScanStep = async (event) => {
    event.preventDefault();
    if (barcode.length > 0) {
      let fetchedProduct = await fetch(`${env_api}/manajemen/products/${barcode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth_token": localStorage.getItem("auth_token"),
          "required_role": "0,2"
        }
      })
        .then(response => response.json())
        .catch(error => console.log(error));

      if (fetchedProduct) { 
        setProduct(fetchedProduct.data);
        setOriginalStock(fetchedProduct.data.stock);
        setProductStock(fetchedProduct.data.stock);
        setScanStep(2); 
      }
    } 
  };
  const submitProduct = async () => {  
    const postProduct = await fetch(`${env_api}/manajemen/products/update/amount`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem("auth_token"),
        "required_role": "0,2"
      },
      body: JSON.stringify({ auth: auth, id: product.id, amount: productStock, originalAmount: originalStock })
    })
    .then(() => { 
      closeScan();
      setScanStep(1);
      setProduct();
      setProductStock(0);
      window.location.reload();
    })
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
  const handleCloseScan = (event) => {
    setProduct();
    setProductStock(0);
    setScanStep(1);
    closeScan();
  };

  return (
    <Dialog
      open={showScan}
      fullWidth={true}
      classes={{ container: classes.root, paper:  scanStep === 1? classes.paper : classes.paper2 }}
      className="ScanDialog"
    >
      <div className="dialog-scan-wrapper">
        {scanStep === 1 ?
          <div className="scan-first-step">
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
                <form className="dialog-input-form" onSubmit={nextScanStep}>
                  <input className="dialog-input-code" type="text" placeholder="Masukkan kode barcode" onInput={(val) => handleBarcode(val.target.value)}/>
                </form>

              </div>

              <div className="dialog-button-wrapper">
                <button className="btn btn-primary" disabled={isScanButtonDisabled()} onClick={nextScanStep}>Selanjutnya</button>
              </div>
          </div>
          :
          <div className="scan-second-step">
            <div className="dialog-header">
              <h1 className="dialog-title">Detail Produk</h1>
              <button className="btn btn-close" onClick={handleCloseScan}>
                <img src={gClose} alt="Close Icon" />
              </button>
            </div>

            <div className="dialog-header-mobile" onClick={backScanStep}>
              <img className="dialog-icon" src={bWhite} alt="Back White" />
              <p className="dialog-title">Produk</p>
            </div>

            <div className="dialog-body">
              <p className="dialog-subtitle">
                Silahkan update stok barang ini, atau ubah detail produk.
              </p>

              <div className="img-and-update-stock-wrapper">
                <div className="img-wrapper">
                  <img className="img-actual" src={`${env_api}${product.images}`} alt={product.name} />
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
                  <li className={`produk-modal-header-item supplier ${role_user === '2' ? 'd-none' : ''}`} onClick={() => changeActiveTab("supplier")}>Modal</li>
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

                  <div className="supplier-wrapper d-none">
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

            <div className="dialog-body-mobile">
              
              <div className="body-type-wrapper">
                <ul className="body-type">
                  <li className="type-item detail" onClick={() => changeActiveTabMobile("product")}>
                    <p className="type-title">Detail Produk</p>
                  </li>
                  <li className={`type-item supplier ${role_user === '2' ? 'invisible' : ''}`} onClick={() => changeActiveTabMobile("supplier")}>
                    <p className="type-title">Data Supplier</p>
                  </li>
                  <li className="type-active-indicator detail"></li>
                </ul>
              </div>
              
              <div className="body-product-detail">
                <div className="body-card">
                  <p className="card-title">{product.name} - {product.size}</p>
                  <p className="card-subtitle">Silahkan update stok barang ini, atau ubah detail produk</p>

                  <div className="card-img-wrapper">
                    <img className="img-actual" src={`${env_api}${product.images}`} alt="Manik Example" />
                  </div>

                  <ul className="card-details">
                    <li className="detail-items">
                      <p className="detail-title">Total Stok Saat Ini</p>
                      <p className="detail-value">{productStock} pcs</p>
                    </li>
                    <li className="detail-items">
                      <p className="detail-title">Harga</p>
                      <p className="detail-value">{formatToCurrency(product.price)}</p>
                    </li>
                    <li className="detail-items">
                      <p className="detail-title">Kategori Produk</p>
                      <p className="detail-value">{product.category_name}</p>
                    </li>
                    <li className="detail-items">
                      <p className="detail-title">Nama Produk</p>
                      <p className="detail-value">{product.name}</p>
                    </li>
                    <li className="detail-items">
                      <p className="detail-title">Ukuran</p>
                      <p className="detail-value">{product.size}</p>
                    </li>
                    <li className="detail-items">
                      <p className="detail-title">ID Produk</p>
                      <p className="detail-value">{product.id}</p>
                    </li>
                  </ul>

                </div>

                <div className={`body-edit-wrapper ${role_user === '2' ? 'invisible' : ''}`} onClick={() => editFromScan(product.id)}>
                  <img className="edit-icon" src={editIcon} alt="Edit Pencil" />
                  <p className="edit-text">Ubah detil produk</p>
                </div>

                <div className="dialog-button-mobile-wrapper">
                  <p className="button-title">Update stok produk?</p>
                  <div className="button-stock-update-wrapper">
                    <button className="add-dec-button" onClick={() => handleProductStock("+")}>+</button>
                    <div className="value-input-wrapper">
                      <p className="value-input-title">Stok di gudang</p>
                      <input className="value-input" type="text" value={productStock} onInput={(val) => setProductStock(val.target.value)} />
                    </div>
                    <button className="add-dec-button" onClick={() => handleProductStock("-")}>-</button>
                  </div>
                  <button className="button-submit" onClick={() => submitProduct()} disabled={isScanButtonDisabled()}>Simpan</button>
                </div>
              </div>

              <div className="body-suppliers-detail d-none">
                <div className="supplier-card-wrapper">
                { product && product.suppliers ? product.suppliers.map((item, index) => 
                  <div className="supplier-card" key={index}>
                    <ul className="supplier-card-item">
                      <li className="supplier-item">
                        <p className="item-title">Supplier</p>
                        <p className="item-value">{item}</p>
                      </li>
                      <li className="supplier-item">
                        <p className="item-title">Harga Modal</p>
                        <p className="item-value">{product.modals[index]}</p>
                      </li>
                      <li className="supplier-item">
                        <p className="item-title">Harga Modal Nett</p>
                        <p className="item-value">{product.modal_nett[index]} <span className="blue-dot"></span> {formatToCurrency(450000)}</p>
                      </li>
                      <li className="supplier-item">
                        <p className="item-title">Biaya Logistik</p>
                        <p className="item-value">{formatToCurrency(product.logistic_costs[index])}</p>
                      </li>
                      <li className="supplier-item">
                        <p className="item-title">Harga Jual</p>
                        <p className="item-value">{formatToCurrency(product.price)}</p>
                      </li>
                      <li className="supplier-item">
                        <p className="item-title">Margin</p>
                        <p className="item-value">{product.margins[index]}</p>
                      </li>
                    </ul>
                  </div>
                ) : <ul className="supplier-card-item"></ul> }
                </div>

                <div className="supplier-edit-wrapper d-none">
                  <div className="supplier-edit-item-wrapper">
                    <div className="edit-forms">
                      <div className="input-wrapper">
                        <label className="input-label" htmlFor="input-supplier">Supplier</label>
                        <input className="input-field" type="text" />
                      </div>
                      <div className="input-wrapper">
                        <label className="input-label" htmlFor="input-modal">Harga Modal</label>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" />
                        </div>
                      </div>
                      <div className="input-precentage-wrapper">
                        <div className="input-wrapper">
                          <label className="input-label" htmlFor="input-modal">Harga Modal Nett Per</label>
                          <div className="input-field-group">
                            <input className="input-field" type="text" />
                            <div className="input-postfield-wrapper">
                              <p className="input-postfield-text">%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <label className="input-label" htmlFor="input-modal">Biaya Logistik</label>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" />
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <label className="input-label" htmlFor="input-modal">Harga Jual</label>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" />
                        </div>
                      </div>
                      <p className="margin-value">Margin: 35%</p>
                    </div>
                    <div className="supplier-edit-separator"></div>
                  </div>
                </div>

                <div className="edit-supplier-button-wrapper">
                  <img className="edit-icon" src={editIcon} alt="Edit Pencil" />
                  <p className="edit-text">Ubah Data Supplier</p>
                </div>
              </div>

            </div>

            <div className="dialog-button-wrapper">
              <p className={`change-detail ${role_user === '2' ? 'd-none' : ''}`} onClick={() => editFromScan(product.id)}>
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
      minWidth: "unset",
      width: "100%",
      margin: 0,
      maxWidth: "unset",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
    }
 },
 paper2: {
  minWidth:"694px",
  "@media (max-width: 771px)": {
    minWidth: "unset",
    height: "100%",
    width: "100%",
    margin: 0,
    maxHeight: "unset",
    maxWidth: "unset",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  }
 }
}));
