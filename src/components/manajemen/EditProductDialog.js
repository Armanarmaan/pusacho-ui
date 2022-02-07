import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import Dialog from '@mui/material/Dialog';
import { makeStyles } from "@mui/styles";

import $ from "jquery";

export default function EditProductDialog({ showModal, closeModal, auth }) {
  const classes = useStyles();

  // Constant data
  const env_api = process.env.REACT_APP_API_ENDPOINT;

   // Asset Imports
   const gClose = require('../../assets/icons/gray-close-icon.svg').default;
   const bBlue = require('../../assets/icons/back-blue-arrow.svg').default;
   const uploadImgPlaceholder = require('../../assets/icons/upload-img-placeholder.svg').default;
   const rTrashCan = require('../../assets/icons/red-trashcan.svg').default;

   // Asset Imports mobile
  const bWhite = require('../../assets/icons/back-white-icon.svg').default;

  // Fetch Data for page
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    auth: auth,
    images: "",
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
  });
  
  const [originalProduct, setOriginalProduct] = useState({
    auth: auth,
    images: "",
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
  });

  const fetchCategory = async () => {
    const env_api = process.env.REACT_APP_API_ENDPOINT;

    const categories = await fetch(`${env_api}/manajemen/categories`, {
      headers: { 
        "Content-Type": "application/json", 
        "auth_token": localStorage.getItem("auth_token"),
        "required_role": "0,2"
      },
    })
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
          setOriginalProduct(product.data);
          setSupplierCount(product.data.suppliers.length);
        }
      }
    }
  };

  useEffect( () => {
    fetchCategory();
    fetchProduct();
  }, [showModal]);

  const uploadImage = () => {
    const fileInput = $("#upload-image")[0];
    const fileReader = new FileReader();

    try {
      fileReader.readAsDataURL(fileInput.files[0]);
      fileReader.onload = (file) => {
        $(".img-actual").attr("src", file.target.result);

        $(".img-placeholder").addClass("d-none");
        $(".img-actual").removeClass("d-none");

        setProduct({ ...product, images: fileInput.files[0] })
      }
    } catch(error) {
      console.log(error)
    }
  };

   const handleCategoryInput = (val) => {
     setProduct({ ...product, category_id: val.value, category_name: val.label });
   };

   const handleNameInput = (val) => {
     setProduct({ ...product, name: val, orig_name: originalProduct.name });
   };

   const handleSizeInput = (val) => {
    setProduct({ ...product, size: val, orig_size: originalProduct.size });
  };

  const handleAmountInput = (val) => {
    setProduct({ ...product, stock: val, orig_stock: originalProduct.stock });
  };

  const handleSupplierName = (val, index) => {
    let newSupplier = product.suppliers;
    newSupplier[index] = val;
    setProduct({...product, suppliers: newSupplier, orig_suppliers: originalProduct.suppliers });
  };

  const handleModalValue = (val, index) => {
    let newModal = product.modals;
    newModal[index] = val;
    setProduct({...product, modals: newModal, orig_modal: originalProduct.modals });
  };

  const handleLogisticValue = (val, index) => {
    let newLogistic = product.logistic_costs;
    newLogistic[index] = val;
    setProduct({...product, logistic_costs: newLogistic, orig_logistic: originalProduct.logistic_costs });
  };

  const handlePriceValue = (val) => {
    setProduct({...product, price: val, orig_price: originalProduct.price });
  };

  const handleModalNettPer = (val, index) => {
    let newModalNetPerr = product.modal_nett_per;
    newModalNetPerr[index] = val;
    setProduct({...product, modal_nett_per: newModalNetPerr, orig_modal_nett: originalProduct.modal_nett_per });
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
      modal_nett_per: [...product.modal_nett_per, ""],
      logistic_costs: [...product.logistic_costs, ""],
    });
  };

  const [chosenSupplier, setChosenSupplier] = useState([]);
  const handleChosenSupplier = (val) => {
    let chosenArray = chosenSupplier;
    
    if (!chosenArray.includes(val + 1)) chosenArray = [...chosenArray, val];
    else chosenArray = chosenArray.filter(item => item !== val);

    setChosenSupplier(chosenArray);
  };

  const deleteChosenSupplier = () => {
    const deleteList = chosenSupplier;
    let newProduct = product;

    // Delete Item
    deleteList.forEach(item => {
      $(`.supplier-wrapper-${item}`).remove();
      newProduct.suppliers.splice(item, 1)
      newProduct.modals.splice(item, 1)
      newProduct.modal_nett.splice(item, 1)
      newProduct.modal_nett_per.splice(item, 1)
      newProduct.logistic_costs.splice(item, 1)
      newProduct.margins.splice(item, 1)
    });


    setProduct(newProduct);
    setChosenSupplier([]);
  };

  const deleteMobileChosenSupplier = (index) => {
    let newProduct = product;

    // Delete Item
    $(`.supplier-wrapper-${index}`).remove();
    newProduct.suppliers.splice(index, 1)
    newProduct.modals.splice(index, 1)
    newProduct.modal_nett.splice(index, 1)
    newProduct.modal_nett_per.splice(index, 1)
    newProduct.logistic_costs.splice(index, 1)
    newProduct.margins.splice(index, 1)

    setProduct(newProduct);
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
      const modal_nett = [];
      const margins = [];

      // Modal Nett Calc.
      product.modal_nett_per.forEach((precentage, index) => {
        let newModal = product.modals[index];
        const precentageList = precentage.split("|");
        precentageList.map(percent => {
          newModal = newModal - (newModal * (percent/100)) 
        })
        modal_nett.push(newModal);
      });
      // Margin Calc.
      modal_nett.forEach((modal, index) => {
        let newMargin = ((product.price - modal) / modal) * 100;
        margins.push(newMargin.toFixed(0));
      });

      const submitProductData = {
        auth: auth,
        id: product.id,
        category: product.category_id,
        name: product.name,
        orig_name: product.orig_name,
        size: product.size,
        price: product.price,
        orig_price: product.orig_price,
        stock: product.stock,
        orig_stock: product.orig_stock,
        suppliers: product.suppliers.join("|"),
        orig_suppliers: product.orig_suppliers,
        modals: product.modals.join("|"),
        orig_modal: product.orig_modal,
        modal_nett_per: product.modal_nett_per.join("|"),
        orig_modal_nett_per: product.orig_modal_nett_per,
        modal_nett: modal_nett.join("|"),
        orig_modal_nett: originalProduct.modal_nett,
        logistic_costs: product.logistic_costs.join("|"),
        orig_logistic: product.orig_logistic,
        margins: margins.join("|"),
        orig_margin: originalProduct.margins
      };

      let formData = new FormData();
      formData.append("data", JSON.stringify(submitProductData));
      if (typeof(product.images) == "object") formData.append("image", product.images, product.id);

      const submitProduct =  await fetch(`${env_api}/manajemen/product/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth_token": localStorage.getItem("auth_token"),
          "required_role": "0,2"
        },
        body: formData
      })
      .then(() => {
        closeModal();
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
      classes={{ container: classes.root, paper: addStep === 1 ? classes.paper : classes.paper2 }}
    >
      <div className="edit-product-wrapper">
        { addStep === 1 ? 
          <div className="edit-product-first-step">
            <div className="dialog-header">
              <h1 className="dialog-title">Edit Produk</h1>
              <button className="btn btn-close" onClick={handleCloseModal}>
                <img src={gClose} alt="Close Icon" />
              </button>
            </div>
            
            <div className="dialog-body">
              <p className="dialog-subtitle">
                Ubah data produk yang telah ada.
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
          <div className="edit-product-second-step">

            <div className="dialog-header">
              <div className="header-inner-wrapper">
                <button className="btn-back" onClick={backAddStep}>
                  <img className="back-desktop" src={bBlue} alt="Blue Back Arrow" />
                  <img className="back-mobile" src={bWhite} alt="White Back Arrow" />
                </button>
                <h1 className="dialog-title">Edit Produk</h1>
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
                    <input className="d-none" id="upload-image" type="file" onChange={(val) => uploadImage(val)}/>
                    <label className="input-img-border" htmlFor="upload-image">
                      <img className="img-actual d-none" alt="Uploaded image"/>
                      <img className="img-placeholder" src={`${env_api}${product.images}`} alt="Upload Img Placeholder"/>
                    </label>
                  </div>
                  <div className="image-color-amount-inner-wrapper">
                    <div className="input-wrapper">
                      <p className="input-title">Jumlah</p>
                      <input className="input-field" type="text" value={product.stock} onInput={(val) => handleAmountInput(val.target.value)}/>
                    </div>
                  </div>
                </div>

                <div className="mobile-separator"></div>

                {supplierCount && supplierCount > 0 ?
                  [...Array(supplierCount)].map((item, index) =>
                    <div className={`supplier-wrapper supplier-wrapper-${index}`} key={index}>
                      { supplierCount > 1 && index !== 0 ? <input type="checkbox" className="input-checkbox" onChange={() => handleChosenSupplier(index)}/> : "" }
                      <div className="input-wrapper">
                        <p className="input-title">Supplier</p>
                        <input className="input-field" type="text" value={product.suppliers[index]} onInput={(val) => handleSupplierName(val.target.value, index)}/>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Harga Modal</p>
                        <div className="input-field-group">
                          <div className="input-prefield-wrapper">
                            <p className="input-prefield-text">Rp</p>
                          </div>
                          <input className="input-field" type="text" value={product.modals[index]} onInput={(val) => handleModalValue(val.target.value, index)}/>
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <p className="input-title">Harga Modal Nett</p>
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

                      { supplierCount > 1 && index !== 0 ? 
                        <div className="delete-supplier-wrapper">
                        <div className="delete-text-wrapper" onClick={() => deleteMobileChosenSupplier(index)}>
                          <img src={rTrashCan} className="delete-icon" alt="RedTrashCan" />
                          <p className="delete-supplier-text">Hapus Supplier</p>
                        </div>
                        </div>
                        :
                        ""
                      }

                      <div className="mobile-supplier-separator"></div>
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
                Batalkan
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
      minWidth: "unset",
      width: "100%",
      margin: 0,
      maxWidth: "unset",
    }
  },
  paper2: {
    minWidth: "1112px",
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
