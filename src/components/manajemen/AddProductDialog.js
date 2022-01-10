import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import { makeStyles } from "@mui/styles";

import $ from "jquery";

export default function AddProductDialog({ showModal, closeModal }) {
  const classes = useStyles();

  // Steps
  const [addStep, setAddStep] = useState(1);
  const nextAddStep = () => {
    if (addStep === 1) {
      setAddStep(2);
    } else {
      console.log("Yuhu!");
    }
  };

  const backAddStep = () => {
    if (addStep === 2) setAddStep(1);
  };

  // Asset Imports
  const gClose = require('../../assets/icons/gray-close-icon.svg').default;
  const bBlue = require('../../assets/icons/back-blue-arrow.svg').default;
  const uploadImgPlaceholder = require('../../assets/icons/upload-img-placeholder.svg').default;
 
  // Close Modal
  const handleCloseModal = (event) => {

    closeModal();
  };

  return (
    <Dialog
      open={showModal}
      fullWidth={true}
      classes={{ container: classes.root, paper: classes.paper }}
    >
      <div className="add-product-wrapper">
        { addStep === 1 ? 
          <div className="add-product-first-step">
            <div className="dialog-header">
              <h1 className="dialog-title">Tambah Produk</h1>
              <button className="btn btn-close" onClick={handleCloseModal}>
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
              <button className="btn btn-close" onClick={handleCloseModal}>
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
