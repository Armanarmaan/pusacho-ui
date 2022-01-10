import React, { useState } from 'react'
import Select from 'react-select'

import Slide from '@mui/material/Slide';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';

import '../../styles/Product.scss';

import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';

export default function Product() {
  const classes = useStyles();
  const env_api = process.env.REACT_APP_API_ENDPOINT;
  
  // Image Imports
  const gClose = require('../../assets/icons/gray-close-icon.svg').default;
  const cbIcon = require('../../assets/icons/close-blue-icon.svg').default;
  const bBlue = require('../../assets/icons/back-blue-arrow.svg').default;

  const magnifierIcon = require('../../assets/icons/magnifier-icon.svg').default;
  const scanIcon = require('../../assets/icons/scan-barcode-icon.svg').default;

  const addIcon = require('../../assets/icons/add-icon.svg').default;
  const editIcon = require('../../assets/icons/blue-pencil-icon.svg').default;
  const uploadImgPlaceholder = require('../../assets/icons/upload-img-placeholder.svg').default;
  
  const dotsIcon = require('../../assets/icons/three-blue-dots.svg').default;
  const lbArrow = require('../../assets/icons/light-blue-arrow.svg').default;

  const scanBarcode = require('../../assets/scan-barcode.png').default;
  const manikExample = require('../../assets/contoh-manik.png').default;

  // Options
  const categoryOptions = [
    { value: "Hitam", label: "Manik-manik Hitam" },
    { value: "Putih", label: "Manik-manik Putih" },
    { value: "Merah", label: "Manik-manik Merah" }
  ];

  const sortOptions = [
    { value: "Urutkan", label: "Urutkan" },
    { value: "Modal Termurah", label: "Modal Termurah" },
    { value: "Modal Termahal", label: "Modal Termahal" },
    { value: "Jumlah Terbanyak", label: "Jumlah Terbanyak" },
    { value: "Jumlah Paling Sedikit", label: "Jumlah Paling Sedikit" },
    { value: "Harga Jual Termurah", label: "Harga Jual Termurah" },
    { value: "Harga Jual Termahal", label: "Harga Jual Termahal" },
  ];

  // Functions
  const formatToCurrency = (num) => {
    return `Rp ${Number(num).toLocaleString("ID")}`;
  };

  // Handle Scan Dialog
  const [scanStep, setScanStep] = useState(1);
  const [showScan, setShowScan] = useState(false);
  const [scanCode, setScanCode] = useState("");
  const [scanProduct, setScanProduct] = useState();
  const [scanAmount, setScanAmount] = useState(0);

  const handleScanOpen = () => { setShowScan(true) };
  const handleScanClose = () => { setShowScan(false) };

  const handleScanCodeInput = (code) => {
    setScanCode(code);
  };

  const handleStockChange = (amount) => {
    const newAmount = (scanAmount + amount);
    setScanAmount(newAmount);
  };

  const setStockChange = (amount) => {
    setScanAmount(amount);
  };

  const nextScanStep = async (event) => {
    event.preventDefault();

    if (scanStep == 1) {
      const product = await fetch(`${env_api}/manajemen/products/${scanCode}`).then(response => response.json()).catch(error => console.log(error));
      setScanProduct(product.data);
      setScanAmount(product.data.stock);
      setScanStep(2);
    } else if (scanStep == 2) {
      console.log("Yuhu!")
    } 

  };
  const backScanStep = () => {
    if (scanStep == 2) setScanStep(1);
  };

  const isScanButtonDisabled = () => {
    if (scanStep == 1) return !(scanCode.length > 0)
    else if (scanStep == 2) return !(scanAmount > 0)
  };

  // Handle Add Dialog
  const [showAdd, setShowAdd] = useState(false);
  const [addType, setAddType] = useState();
  const [addStep, setAddStep] = useState(1);

  const handleAddOpen = (type) => { 
    setAddType(type);
    setShowAdd(true); 
  };
  const handleAddClose = () => { 
    setAddType("");
    setShowAdd(false); 
  };

  const nextAddStep = () => {
    setAddStep(2);
  }
  const backAddStep = () => {
    setAddStep(1);
  }

  const DialogAdd = () => {
    return (
      <Dialog
        open={showAdd}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
        >
          <div className="dialog-add-wrapper">
            { addType === "product" ? 
                <div className="dialog-add-product">
                  { addStep === 1 ? 
                    <div className="add-product-first-step">
                      <div className="dialog-header">
                        <h1 className="dialog-title">Tambah Produk</h1>
                        <button className="btn btn-close" onClick={handleAddClose}>
                          <img src={gClose} alt="Close Icon" />
                        </button>
                      </div>
                      
                      <div className="dialog-body">
                        <p className="dialog-subtitle">
                          Tambah jenis produk baru terlebih dahulu, lalu Anda bisa menambahkan varian warna, modal, modal nett, harga jual dan supplier.
                        </p>

                        <div className="input-wrapper no-margin">
                          <p className="input-title">Kategori</p>
                          <input className="input-field" type="text" />
                        </div>
                        <p className="dialog-second-subtitle">
                          Pilih kategori sesuai dengan produk yang ingin ditambahkan
                        </p>

                        <div className="input-wrapper">
                          <p className="input-title">Nama Produk</p>
                          <input className="input-field" type="text" />
                        </div>

                        <div className="input-wrapper">
                          <p className="input-title">Pilih Ukuran</p>
                          <input className="input-field" type="text" />
                        </div>

                        <div className="input-wrapper no-margin">
                          <p className="input-title">ID Produk</p>
                          <input className="input-field" type="text" />
                        </div>
                      </div>

                      <div className="dialog-button-wrapper">
                        <button className="btn btn-secondary">
                          Batal
                        </button>
                        <button className="btn btn-primary" onClick={nextAddStep}>
                          Selanjutnya
                        </button>
                      </div>
                    </div>
                    :
                    <div className="add-product-second-step">

                       <div className="dialog-header">
                        <div className="header-inner-wrapper">
                          <button className="btn-back" onClick={backAddStep}>
                            <img src={bBlue} alt="Blue Back Arrow" />
                          </button>
                          <h1 className="dialog-title">Tambah Produk</h1>
                        </div>
                        <button className="btn btn-close" onClick={handleAddClose}>
                          <img src={gClose} alt="Close Icon" />
                        </button>
                      </div>

                      <div className="dialog-body">
                        <p className="dialog-subtitle">
                          Silahkan tambahkan varian warna beserta jumlah stok dan catatan modal
                        </p>

                        <div className="dialog-inner-body">
                          <div className="image-color-amount-wrapper">
                            <div className="input-img-wrapper">
                              <input className="d-none" type="file" />
                              <div className="input-img-border">
                                <img className="img-placeholder" src={uploadImgPlaceholder} alt="Upload Img Placeholder"/>
                              </div>
                            </div>
                            <div className="image-color-amount-inner-wrapper">
                              <div className="input-wrapper color">
                                <p className="input-title">Warna</p>
                                <input className="input-field" type="text" />
                                <p className="input-subtitle">Contoh: <span className="bold">Hitam, merah, putih, </span>dll</p>
                              </div>
                              <div className="input-wrapper">
                                <p className="input-title">Jumlah</p>
                                <input className="input-field" type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="supplier-wrapper">
                            <div className="input-wrapper">
                              <p className="input-title">Supplier</p>
                              <input className="input-field" type="text" />
                            </div>
                            <div className="input-wrapper">
                              <p className="input-title">Modal</p>
                              <div className="input-field-group">
                                <div className="input-prefield-wrapper">
                                  <p className="input-prefield-text">Rp</p>
                                </div>
                                <input className="input-field" type="text" />
                              </div>
                            </div>
                            <div className="input-wrapper">
                              <p className="input-title">Modal Nett</p>
                              <div className="input-field-group">
                                <div className="input-prefield-wrapper">
                                  <p className="input-prefield-text">Rp</p>
                                </div>
                                <input className="input-field" type="text" />
                              </div>
                            </div>
                            <div className="input-wrapper">
                              <p className="input-title">Harga Jual</p>
                              <div className="input-field-group">
                                <div className="input-prefield-wrapper">
                                  <p className="input-prefield-text">Rp</p>
                                </div>
                                <input className="input-field" type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="add-supplier-wrapper">
                            <p className="add-supplier-text">
                              + Tambah Supplier
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="dialog-button-wrapper">
                        <button className="btn btn-secondary">
                          Tambahkan Varian Nanti
                        </button>
                        <button className="btn btn-primary" onClick={nextAddStep}>
                          Simpan
                        </button>
                      </div>
                    </div>
                  }
                </div>
              : addType === "category" ? 
                <div className="dialog-add-category">
                  <div className="dialog-header">
                    <h1 className="dialog-title">Tambah Kategori</h1>
                    <button className="btn btn-close" onClick={handleAddClose}>
                      <img src={gClose} alt="Close Icon" />
                    </button>
                  </div>

                  <div className="dialog-body">
                    <p className="dialog-subtitle">
                      Tambah jenis kategori agar mempermudah Anda melihat stok barang
                    </p>

                    <div className="input-category-wrapper">
                      <p className="input-category-title">Tambah Kategori</p>
                      <input className="input-category-field" type="text" />
                    </div>
                  </div>

                  <div className="dialog-button-wrapper">
                    <button className="btn btn-secondary">
                      Batal
                    </button>
                    <button className="btn btn-primary">
                      Selanjutnya
                    </button>
                  </div>
                </div>
              : ""
             }
          </div>
      </Dialog>
    )
  }

  return (
    <div className="container-manajemen-produk">
      <Navbar />
      <div className="container-manajemen-produk-content">
        <Header />

        <div className="product-list-outer-wrapper">

          <div className="product-list-header">

            <div className="product-filters-wrapper">
              <div className="search-product-wrapper">
                <input className="form-control input-search" name="search" type="search" placeholder="Cari Produk" />
                <div className="input-group-append">
                  <img src={magnifierIcon} alt="maginifier-icon" />
                </div>
              </div>
              <div className="filter-and-buttons-wrapper">
                <div className="filter-wrapper">
                  <Select placeholder="Kategori" options={categoryOptions} classNamePrefix="product-select" isMulti={true}/>
                  <Select placeholder="Urutkan" options={sortOptions} classNamePrefix="product-select-lc" />
                </div>

                <div className="button-wrapper">
                  <button className="button-primary button-scan" onClick={handleScanOpen}>
                    <img className="button-icon" src={scanIcon} alt="Scan Icon" />
                    <p className="button-text">Scan Produk</p>
                  </button>
                  <div className="add-button-wrapper">
                    <button className="button-primary button-add" onClick={() => handleAddOpen("product")}>
                      <img className="button-icon" src={addIcon} alt="Add Icon" />
                      <p className="button-text">Tambah</p>
                    </button>
                    <ul className="add-button-options d-none">
                      <li className="button-options">
                        <p className="option-text">Tambah Kategori</p>
                      </li>
                      <li className="button-options">
                        <p className="option-text">Tambah Produk</p>
                      </li>
                      <li className="button-options">
                        <p className="option-text">Tambah Sekaligus</p>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className="product-applied-filter-wrapper">
              <div className="filter-item">
                <p className="filter-title">Manik manik</p>
                <img src={cbIcon} alt="Close Icon" />
              </div>
              <div className="filter-item">
                <p className="filter-title">Manik manik</p>
                <img src={cbIcon} alt="Close Icon" />
              </div>
              <div className="filter-item">
                <p className="filter-title">Manik manik</p>
                <img src={cbIcon} alt="Close Icon" />
              </div>
              <div className="filter-item">
                <p className="filter-title">Manik manik</p>
                <img src={cbIcon} alt="Close Icon" />
              </div>
              <p className="reset-filter">Reset Kategori</p>
            </div>

          </div>

          <div className="product-list-content">
            <div className="product-list-table-wrapper">

              <table className="product-list-table">
                <thead className="product-list-table-head">
                  <tr>
                    <th className="head-checkbox"><input type="checkbox" /></th>
                    <th className="head-prod-name"><p className="table-title">Nama Produk</p></th>
                    <th className="head-prod-size"><p className="table-title">Ukuran</p></th>
                    <th className="head-prod-amount"><p className="table-title">Jumlah</p></th>
                    <th className="head-prod-margin"></th>
                    <th className="head-prod-dots"></th>
                  </tr>
                </thead>

                <tbody className="product-description">
                  <tr className="product-description-highlights">
                    <td className="product-description-item">
                      <input type="checkbox" />
                    </td>
                    <td className="product-description-item item-details">
                      <div className="img-and-name-wrapper">
                        <div className="img-wrapper"></div>
                        <div className="name-wrapper">
                          <p className="name-title">Manik-manik Hitam</p>
                          <p className="name-subtitle">
                            ID: 5684236583
                            <span className="blue-dot"></span>
                            Manik manik
                          </p>
                        </div>

                      </div>
                    </td>
                    <td className="product-description-item">
                      <p className="table-title">10 x 10 mm</p>
                    </td>
                    <td className="product-description-item">
                      <p className="table-title">20</p>
                    </td>
                    <td className="product-description-item" colSpan={2}>
                      <img src={dotsIcon} alt="maginifier-icon" />
                    </td>
                  </tr>
                  <tr className="product-description-pricing-detail">
                    <td className="product-description-outer-table" colSpan={6}>

                      <table className="product-pricing-table">
                        <thead className="product-pricing-header">
                          <tr>
                            <th className="head-item">
                              <p className="table-title">Supplier</p>
                            </th>
                            <th className="head-item">
                              <p className="table-title">Harga Modal</p>
                            </th>
                            <th className="head-item">
                              <p className="table-title">Harga Modal Nett</p>
                            </th>
                            <th className="head-item">
                              <p className="table-title">Biaya Logistik</p>
                            </th>
                            <th className="head-item">
                              <p className="table-title">Harga Jual</p>
                            </th>
                            <th className="head-item">
                              <p className="table-title">Margin</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="product-pricing-body">
                          <tr className="product-pricing-row">
                            <td className="product-supplier">
                              <input type="text" />
                              <input type="text" />
                              <input type="text" />
                            </td>
                            <td className="product-modal">
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                            </td>
                            <td className="product-modal-nett">
                              <div className="product-modal-nett-inner">
                                <div className="input-precentage">
                                  <input type="text" />
                                  <div className="input-append">
                                    <p className="append-text">%</p>
                                  </div>
                                </div>
                                <p className="price">{formatToCurrency(450000)}</p>
                              </div>
                              <div className="product-modal-nett-inner">
                                <div className="input-precentage">
                                  <input type="text" />
                                  <div className="input-append">
                                    <p className="append-text">%</p>
                                  </div>
                                </div>
                                <p className="price">{formatToCurrency(450000)}</p>
                              </div>
                              <div className="product-modal-nett-inner">
                                <div className="input-precentage">
                                  <input type="text" />
                                  <div className="input-append">
                                    <p className="append-text">%</p>
                                  </div>
                                </div>
                                <p className="price">{formatToCurrency(450000)}</p>
                              </div>
                            </td>
                            <td className="product-logistic">
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                            </td>
                            <td className="product-jual">
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                              <div className="input-pricing">
                                <div className="input-prepend">
                                  <p className="prepend-text">Rp</p>
                                </div>
                                <input type="text" />
                              </div>
                            </td>
                            <td className="product-margin">
                              <div className="margin-wrapper">
                                <p className="margin-text">35%</p>
                              </div>
                              <div className="margin-wrapper">
                                <p className="margin-text">35%</p>
                              </div>
                              <div className="margin-wrapper">
                                <p className="margin-text">35%</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    </td>
                  </tr>
                </tbody>

                <tbody className="product-see-more">
                  <tr className="product-see-more-row">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="see-more-wrapper" colSpan={2}>
                      <p className="see-all">
                        lihat selengkapnya
                        <img className="lb-arrow" src={lbArrow} alt="blue arrow" />
                      </p>
                    </td>
                  </tr>
                </tbody>


              </table>

             


            </div>
          </div>

        </div>
      </div>

      {/* Scan Dialog */}
      <Dialog
        open={showScan}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
      >
        <div className="dialog-scan-wrapper">
          { scanStep == 1 ?  
          <div className="scan-first-step">
            <form onSubmit={nextScanStep}>
              <div className="dialog-header">
                <h1 className="dialog-title">Scan Barcode</h1>
                <button className="btn btn-close" onClick={handleScanClose}>
                  <img src={gClose} alt="Close Icon" />
                </button>
              </div>
              
              <div className="dialog-body">
                <p className="dialog-subtitle">
                  Scan barcode yang ada di produk Anda untuk melihat data produk, atau memasukkan kode barcode di kolom bawah ini.
                </p>

                <img className="dialog-icon" src={scanBarcode} alt="Scan Barcode Illustration" />
                <input className="dialog-input-code" type="text" placeholder="Masukkan kode barcode" onInput={(val) => handleScanCodeInput(val.target.value)}/>

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
              <button className="btn btn-close" onClick={handleScanClose}>
                <img src={gClose} alt="Close Icon" />
              </button>
            </div>

            <div className="dialog-body">
              <p className="dialog-subtitle">
                Silahkan update stok barang ini, atau ubah detail produk.
              </p>

              <div className="img-and-update-stock-wrapper">
                <div className="img-wrapper">
                  <img src={manikExample} alt="Manik Manik"/>
                </div>
                <div className="update-stock-wrapper">
                  <p className="stock-title">{scanProduct.name} - {scanProduct.size}</p>

                  <div className="stock-value-wrapper">
                    <p className="stock-value-title">Update stok produk?</p>

                    <div className="button-input-wrapper">
                      <button className="add-dec-button" onClick={() => handleStockChange(-1)}>-</button>
                      <div className="value-input-wrapper">
                        <p className="value-input-title">Stok di gudang</p>
                        <input className="value-input" type="text" value={scanProduct.stock} onInput={(val) => setStockChange(val.target.value)}/>
                      </div>
                      <button className="add-dec-button" onClick={() => handleStockChange(1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detil-produk-and-modal-wrapper">

                <ul className="produk-modal-header">
                  <li className="produk-modal-header-item detil ">Detil Produk</li>
                  <li className="produk-modal-header-item modal active">Modal</li>
                  <div className="active-indicator modal"></div>
                </ul>

                <div className="produk-modal-body">
                  <div className="detil-produk-wrapper">
                    <ul className="detil-produk-left">
                      <li className="detil-produk-item">
                        <p className="produk-title">Kategori</p>
                        <p className="produk-value">{scanProduct.category_name}</p>
                      </li>
                      <li className="detil-produk-item">
                        <p className="produk-title">Nama Produk</p>
                        <p className="produk-value">{scanProduct.name}</p>
                      </li>
                    </ul>
                    <ul className="detil-produk-right">
                      <li className="detil-produk-item">
                        <p className="produk-title">Ukuran</p>
                        <p className="produk-value">{scanProduct.size}</p>
                      </li>
                      <li className="detil-produk-item">
                        <p className="produk-title">ID Produk</p>
                        <p className="produk-value">{scanProduct.id}</p>
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
                        {scanProduct && scanProduct.suppliers ? scanProduct.suppliers.map((item, index) => (
                          <tr key={index}>
                            <td>{item}</td>
                            <td>{formatToCurrency(scanProduct.modals[index])}</td>
                            <td>{formatToCurrency(scanProduct.modal_nett[index])}</td>
                            <td>{formatToCurrency(scanProduct.price)}</td>
                          </tr>
                        )) : <tr></tr> }
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
              <button className="btn btn-secondary">Batal</button>
              <button className="btn btn-primary" disabled={isScanButtonDisabled()}>Selanjutnya</button>
            </div>
          </div>
          }
        </div>
      </Dialog>
      
      {/* Add Dialog */}
      <DialogAdd />
    </div>
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

const Transition = React.forwardRef(function Transition(props, ref) {
  const direction = window.innerWidth >= 600 ? "down" : "up";
  return (
    <Slide
      direction={direction}
      ref={ref}
      {...props}
      timeout={{ enter: 300, exit: 150 }}
    />
  );
});

