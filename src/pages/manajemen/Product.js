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

  // Renders
  const PriceInput = (customClass, customFunction) => {
    return (
      <div className={`input-group ${customClass}`}>
        <div className="input-group-prepend">
          <span>Rp</span>
        </div>
        <input className="input-text" type="text" inputMode="numeric" />
      </div>
    )
  };

  const PrecentageInput = (customClass, customFunction) => {
    return (
      <div className={`input-group ${customClass}`}>
      <input className="input-text" type="text" inputMode="numeric" />
      <div className="input-group-append">
        <span>%</span>
      </div>
    </div>
    )
  };

  // Modals
  const [scanStep, setScanStep] = useState(1);
  const [showScan, setShowScan] = useState(false);

  const handleScanOpen = () => { setShowScan(true) };
  const handleScanClose = () => { setShowScan(false) };

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

  const DialogScan = () => {
    return (
      <Dialog
        open={showScan}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
      >
        <div className="dialog-scan-wrapper">
          { scanStep == 1 ?  
          <div className="scan-first-step">
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
              <input className="dialog-input-code" type="text" placeholder="Masukkan kode barcode"/>

            </div>

            <div className="dialog-button-wrapper">
              <button className="btn btn-primary" onClick={() => setScanStep(2)}>Selanjutnya</button>
            </div>
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
                  <p className="stock-title">Manik manik hitam - 10 x 10 mm</p>

                  <div className="stock-value-wrapper">
                    <p className="stock-value-title">Update stok produk?</p>

                    <div className="button-input-wrapper">
                      <button className="add-dec-button">-</button>
                      <div className="value-input-wrapper">
                        <p className="value-input-title">Stok di gudang</p>
                        <input className="value-input" type="text" />
                      </div>
                      <button className="add-dec-button">+</button>
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
                  <div className="detil-produk-wrapper d-none">
                    <ul className="detil-produk-left">
                      <li className="detil-produk-item">
                        <p className="produk-title">Kategori</p>
                        <p className="produk-value">Manik manik</p>
                      </li>
                      <li className="detil-produk-item">
                        <p className="produk-title">Nama Produk</p>
                        <p className="produk-value">Manik manik hitam</p>
                      </li>
                    </ul>
                    <ul className="detil-produk-right">
                      <li className="detil-produk-item">
                        <p className="produk-title">Ukuran</p>
                        <p className="produk-value">10 x 10 mm</p>
                      </li>
                      <li className="detil-produk-item">
                        <p className="produk-title">ID Produk</p>
                        <p className="produk-value">5684236583</p>
                      </li>
                    </ul>
                  </div>

                  <div className="modal-wrapper">
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
                        <tr>
                          <td>Jaya Mustika</td>
                          <td>{formatToCurrency(550000)}</td>
                          <td>{formatToCurrency(550000)}</td>
                          <td>{formatToCurrency(550000)}</td>
                        </tr>
                        <tr>
                          <td>Jaya Mustika 2</td>
                          <td>{formatToCurrency(550000)}</td>
                          <td>{formatToCurrency(550000)}</td>
                          <td>{formatToCurrency(550000)}</td>
                        </tr>
                        <tr>
                          <td>Jaya Mustika 3</td>
                          <td>{formatToCurrency(550000)}</td>
                          <td>{formatToCurrency(550000)}</td>
                          <td>{formatToCurrency(550000)}</td>
                        </tr>
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
              <button className="btn btn-primary">Selanjutnya</button>
            </div>
          </div>
          }
        </div>
      </Dialog>
    )
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
            <div className="product-list-table">

             


            </div>
          </div>

        </div>
      </div>

      <DialogScan />
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

