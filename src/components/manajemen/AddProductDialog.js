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
  const Garis = require('../../assets/icons/Garis.svg').default;
  const BackArrow = require('../../assets/icons/BackArrow.svg').default;

  // Fetch Data for page
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    fetchCategory();
  }, [showModal]);

  // Functions filling values of add product
  const [addProduct, setAddProduct] = useState({
    image: "",
    id: `PSCH${Date.now()}`,
    category_id: "",
    category_name: "",
    name: "",
    size: "",
    price: [""],
    stock: 0,
    suppliers: [""],
    modals: [""],
    modal_nett: [""],
    modal_nett_per: [""],
    logistic_costs: [""],
    margins: [""]
  });

  const uploadImage = () => {
    const fileInput = $("#upload-image")[0];
    const fileReader = new FileReader();

    try {
      fileReader.readAsDataURL(fileInput.files[0]);
      fileReader.onload = (file) => {
        $(".img-actual").attr("src", file.target.result);

        $(".img-placeholder").addClass("d-none");
        $(".img-actual").removeClass("d-none");

        setAddProduct({ ...addProduct, image: fileInput.files[0] })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategoryInput = (val) => {
    setAddProduct({ ...addProduct, category_id: val.value, category_name: val.label });
  };

  const handleNameInput = (val) => {
    setAddProduct({ ...addProduct, name: val });
  };

  const handleSizeInput = (val) => {
    setAddProduct({ ...addProduct, size: val });
  };

  const handleAmountInput = (val) => {
    setAddProduct({ ...addProduct, stock: val });
  };

  const handleSupplierName = (val, index) => {
    let newSupplier = addProduct.suppliers;
    newSupplier[index] = val;
    setAddProduct({ ...addProduct, suppliers: newSupplier });
  };

  const handleModalValue = (val, index) => {
    let newModal = addProduct.modals;
    newModal[index] = val;
    setAddProduct({ ...addProduct, modals: newModal });
  };

  const handleLogisticValue = (val, index) => {
    let newLogistic = addProduct.logistic_costs;
    newLogistic[index] = val;
    setAddProduct({ ...addProduct, logistic_costs: newLogistic });
  };

  const handlePriceValue = (val, index) => {
    setAddProduct({ ...addProduct, price: val });
  };

  const handleModalNettPer = (val, index) => {
    let newModalNetPerr = addProduct.modal_nett_per;
    newModalNetPerr[index] = val;
    setAddProduct({ ...addProduct, modal_nett_per: newModalNetPerr });
  };

  // Supplier add / remove
  const [supplierCount, setSupplierCount] = useState(1);
  const addSupplierAmount = () => {
    const amount = supplierCount;
    setSupplierCount(amount + 1);
    setAddProduct({
      ...addProduct,
      suppliers: [...addProduct.suppliers, ""],
      modals: [...addProduct.modals, ""],
      modal_nett_per: [...addProduct.modal_nett_per, ""],
      logistic_costs: [...addProduct.logistic_costs, ""],
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
    let newProduct = addProduct;

    // Delete Item
    deleteList.forEach(item => {
      $(`.supplier-wrapper-${item}`).remove();
      newProduct.suppliers.splice(item, 1)
      newProduct.modals.splice(item, 1)
      newProduct.modal_nett_per.splice(item, 1)
      newProduct.logistic_costs.splice(item, 1)
    });

    setAddProduct(newProduct);
    setChosenSupplier([]);
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
        !(addProduct.price > 0) ||
        !(addProduct.margins.length > 0) ||
        !(typeof(addProduct.image) == "object")
    }
  }

  const nextAddStep = async () => {
    if (addStep === 1) {
      setAddStep(2);
    } else {
      const modal_nett = [];
      const margins = [];

      // Modal Nett Calc.
      addProduct.modal_nett_per.forEach((precentage, index) => {
        let newModal = addProduct.modals[index];
        const precentageList = precentage.split("+");
        precentageList.map(percent => {
          newModal = newModal - (newModal * (percent / 100))
        })
        modal_nett.push(newModal);
      });
      // Margin Calc.
      modal_nett.forEach((modal, index) => {
        let newMargin = ((addProduct.price - modal) / modal) * 100;
        margins.push(newMargin.toFixed(0));
      });

      const submitProductData = {
        id: addProduct.id,
        category: addProduct.category_id,
        name: addProduct.name,
        size: addProduct.size,
        price: addProduct.price,
        stock: addProduct.stock,
        suppliers: addProduct.suppliers.join("|"),
        modals: addProduct.modals.join("|"),
        modal_nett_per: addProduct.modal_nett_per.join("|"),
        modal_nett: modal_nett.join("|"),
        logistic_costs: addProduct.logistic_costs.join("|"),
        margins: margins.join("|")
      };

      let formData = new FormData();
      formData.append("data", JSON.stringify(submitProductData));
      formData.append("image", addProduct.image, addProduct.id);

      const submitProduct = await fetch(`${env_api}/manajemen/product`, {
        method: "POST",
        headers: { 
          "auth_token": localStorage.getItem("auth_token"),
          "required_role": "0,2"
        },
        body: formData
      })
        .then(() => {
          closeModal();
          setAddStep(1);
          setAddProduct({ id: "", category: "", name: "", size: "", price: [], stock: 0, suppliers: [], modals: [], modal_nett: [], logistic_costs: [], margins: [] });
          setSupplierCount(1);
          setChosenSupplier([]);
          window.location.reload();
        }).catch(error => console.log(error));
    }
  };

  const backAddStep = () => {
    if (addStep === 2) setAddStep(1)
    else {
      setAddStep(1);
      setAddProduct({ ...addProduct, category: "", name: "", size: "", price: [], stock: 0, suppliers: [], modals: [], modal_nett: [], logistic_costs: [], margins: [] });
      setSupplierCount(1);
      setChosenSupplier([]);
      closeModal();
    }
  };

  // Close Modal
  const handleCloseModal = () => {
    closeModal();
  };


  return (
    <Dialog
      open={showModal}
      fullWidth={true}
      classes={{ container: classes.root, paper: classes.paper }}
      onClose={handleCloseModal}
    >
      <div className="add-product-wrapper">
        {addStep === 1 ?
          <div className="add-product-first-step">
            <div className="garis">
              <img src={Garis} alt="garis" className="img" />
            </div>
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
                <Select placeholder="" options={categories} classNamePrefix="category-select-add" value={{ value: addProduct.category_id, label: addProduct.category_name }} onChange={(val) => handleCategoryInput(val)} />
              </div>
              <p className="dialog-second-subtitle">
                Pilih kategori sesuai dengan produk yang ingin ditambahkan
              </p>

              <div className="input-wrapper">
                <p className="input-title">Nama Produk</p>
                <input className="input-field" type="text" value={addProduct.name} onInput={(val) => handleNameInput(val.target.value)} />
              </div>

              <div className="input-wrapper">
                <p className="input-title">Masukkan Ukuran</p>
                <input className="input-field" type="text" value={addProduct.size} onInput={(val) => handleSizeInput(val.target.value)} />
              </div>

              <div className="input-wrapper no-margin">
                <p className="input-title">ID Produk</p>
                <input className="input-field" type="text" value={addProduct.id} readOnly />
              </div>
            </div>

            <div className="dialog-button-wrapper">
              <button className="btn btn-secondary" onClick={backAddStep}>
                Batal
              </button>
              <button className="btn btn-primary" disabled={isDisabled()} onClick={nextAddStep}>
                Selanjutnya
              </button>
            </div>
            <div className="dialog-button-wrapper-mobile">
              <button className="btn btn-primary" disabled={isDisabled()} onClick={nextAddStep}>
                Selanjutnya
              </button>
            </div>
          </div>
          :
          <Dialog
            open={showModal}
            fullWidth={true}
            classes={{ container: classes.root, paper: classes.paper20 }}
            onClose={handleCloseModal}
          >
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
              <div className="dialog-header-mobile">
                <div className="header-inner-wrapper">
                  <button className="btn-back" onClick={backAddStep}>
                    <img src={BackArrow} alt="Blue Back Arrow" />
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
                      <input className="d-none" id="upload-image" type="file" onChange={(val) => uploadImage(val)} />
                      <label className="input-img-border" htmlFor="upload-image">
                        <img className="img-actual d-none" alt="Uploaded image" />
                        <img className="img-placeholder" src={uploadImgPlaceholder} alt="Upload Img Placeholder" />
                      </label>
                    </div>
                    <div className="image-color-amount-inner-wrapper">
                      <div className="input-wrapper">
                        <p className="input-title">Jumlah</p>
                        <input className="input-field" type="text" onInput={(val) => handleAmountInput(val.target.value)} />
                      </div>
                    </div>
                  </div>
                  {supplierCount && supplierCount > 0 ?
                    [...Array(supplierCount)].map((item, index) =>
                      <div className={`supplier-wrapper supplier-wrapper-${index}`} key={index}>
                        {supplierCount > 1 && index !== 0 ? <input type="checkbox" className="input-checkbox" onChange={() => handleChosenSupplier(index)} /> : ""}
                        <div className="input-wrapper">
                          <p className="input-title">Supplier</p>
                          <input className="input-field" type="text" onInput={(val) => handleSupplierName(val.target.value, index)} />
                        </div>
                        <div className="input-wrapper">
                          <p className="input-title">Modal</p>
                          <div className="input-field-group">
                            <div className="input-prefield-wrapper">
                              <p className="input-prefield-text">Rp</p>
                            </div>
                            <input className="input-field" type="text" onInput={(val) => handleModalValue(val.target.value, index)} />
                          </div>
                        </div>
                        <div className="input-wrapper">
                          <p className="input-title">Modal Nett Per</p>
                          <input className="input-field" type="text" onInput={(val) => handleModalNettPer(val.target.value, index)} />
                        </div>
                        <div className="input-wrapper">
                          <p className="input-title">Logistik</p>
                          <div className="input-field-group">
                            <div className="input-prefield-wrapper">
                              <p className="input-prefield-text">Rp</p>
                            </div>
                            <input className="input-field" type="text" onInput={(val) => handleLogisticValue(val.target.value, index)} />
                          </div>
                        </div>
                        <div className="input-wrapper">
                          <p className="input-title">Harga Jual</p>
                          <div className="input-field-group">
                            <div className="input-prefield-wrapper">
                              <p className="input-prefield-text">Rp</p>
                            </div>
                            <input className="input-field" type="text" value={addProduct.price} onInput={(val) => handlePriceValue(val.target.value)} />
                          </div>
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
                    { supplierCount == 3 ? 
                      <></>
                    :
                      <p className="add-supplier-text" onClick={() => addSupplierAmount()}>
                        + Tambah Supplier
                      </p>
                    }
                  </div>
                </div>
              </div>

              <div className="dialog-button-wrapper">
                <button className="btn btn-secondary" onClick={backAddStep}>
                  Tambahkan Varian Nanti
                </button>
                <button className="btn btn-primary" disabled={isDisabled()} onClick={nextAddStep}>
                  Simpan
                </button>
              </div>
              <div className="dialog-button-wrapper-mobile">
                <button className="btn btn-primary" disabled={isDisabled()} onClick={nextAddStep}>
                  Simpan
                </button>
              </div>
            </div>
          </Dialog>
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
    minWidth: "1112px",
    "@media (max-width: 771px)": {
      width: "100%",
      margin: 0,
      maxWidth: "unset",
    }
  },
  paper20: {
    minWidth: "1112px",
    "@media (max-width: 771px)": {
      width: "100%",
      margin: 0,
      maxWidth: "unset",
    }
  },
}));
