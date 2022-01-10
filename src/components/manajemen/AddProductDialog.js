import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import Dialog from '@mui/material/Dialog';
import { makeStyles } from "@mui/styles";

import $ from "jquery";
import { circularProgressClasses } from '@mui/material';

export default function AddProductDialog({ showModal, closeModal }) {
  const classes = useStyles();

  // Constant data
  const env_api = process.env.REACT_APP_API_ENDPOINT;

   // Asset Imports
   const gClose = require('../../assets/icons/gray-close-icon.svg').default;
   const bBlue = require('../../assets/icons/back-blue-arrow.svg').default;
   const uploadImgPlaceholder = require('../../assets/icons/upload-img-placeholder.svg').default;
   const rTrashCan = require('../../assets/icons/red-trashcan.svg').default;

  // Fetch Data for page
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    const env_api = process.env.REACT_APP_API_ENDPOINT;

    const categories = await fetch(`${env_api}/manajemen/categories`)
                                  .then(response => response.json())
                                  .catch(error => console.log(error));
    setCategories(categories ? categories.data : []);
  };

  useEffect( () => {
    fetchCategory();
  }, []);

  // Functions filling values of add product
  const [addProduct, setAddProduct] = useState({
    id: "",
    category: "",
    name: "",
    size: "",
    price: [],
    stock: 0,
    suppliers: [],
    modals: [],
    modal_nett: [],
    modal_nett_per: [],
    logistic_costs: [],
    margins: []
  });

   const handleCategoryInput = (val) => {
     setAddProduct({ ...addProduct, category: val });
   };

   const handleNameInput = (val) => {
     setAddProduct({ ...addProduct, name: val });
   };

   const handleSizeInput = (val) => {
    setAddProduct({ ...addProduct, size: val });
  };

  const handleIdInput = (val) => {
    setAddProduct({ ...addProduct, id: val });
  };

  const handleAmountInput = (val) => {
    setAddProduct({ ...addProduct, stock: val });
  };

  const handleSupplierName = (val, index) => {
    let newSupplier = addProduct.suppliers;
    newSupplier[index] = val;
    setAddProduct({...addProduct, suppliers: newSupplier});
  };

  const handleModalValue = (val, index) => {
    let newModal = addProduct.modals;
    newModal[index] = val;
    setAddProduct({...addProduct, modals: newModal});
  };

  const handleModalNettValue = (val, index) => {
    let newModalNett = addProduct.modal_nett;
    newModalNett[index] = val;
    setAddProduct({...addProduct, modal_nett: newModalNett});
  };

  const handleLogisticValue = (val, index) => {
    let newLogistic = addProduct.logistic_costs;
    newLogistic[index] = val;
    setAddProduct({...addProduct, logistic_costs: newLogistic});
  };

  const handlePriceValue = (val, index) => {
    let newPrice = addProduct.price;
    newPrice[index] = val;
    setAddProduct({...addProduct, price: newPrice});
  };

  const handleMarginValue = (val, index) => {
    let newMargin = addProduct.margins;
    newMargin[index] = val;
    setAddProduct({...addProduct, margins: newMargin});
  };

  const handleModalNettPer = (val, index) => {
    let newModalNetPerr = addProduct.modal_nett_per;
    newModalNetPerr[index] = val;
    setAddProduct({...addProduct, modal_nett_per: newModalNetPerr});
  };

  // Supplier add / remove
  const [supplierCount, setSupplierCount] = useState(1);
  const addSupplierAmount = () => {
    const amount = supplierCount;
    setSupplierCount(amount + 1);
    setAddProduct({
      ...addProduct,
      price: [...addProduct.price, ""],
      suppliers: [...addProduct.suppliers, ""],
      modals: [...addProduct.modals, ""],
      modal_nett: [...addProduct.modal_nett, ""],
      modal_nett_per: [...addProduct.modal_nett_per, ""],
      logistic_costs: [...addProduct.logistic_costs, ""],
      margins: [...addProduct.margins, ""],
    });
  };

  const [chosenSupplier, setChosenSupplier] = useState([]);
  const handleChosenSupplier = (val) => {
    let chosenArray = chosenSupplier;
    
    if (!chosenArray.includes(val)) chosenArray = [...chosenArray, val];
    else chosenArray = chosenArray.filter(item => item !== val);

    setChosenSupplier(chosenArray);
  };

  const deleteChosenSupplier = (val) => {
    // On Progress    
  };
  
  // Steps
  const [addStep, setAddStep] = useState(1);

  const isDisabled = () => {
    if (addStep === 1) {
      return !(addProduct.category !== "") ||
            !(addProduct.name !== "") ||
            !(addProduct.size !== "") ||
            !(addProduct.id !== "")
    } else {
      return !(addProduct.suppliers.length > 0) ||
            !(addProduct.modals.length > 0) ||
            !(addProduct.modal_nett.length > 0) ||
            !(addProduct.price.length > 0)
    }
  }

  const nextAddStep = async () => {
    if (addStep === 1) {
      setAddStep(2);
    } else {
      const submitProductData = {
        id: addProduct.id,
        category: addProduct.category,
        name: addProduct.name,
        size: addProduct.size,
        price: addProduct.price[0],
        stock: addProduct.stock,
        suppliers: addProduct.suppliers.join("|"),
        modals: addProduct.modals.join("|"),
        modal_nett: addProduct.modal_nett.join("|"),
        modal_nett_per: addProduct.modal_nett_per.join("|"),
        logistic_costs: addProduct.logistic_costs.join("|"),
        margins: addProduct.margins.join("|")
      };

      console.log(submitProductData);

      const submitProduct =  await fetch(`${env_api}/manajemen/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitProductData)
      })
      .then(() => {
        closeModal();
        setAddStep(1);
        setAddProduct({ id: "", category: "", name: "", size: "", price: [], stock: 0, suppliers: [], modals: [], modal_nett: [], logistic_costs: [], margins: [] });
        setSupplierCount(1);
        setChosenSupplier([]);
      }).catch(error => console.log(error));
    }
  };

  const backAddStep = () => {
    if (addStep === 2) setAddStep(1);
  };

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
                <Select placeholder="" options={categories} classNamePrefix="category-select-add" onChange={(val) => handleCategoryInput(val.value)}/>
              </div>
              <p className="dialog-second-subtitle">
                Pilih kategori sesuai dengan produk yang ingin ditambahkan
              </p>

              <div className="input-wrapper">
                <p className="input-title">Nama Produk</p>
                <input className="input-field" type="text" onInput={(val) => handleNameInput(val.target.value)}/>
              </div>

              <div className="input-wrapper">
                <p className="input-title">Masukkan Ukuran</p>
                <input className="input-field" type="text" onInput={(val) => handleSizeInput(val.target.value)}/>
              </div>

              <div className="input-wrapper no-margin">
                <p className="input-title">ID Produk</p>
                <input className="input-field" type="text" onInput={(val) => handleIdInput(val.target.value)}/>
              </div>
            </div>

            <div className="dialog-button-wrapper">
              <button className="btn btn-secondary">
                Batal
              </button>
              <button className="btn btn-primary" disabled={isDisabled()} onClick={nextAddStep}>
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
                    <div className="input-wrapper">
                      <p className="input-title">Jumlah</p>
                      <input className="input-field" type="text" onInput={(val) => handleAmountInput(val.target.value)}/>
                    </div>
                  </div>
                </div>
                {supplierCount && supplierCount > 0 ?
                  [...Array(supplierCount)].map((item, index) =>
                    <div className="supplier-wrapper" key={index}>
                      { supplierCount > 1 ? <input type="checkbox" className="input-checkbox" onChange={() => handleChosenSupplier(index)}/> : "" }
                      <div className="input-wrapper">
                        <p className="input-title">Supplier</p>
                        <input className="input-field" type="text" onInput={(val) => handleSupplierName(val.target.value, index)}/>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Modal</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" onInput={(val) => handleModalValue(val.target.value, index)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Modal Nett</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" onInput={(val) => handleModalNettValue(val.target.value, index)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Modal Nett Per</p>
                        <input className="input-field" type="text" onInput={(val) => handleModalNettPer(val.target.value, index)}/>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Logistik</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" onInput={(val) => handleLogisticValue(val.target.value, index)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Harga Jual</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" onInput={(val) => handlePriceValue(val.target.value, index)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Margin</p>
                        <input className="input-field" type="text" onInput={(val) => handleMarginValue(val.target.value, index)}/>
                      </div>
                    </div>
                  )
                  : ""
                }

                <div className={`add-supplier-wrapper ${chosenSupplier.length > 0 ? "delete-supplier-wrapper" : ""}`}>
                  <div className="delete-text-wrapper">
                    <img src={rTrashCan} className="delete-icon" alt="RedTrashCan" />
                    <p className="delete-supplier-text" onClick={() => deleteChosenSupplier()}>Hapus Supplier</p>
                  </div>
                  <p className="add-supplier-text" onClick={() => addSupplierAmount()}>
                    + Tambah Supplier
                  </p>
                </div>
              </div>
            </div>

            <div className="dialog-button-wrapper">
              <button className="btn btn-secondary">
                Tambahkan Varian Nanti
              </button>
              <button className="btn btn-primary" disabled={isDisabled()} onClick={nextAddStep}>
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
    minWidth:"1112px",
    "@media (max-width: 771px)": {
      width: "100%",
      margin: 0,
      maxWidth: "unset",
    }
 },
}));
