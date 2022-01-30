import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import { makeStyles } from "@mui/styles";

import $ from "jquery";

export default function AddCategoryDialog({ showModal, closeModal }) {
  const classes = useStyles();

  // Constant data
  const env_api = process.env.REACT_APP_API_ENDPOINT;

  // Asset Imports
  const gClose = require('../../assets/icons/gray-close-icon.svg').default;
  const Garis = require('../../assets/icons/Garis.svg').default;

  // Category Name
  const [categoryName, setCategoryName] = useState("");
  const handleCategory = (val) => {
    setCategoryName(val);
  };

  // Functions
  const handleCloseModal = (event) => {
    event.preventDefault();
    setCategoryName("");
    closeModal();
  };

  const addCategory = async () => {
    const postCategory = await fetch(`${env_api}/manajemen/categories/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: categoryName })
    })
      .then(() => {
        closeModal();
        setCategoryName("");
        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  const isDisabled = () => {
    return !(categoryName !== "");
  };

  return (
    <Dialog
      open={showModal}
      fullWidth={true}
      classes={{ container: classes.root, paper: classes.paper }}
      onClose={handleCloseModal}
    >
      <div className="add-category-wrapper">
        <div className="garis">
          <img src={Garis} alt="garis" className="img" />
        </div>
        <div className="dialog-header">
          <h1 className="dialog-title">Tambah Kategori</h1>
          <button className="btn btn-close" onClick={handleCloseModal}>
            <img src={gClose} alt="Close Icon" />
          </button>
        </div>

        <div className="dialog-body">
          <p className="dialog-subtitle">
            Tambah jenis kategori agar mempermudah Anda melihat stok barang
          </p>

          <div className="input-category-wrapper">
            <p className="input-category-title">Nama Kategori</p>
            <input className="input-category-field" type="text" value={categoryName} onInput={(val) => handleCategory(val.target.value)} />
          </div>
        </div>

        <div className="dialog-button-wrapper">
          <button className="btn btn-secondary" onClick={() => handleCloseModal()}>
            Batal
          </button>
          <button className="btn btn-primary" disabled={isDisabled()} onClick={() => addCategory()}>
            Selanjutnya
          </button>
        </div>
        <div className="dialog-button-wrapper-mobile">
          <button className="btn btn-primary" disabled={isDisabled()} onClick={() => addCategory()}>
            Selanjutnya
          </button>
        </div>
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
    minWidth: "694px",
    "@media (max-width: 771px)": {
      width: "100%",
      margin: 0,
      maxWidth: "unset",
    }
  },
}));
