import React, { useState } from 'react'
import Select from 'react-select'

import $ from "jquery";
import Slide from '@mui/material/Slide';
import { makeStyles } from "@mui/styles";

import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

import '../../styles/Product.scss';

import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';
import ScanDialog from '../../components/manajemen/ScanDialog';
import AddCategoryDialog from '../../components/manajemen/AddCategoryDialog';
import AddProductDialog from '../../components/manajemen/AddProductDialog';
import EditProductDialog from '../../components/manajemen/EditProductDialog';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      sortOptions: [
        { value: "", label: "Urutkan" },
        { value: "modalasc", label: "Modal Termurah" },
        { value: "modaldesc", label: "Modal Termahal" },
        { value: "amountasc", label: "Jumlah Paling Sedikit" },
        { value: "amountdesc", label: "Jumlah Terbanyak" },
        { value: "sellasc", label: "Harga Jual Termurah" },
        { value: "selldesc", label: "Harga Jual Termahal" }
      ],
      appliedQuery: "",
      appliedFilter: [],
      appliedSort: "",
      checkedProducts: [],
      showScan: false,
      showAddCategory: false,
      showAddProduct: false,
      showEditProduct: false,
      emptyCategory: "",
      editProductId: "",
      showAddMenu: "",
    };
  }

  async componentDidMount() {
    const env_api = process.env.REACT_APP_API_ENDPOINT;

    // Fetch Product
    const product = await fetch(`${env_api}/manajemen/products`)
      .then(response => response.json())
      .catch(error => console.log(error));
    this.setState({ ...this.state, products: product ? product.data : [] });

    // Fetch Categories
    const categories = await fetch(`${env_api}/manajemen/categories`)
      .then(response => response.json())
      .catch(error => console.log(error));
    this.setState({ ...this.state, categories: categories ? categories.data : [] });
  }

  render() {
    // Asset Imports 
    const magnifierIcon = require('../../assets/icons/magnifier-icon.svg').default;
    const scanIcon = require('../../assets/icons/scan-barcode-icon.svg').default;
    const addIcon = require('../../assets/icons/add-icon.svg').default;
    const dotsIcon = require('../../assets/icons/three-blue-dots.svg').default;
    const lbArrow = require('../../assets/icons/light-blue-arrow.svg').default;
    const blueCIcon = require('../../assets/icons/close-blue-icon.svg').default;
    const rTrashCan = require('../../assets/icons/red-trashcan.svg').default;
    const gEdit = require('../../assets/icons/gray-edit-icon.svg').default;
    const gScan = require('../../assets/icons/gray-scan-icon.svg').default;    
    const scanBtn = require('../../assets/icons/ScanBtn.svg').default;
    const checkboxBtn = require('../../assets/icons/CheckBtn.svg').default;
    const Garis = require('../../assets/icons/Garis.svg').default;
    const gClose = require('../../assets/icons/gray-close-icon.svg').default;

    // Functions
    const formatToCurrency = (num) => {
      return `Rp ${Number(num).toLocaleString("ID")}`;
    };
    const seeDetails = (index) => {
      if ($(`.product-description-${index}>.product-description-pricing-detail`).hasClass("d-none")) {
        $(".product-description-pricing-detail").addClass("d-none");
        $(".see-all").html(`lihat selengkapnya`);
        $(".lb-arrow").removeClass(`rotated`);

        $(`.product-description-${index}>.product-description-pricing-detail`).removeClass("d-none");
        $(`.product-description-${index}>.product-see-more-row>.see-more-wrapper>.see-all-wrapper>.see-all`).html(`tutup`);
        $(`.product-description-${index}>.product-see-more-row>.see-more-wrapper>.see-all-wrapper>.lb-arrow`).addClass(`rotated`);
      } else {
        $(".product-description-pricing-detail").addClass("d-none");
        $(".see-all").html(`lihat selengkapnya`);
        $(".lb-arrow").removeClass(`rotated`);
      }
    };
    const markAllProduct = () => {
      const isChecked = $(".checkbox-head").is(":checked");

      if (isChecked) {
        const checkedProducts = [];
        if (this.state.products.length > 0) {
          $(".checkbox-item").prop("checked", true);
          this.state.products.forEach(item => { checkedProducts.push(item.id) });
          this.setState({ ...this.state, checkedProducts: checkedProducts });
        };
      } else {
        $(".checkbox-item").prop("checked", false);
        this.setState({ ...this.state, checkedProducts: [] });
      }

    };
    const markProduct = (id) => {
      let checkedProducts = this.state.checkedProducts;

      if (checkedProducts.includes(id)) checkedProducts = checkedProducts.filter(item => item == id);
      else checkedProducts.push(id);

      this.setState({ ...this.state, checkedProducts: checkedProducts });
    };
    const showAddOptions = () => {
      $(".add-button-options").removeClass("d-none");
    };
    const closeAddOptions = () => {
      $(".add-button-options").addClass("d-none");
    };
    const choseAddOptions = (opt) => {
      if (opt === "addCategory") this.setState({ ...this.state, showAddCategory: true });
      if (opt === "addProduct") this.setState({ ...this.state, showAddProduct: true });
      $(".add-button-options").addClass("d-none");
    };
    const hideAddOptions = () => {
      $(".add-button-options").addClass("d-none");
    };
    const showSubMenu = (index) => {
      $(".product-three-dots-options").addClass("d-none");
      $(`.product-three-dots-${index}`).removeClass("d-none");
    };
    const hideSubMenu = () => {
      $(".product-three-dots-options").addClass("d-none");
    };
    const editProduct = (id) => {
      if (typeof window !== undefined) localStorage.setItem("editId", id);
      this.setState({ ...this.state, showEditProduct: true });
    };
    const printBarcode = (id) => {

    };
    const deleteProduct = (id) => {

    };

    const showCheckBox = () => {
      if ($(".product-list-table-head-mobile").hasClass("d-none") && $(".checkbox-item").hasClass("d-none")) {
        $(".product-list-table-head-mobile").removeClass("d-none");
        $(".checkbox-item").removeClass("d-none");

      } else {
        $(".product-list-table-head-mobile").addClass("d-none");
        $(".checkbox-item").addClass("d-none");

      }
    };

    // Apply Filters
    const searchProduct = async (string) => {
      const env_api = process.env.REACT_APP_API_ENDPOINT;

      const filterQuery = this.state.appliedFilter ? this.state.appliedFilter.map(item => item.value).join(",") : "";
      const query = `?query=${string}&filter=${filterQuery}&sort=${this.state.appliedSort ? this.state.appliedSort.value : ""}`;
      const filteredProduct = await fetch(`${env_api}/manajemen/products${query}`)
        .then(response => response.json())
        .catch(error => console.log(error));

      this.setState({ ...this.state, appliedQuery: string, products: filteredProduct.data });

    };

    const applySort = async (sort) => {
      const env_api = process.env.REACT_APP_API_ENDPOINT;

      const filterQuery = this.state.appliedFilter ? this.state.appliedFilter.map(item => item.value).join(",") : "";
      const query = `?query=${this.state.appliedQuery}&filter=${filterQuery}&sort=${sort.value}`;
      const sortedProduct = await fetch(`${env_api}/manajemen/products${query}`)
        .then(response => response.json())
        .catch(error => console.log(error));

      this.setState({ ...this.state, appliedSort: sort, products: sortedProduct.data });
    };

    const applyFilter = async (filter) => {
      const env_api = process.env.REACT_APP_API_ENDPOINT;

      if (!this.state.appliedFilter.includes(filter)) {
        const newAppliedFilter = [...this.state.appliedFilter, filter];
        const filterQuery = newAppliedFilter ? newAppliedFilter.map(item => item.value).join(",") : "";
        const query = `?query=${this.state.appliedQuery}&filter=${filterQuery}&sort=${this.state.appliedSort ? this.state.appliedSort.value : ""}`;
        const filteredProduct = await fetch(`${env_api}/manajemen/products${query}`)
          .then(response => response.json())
          .catch(error => console.log(error));

        this.setState({ ...this.state, emptyCategory: "", appliedFilter: newAppliedFilter, products: filteredProduct.data });
      }

    };

    const removeAppliedFilter = async (filter) => {
      const env_api = process.env.REACT_APP_API_ENDPOINT;

      const newAppliedFilter = this.state.appliedFilter.filter(item => { return item !== filter });

      const filterQuery = newAppliedFilter ? newAppliedFilter.map(item => item.value).join(",") : "";
      const query = `?query=${this.state.appliedQuery}&filter=${filterQuery}&sort=${this.state.appliedSort ? this.state.appliedSort.value : ""}`;
      const filteredProduct = await fetch(`${env_api}/manajemen/products${query}`)
        .then(response => response.json())
        .catch(error => console.log(error));

      this.setState({ ...this.state, appliedFilter: newAppliedFilter, products: filteredProduct.data });
    };

    const resetFilter = async () => {
      const env_api = process.env.REACT_APP_API_ENDPOINT;

      const newAppliedFilter = [];
      const query = `?query=${this.state.appliedQuery}&filter=&sort=${this.state.appliedSort ? this.state.appliedSort.value : ""}`;
      const filteredProduct = await fetch(`${env_api}/manajemen/products${query}`)
        .then(response => response.json())
        .catch(error => console.log(error));

      this.setState({ ...this.state, appliedFilter: newAppliedFilter, products: filteredProduct.data });
    };

    // Modals
    const handleOpenScan = () => {
      this.setState({ ...this.state, showScan: true })
    };
    const handleCloseScan = () => {
      this.setState({ ...this.state, showScan: false })
    };

    const handleCloseAddCategory = () => {
      this.setState({ ...this.state, showAddCategory: false });
    };

    const handleCloseAddProduct = () => {
      this.setState({ ...this.state, showAddProduct: false });
    };

    const handleCloseEditProduct = () => {
      if (typeof window !== "undefined") localStorage.removeItem("editId");
      this.setState({ ...this.state, showEditProduct: false });
    };
    //ModalMobile
    const handleOpenAddMenu = () => {
      this.setState({ ...this.state, showAddMenu: true })
    };

    const handleCloseAddMenu = () => {
      this.setState({ ...this.state, showAddMenu: false })
    };

    // Renders
    return (
      <div className="container-manajemen-produk">
        <Navbar />

        <div className="container-manajemen-produk-content">
          <Header />

          <div className="product-list-outer-wrapper">

            <div className="product-list-header">
              <div className="product-filters-wrapper">
                <div className="search-product-wrapper">
                  <input className="form-control input-search" name="search" type="search" placeholder="Cari Produk" onInput={(val) => searchProduct(val.target.value)} />
                  <div className="input-group-append">
                    <img src={magnifierIcon} alt="maginifier-icon" />
                  </div>
                </div>
                <div className="filter-and-buttons-wrapper">
                  <div className="filter-wrapper">
                    <Select placeholder="Kategori" options={this.state.categories} classNamePrefix="product-select" value={this.state.emptyCategory} onChange={(filter) => applyFilter(filter)} />
                    <Select placeholder="Urutkan" options={this.state.sortOptions} classNamePrefix="product-select-lc" onChange={(sort) => applySort(sort)} />
                  </div>

                  <div className="button-wrapper">
                    <button className="button-primary button-scan" onClick={() => handleOpenScan()}>
                      <img className="button-icon" src={scanIcon} alt="Scan Icon" />
                      <p className="button-text">Scan Produk</p>
                    </button>
                    <div className="add-button-wrapper">
                      <button className="button-primary button-add" onClick={() => showAddOptions()}>
                        <img className="button-icon" src={addIcon} alt="Add Icon" />
                        <p className="button-text">Tambah</p>
                      </button>
                      <ul className="add-button-options d-none" onMouseLeave={() => hideAddOptions()}>
                        <li className="button-options" onClick={() => choseAddOptions("addCategory")}>
                          <p className="option-text">Tambah Kategori</p>
                        </li>
                        <li className="button-options" onClick={() => choseAddOptions("addProduct")}>
                          <p className="option-text">Tambah Produk</p>
                        </li>
                        <li className="button-options">
                          <p className="option-text" onClick={() => choseAddOptions("addBoth")}>Tambah Sekaligus</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-applied-filters">
                <ul className="applied-filter-list">
                  {this.state.appliedFilter && this.state.appliedFilter.length > 0 ?
                    this.state.appliedFilter.map((filterItem, index) => (
                      <li className="applied-filter-item" key={index}>
                        <p className="filter-title">{filterItem.label}</p>
                        <img className="filter-remove" src={blueCIcon} alt="close icon" onClick={() => removeAppliedFilter(filterItem)} />
                      </li>
                    ))
                    : ""}
                </ul>
                {this.state.appliedFilter && this.state.appliedFilter.length > 0 ?
                  <p className="reset-filter-title" onClick={() => resetFilter()}>Reset Kategori</p>
                  : ""}
              </div>
            </div>

            <div className="product-list-content">
            <div className="product-list-table-wrapper">

              <table className="product-list-table">
                <thead className="product-list-table-head">
                { this.state.checkedProducts && this.state.checkedProducts.length > 0 ? 
                  <tr>
                    <th className="head-checkbox"><input type="checkbox" className="checkbox-head" onClick={() => markAllProduct()}/></th>
                    <th className="head-custom-checkbox" colSpan="5">
                      <div className="button-inner-wrappers">
                        <p className="amount-indicators">{this.state.checkedProducts.length} Produk dipilih</p>
                        <button className="btn btn-outer-primary">Cetak Barcode Sekaligus</button>
                        <button className="btn btn-outer-secondary"> 
                          <img src={rTrashCan} className="trash-icon" alt="Red Trashcan" /> 
                          Hapus
                        </button>
                      </div>
                    </th>
                  </tr>
                  : 
                  <tr>
                    <th className="head-checkbox"><input type="checkbox" className="checkbox-head" onClick={() => markAllProduct()}/></th>
                    <th className="head-prod-name"><p className="table-title">Nama Produk</p></th>
                    <th className="head-prod-size"><p className="table-title">Ukuran</p></th>
                    <th className="head-prod-amount"><p className="table-title">Jumlah</p></th>
                    <th className="head-prod-margin"></th>
                    <th className="head-prod-dots"></th>
                  </tr>
                }
                </thead>

                {this.state.products && this.state.products.length > 0 ? 
                  this.state.products.map((item, index) => (
                    <tbody className={`product-description product-description-${index}`} key={index}>
                      <tr className="product-description-highlights">
                        <td className="product-description-item">
                          <input type="checkbox" className={`checkbox-item checkbox-${item.id}`} onClick={() => markProduct(item.id)}/>
                        </td>
                        <td className="product-description-item item-details">
                          <div className="img-and-name-wrapper">
                            <div className="img-wrapper">
                              <img className="img-file" src={`http://localhost:3007${item.images}`} alt={item.name} />
                            </div>
                            <div className="name-wrapper">
                              <p className="name-title">{item.name}</p>
                              <p className="name-subtitle">
                                ID: {item.id}
                                <span className="blue-dot"></span>
                                {item.category_name}
                              </p>
                            </div>

                          </div>
                        </td>
                        <td className="product-description-item">
                          <p className="table-title">{item.size}</p>
                        </td>
                        <td className="product-description-item">
                          <p className="table-title">{item.stock}</p>
                        </td>
                        <td className="product-description-item" colSpan={2}  onClick={() => showSubMenu(index)}>
                          <img className="three-dots" src={dotsIcon} alt="maginifier-icon"/>
                          <div className={`product-three-dots-options product-three-dots-${index} d-none`} onMouseLeave={() => hideSubMenu()}>
                            <ul className="action-item-wrapper">
                              <li className="action-item" onClick={() => editProduct(item.id)}>
                                <img src={gEdit} alt="Edit Pencil" />
                                Ubah Detil Produk
                              </li>
                              <li className="action-item" onClick={() => printBarcode(item.id)}>
                                <img src={gScan} alt="Scan Barcode" />
                                Cetak Barcode
                              </li>
                              <li className="action-item red-highlight" onClick={() => deleteProduct(item.id)}>
                                <img src={rTrashCan} alt="Delete Product" />
                                Hapus Produk
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr className="product-description-pricing-detail d-none">
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
                                  {item.suppliers.map((item, index) => (
                                    <input key={index} type="text" value={item} readOnly/>
                                  ))}
                                </td>
                                <td className="product-modal">
                                  {item.modals.map((item, index) => (
                                    <div className="input-pricing" key={index}>
                                      <div className="input-prepend">
                                        <p className="prepend-text">Rp</p>
                                      </div>
                                      <input type="text" value={item.price} readOnly />
                                    </div>
                                  ))}
                                </td>
                                <td className="product-modal-nett">
                                  {item.modal_nett.map((item, index) => (
                                    <div className="product-modal-nett-inner" key={index}>
                                      <div className="input-precentage">
                                        <input type="text" />
                                        <div className="input-append">
                                          <p className="append-text">%</p>
                                        </div>
                                      </div>
                                      <input type="text" value={item.price} readOnly />
                                    </div>
                                  ))}
                                </td>
                                <td className="product-logistic">
                                  {item.logistic_costs.map((item, index) => (
                                    <div className="input-pricing" key={index}>
                                      <div className="input-prepend">
                                        <p className="prepend-text">Rp</p>
                                      </div>
                                      <input type="text" value={item.price} readOnly />
                                    </div>
                                  ))}
                                </td>
                                <td className="product-jual">
                                  {item.suppliers.map((innerItem, index) => (
                                    <div className="input-pricing" key={index}>
                                      <div className="input-prepend">
                                        <p className="prepend-text">Rp</p>
                                      </div>
                                      <input type="text" value={item.price} readOnly />
                                    </div>
                                  ))}
                                </td>
                                <td className="product-margin">
                                  {item.margins.map((item, index) => (
                                    <div className="margin-wrapper" key={index}>
                                      <p className="margin-text">{item}%</p>
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                        </td>
                      </tr>
                      <tr className="product-see-more-row">
                        <td className="see-more-wrapper" colSpan={6} onClick={() => seeDetails(index)}>
                          <div className="see-all-wrapper">
                            <p className="see-all">lihat selengkapnya</p>
                            <img className="lb-arrow" src={lbArrow} alt="blue arrow" />
                          </div>
                        </td>
                      </tr>
                    </tbody> 
                  ))
                    : 
                  <tbody></tbody>
                }

                </table>

              </div>
            </div>

            {/* MobileView */}
            <div className="mobileView">
              <div className="header-mobileview">
                <div className="header-mobile">
                  <div className="search-product-wrapper">
                    <input className="form-control input-search" name="search" type="search" placeholder="Cari Produk" onInput={(val) => searchProduct(val.target.value)} />
                    <div className="input-group-append">
                      <img src={magnifierIcon} alt="maginifier-icon" />
                    </div>
                  </div>
                </div>
                <div className="filter-wrapper">
                  <Select placeholder="Kategori" options={this.state.categories} classNamePrefix="product-select" value={this.state.emptyCategory} onChange={(filter) => applyFilter(filter)} />
                  <Select placeholder="Urutkan" options={this.state.sortOptions} classNamePrefix="product-select-lc" onChange={(sort) => applySort(sort)} />
                </div>
                <div className="product-applied-filters">
                  <ul className="applied-filter-list">
                    {this.state.appliedFilter && this.state.appliedFilter.length > 0 ?
                      this.state.appliedFilter.map((filterItem, index) => (
                        <li className="applied-filter-item" key={index}>
                          <p className="filter-title">{filterItem.label}</p>
                          <img className="filter-remove" src={blueCIcon} alt="close icon" onClick={() => removeAppliedFilter(filterItem)} />
                        </li>
                      ))
                      : ""}
                  </ul>
                  {this.state.appliedFilter && this.state.appliedFilter.length > 0 ?
                    <p className="reset-filter-title" onClick={() => resetFilter()}>Reset Kategori</p>
                    : ""}
                </div>
              </div>

              <div className="product-list-content-mobile">
                <div className="product-list-table-wrapper">

                  <table className="product-list-table">
                    <thead className="product-list-table-head-mobile d-none">
                      {this.state.checkedProducts && this.state.checkedProducts.length > 0 ?
                        <tr>
                          <th className="head-checkbox"><input type="checkbox" className="checkbox-head" onClick={() => markAllProduct()} /></th>
                          <th className="head-custom-checkbox" colSpan="5">
                            <div className="button-inner-wrappers">
                              <p className="amount-indicators">{this.state.checkedProducts.length} Produk dipilih</p>
                              <button className="btn btn-outer-primary">Cetak Barcode</button>
                              <button className="btn btn-outer-secondary">
                                <img src={rTrashCan} className="trash-icon" alt="Red Trashcan" />
                                Hapus
                              </button>
                            </div>
                          </th>
                        </tr>
                        :
                        <tr>
                          <th className="head-checkbox"><input type="checkbox" className="checkbox-head" onClick={() => markAllProduct()} /></th>
                          <th className="head-prod-name"><p className="table-title"></p></th>
                        </tr>
                      }
                    </thead>

                    {this.state.products && this.state.products.length > 0 ?
                      this.state.products.map((item, index) => (
                        <tbody className={`product-description product-description-${index}`} key={index}>

                          <tr className="product-description-highlights-mobile">
                            <td className="product-description-item">
                              <input type="checkbox" className={`checkbox-item d-none checkbox-${item.id}`} onClick={() => markProduct(item.id)} />
                            </td>
                            <div className="product-description-item item-details">
                              <div className="img-and-name-wrapper">
                                <div className="img-wrapper"></div>
                                <div className="name-wrapper">
                                  <p className="name-title">{item.name}</p>
                                  <p className="name-subtitle">
                                    ID: {item.id}
                                    <span className="blue-dot"></span>
                                    {item.category_name}
                                    <span className="blue-dot"></span>
                                    {item.size}
                                  </p>
                                  <td className="product-description-item">
                                    <p className="table-title">Stok : {item.stock}</p>
                                  </td>
                                </div>
                              </div>
                            </div>
                          </tr>
                        </tbody>
                      ))
                      :
                      <tbody></tbody>
                    }

                  </table>

                </div>
              </div>
            </div>

          </div>

          <div className="btnModal">
            <div className="add" onClick={() => handleOpenAddMenu()}>
              <img src={addIcon} alt="add" className="img" />
            </div>
            <div className="scan" onClick={() => handleOpenScan()}>
              <img src={scanBtn} alt="scan" className="img" />
            </div>
            <div className="checkbox" onClick={() => showCheckBox()}>
              <img src={checkboxBtn} alt="checkbox" className="img" />
            </div>
          </div>

          <Modal id="ModalAddOption" show={this.state.showAddMenu} onHide={handleCloseAddMenu} animation={false} dialogClassName="slide-up">
            <Modal.Body>
              <div className="garis">
                <img src={Garis} alt="garis" className="img" />
              </div>
              <div className="menu">
                <div className="text">
                  <p>Tambah</p>
                </div>
                <div className="addOption">
                  <div className="tambahKategori" onClick={() => choseAddOptions("addCategory")}>
                    <p>Tambah Kategori</p>
                  </div>
                  <div className="tambahProduk" onClick={() => choseAddOptions("addProduct")}>
                    <p>Tambah Produk</p>
                  </div>
                  <div className="tambahSekaligus" onClick={() => choseAddOptions("addBoth")}>
                    <p>Tambah Sekaligus</p>
                  </div>
                </div>
              </div>

            </Modal.Body>
          </Modal>

        </div>

        <ScanDialog showScan={this.state.showScan} closeScan={handleCloseScan}/>
        <AddCategoryDialog showModal={this.state.showAddCategory} closeModal={handleCloseAddCategory}/>
        <AddProductDialog showModal={this.state.showAddProduct} closeModal={handleCloseAddProduct}/>
        <EditProductDialog showModal={this.state.showEditProduct} closeModal={handleCloseEditProduct} />
      </div>
    )
  }
}