import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import Dialog from '@mui/material/Dialog';
import { makeStyles } from "@mui/styles";

import $ from "jquery";

export default function EditProductDialog({ showModal, closeModal }) {
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
  const [product, setProduct] = useState({
    id: "",
    category_id: "",
    category_name: "",
    name: "",
    size: "",
    price: 0,
    stock: 0,
    suppliers: [""],
    modals: [""],
    modal_nett: [""],
    modal_nett_per: [""],
    logistic_costs: [""],
    margins: [""]
  })

  const fetchCategory = async () => {
    const env_api = process.env.REACT_APP_API_ENDPOINT;

    const categories = await fetch(`${env_api}/manajemen/categories`)
                                  .then(response => response.json())
                                  .catch(error => console.log(error));
    setCategories(categories ? categories.data : []);
  };

  const fetchProduct = async () => {
    const env_api = process.env.REACT_APP_API_ENDPOINT;

    if (typeof window !== undefined) {
      const pid = localStorage.getItem("editId");
      if (pid) {
        const product = await fetch(`${env_api}/manajemen/products/${pid}`)
                                      .then(response => response.json())
                                      .catch(error => console.log(error));
        if (product) { 
          setProduct(product.data) 
          setSupplierCount(product.data.suppliers.length);
        }
      }
    }
  }

  useEffect( () => {
    fetchCategory();
    fetchProduct();
  }, [showModal]);

   const handleCategoryInput = (val) => {
     setProduct({ ...product, category_id: val.value, category_name: val.label });
   };

   const handleNameInput = (val) => {
     setProduct({ ...product, name: val });
   };

   const handleSizeInput = (val) => {
    setProduct({ ...product, size: val });
  };

  const handleAmountInput = (val) => {
    setProduct({ ...product, stock: val });
  };

  const handleSupplierName = (val, index) => {
    let newSupplier = product.suppliers;
    newSupplier[index] = val;
    setProduct({...product, suppliers: newSupplier});
  };

  const handleModalValue = (val, index) => {
    let newModal = product.modals;
    newModal[index] = val;
    setProduct({...product, modals: newModal});
  };

  const handleModalNettValue = (val, index) => {
    let newModalNett = product.modal_nett;
    newModalNett[index] = val;
    setProduct({...product, modal_nett: newModalNett});
  };

  const handleLogisticValue = (val, index) => {
    let newLogistic = product.logistic_costs;
    newLogistic[index] = val;
    setProduct({...product, logistic_costs: newLogistic});
  };

  const handlePriceValue = (val) => {
    setProduct({...product, price: val});
  };

  const handleMarginValue = (val, index) => {
    let newMargin = product.margins;
    newMargin[index] = val;
    setProduct({...product, margins: newMargin});
  };

  const handleModalNettPer = (val, index) => {
    let newModalNetPerr = product.modal_nett_per;
    newModalNetPerr[index] = val;
    setProduct({...product, modal_nett_per: newModalNetPerr});
  };

  // Supplier add / remove
  const [supplierCount, setSupplierCount] = useState(1);
  const addSupplierAmount = () => {
    const amount = supplierCount;
    setSupplierCount(amount + 1);
    setProduct({
      ...product,
      suppliers: [...product.suppliers, ""],
      modals: [...product.modals, ""],
      modal_nett: [...product.modal_nett, ""],
      modal_nett_per: [...product.modal_nett_per, ""],
      logistic_costs: [...product.logistic_costs, ""],
      margins: [...product.margins, ""],
    });
  };

  const [chosenSupplier, setChosenSupplier] = useState([]);
  const handleChosenSupplier = (val) => {
    let chosenArray = chosenSupplier;
    
    if (!chosenArray.includes(val)) chosenArray = [...chosenArray, val];
    else chosenArray = chosenArray.filter(item => item !== val);

    setChosenSupplier(chosenArray);
  };

  const deleteChosenSupplier = () => {
    const deleteList = chosenSupplier;
    let newProduct = product;

    // Delete Item
    deleteList.forEach(item => {
      $(`.supplier-wrapper-${item}`).remove();
      newProduct.suppliers = newProduct.suppliers.splice(item, 1)
      newProduct.modals = newProduct.modals.splice(item, 1)
      newProduct.modal_nett = newProduct.modal_nett.splice(item, 1)
      newProduct.modal_nett_per = newProduct.modal_nett_per.splice(item, 1)
      newProduct.logistic_costs = newProduct.logistic_costs.splice(item, 1)
      newProduct.margins = newProduct.margins.splice(item, 1)
    });

    setProduct(newProduct);
    setChosenSupplier(0);
  };
  
  // Steps
  const [addStep, setAddStep] = useState(1);

  const isDisabled = () => {
    if (addStep === 1) {
      return !(product.category !== "") ||
            !(product.name !== "") ||
            !(product.size !== "") ||
            !(product.id !== "")
    } else {
      return !(product.suppliers.length > 0) ||
            !(product.modals.length > 0) ||
            !(product.modal_nett.length > 0) ||
            !(product.price > 0) ||
            !(product.margins.length > 0)
    }
  }

  const nextAddStep = async () => {
    if (addStep === 1) {
      setAddStep(2);
    } else {
      const submitProductData = {
        id: product.id,
        category: product.category_id,
        name: product.name,
        size: product.size,
        price: product.price,
        stock: product.stock,
        suppliers: product.suppliers.join("|"),
        modals: product.modals.join("|"),
        modal_nett: product.modal_nett.join("|"),
        modal_nett_per: product.modal_nett_per.join("|"),
        logistic_costs: product.logistic_costs.join("|"),
        margins: product.margins.join("|")
      };

      const submitProduct =  await fetch(`${env_api}/manajemen/product/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitProductData)
      })
      .then(() => {
        closeModal();
        setAddStep(1);
        setProduct({ id: "", category: "", name: "", size: "", price: [], stock: 0, suppliers: [], modals: [], modal_nett: [], logistic_costs: [], margins: [] });
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
                <Select placeholder="" options={categories} classNamePrefix="category-select-add" value={{ value: product.category_id, label: product.category_name }} onChange={(val) => handleCategoryInput(val)}/>
              </div>
              <p className="dialog-second-subtitle">
                Pilih kategori sesuai dengan produk yang ingin ditambahkan
              </p>

              <div className="input-wrapper">
                <p className="input-title">Nama Produk</p>
                <input className="input-field" type="text" value={product.name} onInput={(val) => handleNameInput(val.target.value)}/>
              </div>

              <div className="input-wrapper">
                <p className="input-title">Masukkan Ukuran</p>
                <input className="input-field" type="text" value={product.size} onInput={(val) => handleSizeInput(val.target.value)}/>
              </div>

              <div className="input-wrapper no-margin">
                <p className="input-title">ID Produk</p>
                <input className="input-field" type="text" value={product.id} readOnly/>
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
                      <input className="input-field" type="text" value={product.stock} onInput={(val) => handleAmountInput(val.target.value)}/>
                    </div>
                  </div>
                </div>
                {supplierCount && supplierCount > 0 ?
                  [...Array(supplierCount)].map((item, index) =>
                    <div className={`supplier-wrapper supplier-wrapper-${index}`} key={index}>
                      { supplierCount > 1 && index !== 0 ? <input type="checkbox" className="input-checkbox" onChange={() => handleChosenSupplier(index)}/> : "" }
                      <div className="input-wrapper">
                        <p className="input-title">Supplier</p>
                        <input className="input-field" type="text" value={product.suppliers[index]} onInput={(val) => handleSupplierName(val.target.value, index)}/>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Modal</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" value={product.modals[index]} onInput={(val) => handleModalValue(val.target.value, index)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Modal Nett</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" value={product.modal_nett[index]} onInput={(val) => handleModalNettValue(val.target.value, index)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Modal Nett Per</p>
                        <input className="input-field" type="text" value={product.modal_nett_per[index]} onInput={(val) => handleModalNettPer(val.target.value, index)}/>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Logistik</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" value={product.logistic_costs[index]} onInput={(val) => handleLogisticValue(val.target.value, index)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Harga Jual</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" value={product.price} onInput={(val) => handlePriceValue(val.target.value)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Margin</p>
                        <input className="input-field" type="text" value={product.margins[index]} onInput={(val) => handleMarginValue(val.target.value, index)}/>
                      </div>
                    </div>
                  )
                  : ""
                }

                <div className={`add-supplier-wrapper ${chosenSupplier.length > 0 ? "delete-supplier-wrapper" : ""}`}>
                  <div className="delete-text-wrapper" onClick={() => deleteChosenSupplier()}>
                    <img src={rTrashCan} className="delete-icon" alt="RedTrashCan" />
                    <p className="delete-supplier-text">Hapus Supplier</p>
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
