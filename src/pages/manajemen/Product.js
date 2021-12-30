import React from 'react'
import Select from 'react-select'

import $ from "jquery";
import Slide from '@mui/material/Slide';
import { makeStyles } from "@mui/styles";

import '../../styles/Product.scss';

import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';
import ScanDialog from '../../components/manajemen/ScanDialog';

export default class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      categories: [
        { value: 1, label: "Manik-manik" },
        { value: 2, label: "Yuhu" },
      ],
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
      appliedFilter: [
        { value: 1, label: "Manik-manik" },
        { value: 2, label: "Yuhu" }
      ],
      appliedSort: "",
      showScan: false,
      showAdd: false,
    };
  } 

  async componentDidMount() {
    const env_api = process.env.REACT_APP_API_ENDPOINT;
    
    // // Fetch Product
    // const product = await fetch(`${env_api}/manajemen/products`)
    //                             .then(response => response.json())
    //                             .catch(error => console.log(error));
    // this.setState({ ...this.state, products: product.data });

    // // Fetch Categories
    // const categories = await fetch(`${env_api}/manajemen/categories`)
    //                               .then(response => response.json())
    //                               .catch(error => console.log(error));
    // this.setState({ ...this.state, categories: categories.data });
  }

  render() {
    // Asset Imports 
    const magnifierIcon = require('../../assets/icons/magnifier-icon.svg').default;
    const scanIcon = require('../../assets/icons/scan-barcode-icon.svg').default;
    const addIcon = require('../../assets/icons/add-icon.svg').default;
    const dotsIcon = require('../../assets/icons/three-blue-dots.svg').default;
    const lbArrow = require('../../assets/icons/light-blue-arrow.svg').default;
    const blueCIcon = require('../../assets/icons/close-blue-icon.svg').default;

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

    // Apply Filters
    const searchProduct = async () => {
      // const env_api = process.env.REACT_APP_API_ENDPOINT;
      // const queryProduct = query ? `?query=${query}` : "";
      // const filterQuery = queryProduct ? 
      //                       this.state.appliedFilter ? `&filter=${this.state.appliedFilter}` : ""
      //                     : this.state.appliedFilter ? `?filter=${this.state.appliedFilter}` : "";
      // const sortQuery = queryProduct ?
                            
    };

    const applySort = async (sort) => {
      // const env_api = process.env.REACT_APP_API_ENDPOINT;

      // const filterQuery = this.state.appliedFilter ? `?filter=${this.state.appliedFilter}` : "";
      // const sortQuery = filterQuery ? `&sort=${sort}` : `?sort=${sort.value}`;
      // const sortedProduct = await fetch(`${env_api}/manajemen/products${filterQuery}${sortQuery}`)
      //                                 .then(response => response.json())
      //                                 .catch(error => console.log(error));
      // this.setState({ ...this.state, appliedSort: sort, products: sortedProduct.data });
    };

    const applyFilter = (filter) => {
      console.log(filter);
      // const filterQuery = appliedFilter ? `?filter=${appliedFilter}` : "";
      // const sortQuery = filterQuery ? `&sort=${sort}` : `?sort=${sort}`;
      // const sortedProduct = await fetch(`${env_api}/manajemen/products${filterQuery}${sortQuery}`)
      //                                 .then(response => response.json())
      //                                 .catch(error => console.log(error));
      // this.setState({ ...this.state, appliedSort: sort, products: sortedProduct.data });
    };

    const resetFilter = () => {
      this.setState({ ...this.state, appliedFilter: [] });
    }

    // Modals
    const handleOpenScan = () => {
      this.setState({ ...this.state, showScan: true })
    };
    const handleCloseScan = () => {
      this.setState({ ...this.state, showScan: false })
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
                  <input className="form-control input-search" name="search" type="search" placeholder="Cari Produk" onInput={() => searchProduct()}/>
                  <div className="input-group-append">
                    <img src={magnifierIcon} alt="maginifier-icon" />
                  </div>
                </div>
                <div className="filter-and-buttons-wrapper">
                  <div className="filter-wrapper">
                    <Select placeholder="Kategori" options={this.state.categories} classNamePrefix="product-select" onChange={(filter) => applyFilter(filter)} />
                    <Select placeholder="Urutkan" options={this.state.sortOptions} classNamePrefix="product-select-lc" onChange={(sort) => applySort(sort)} />
                  </div>

                  <div className="button-wrapper">
                    <button className="button-primary button-scan" onClick={() => handleOpenScan()}>
                      <img className="button-icon" src={scanIcon} alt="Scan Icon" />
                      <p className="button-text">Scan Produk</p>
                    </button>
                    <div className="add-button-wrapper">
                      <button className="button-primary button-add">
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
              <div className="product-applied-filters">
                <ul className="applied-filter-list">
                  { this.state.appliedFilter && this.state.appliedFilter.length > 0 ? 
                    this.state.appliedFilter.map((filterItem, index) => (
                      <li className="applied-filter-item" key={index}>
                        <p className="filter-title">{filterItem.label}</p>
                        <img src={blueCIcon} alt="close icon" />
                      </li>
                    ))
                  : "" }
                </ul>
                { this.state.appliedFilter && this.state.appliedFilter.length > 0 ? 
                  <p className="reset-filter-title" onClick={() => resetFilter()}>Reset Kategori</p>
                  : ""}
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

                {this.state.products && this.state.products.length > 0 ? 
                  this.state.products.map((item, index) => (
                    <tbody className={`product-description product-description-${index}`} key={index}>
                      <tr className="product-description-highlights">
                        <td className="product-description-item">
                          <input type="checkbox" />
                        </td>
                        <td className="product-description-item item-details">
                          <div className="img-and-name-wrapper">
                            <div className="img-wrapper"></div>
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
                        <td className="product-description-item" colSpan={2}>
                          <img src={dotsIcon} alt="maginifier-icon" />
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
                                  {item.suppliers.map(item => (
                                    <input type="text" value={item}/>
                                  ))}
                                </td>
                                <td className="product-modal">
                                  {item.modals.map(item => (
                                    <div className="input-pricing">
                                      <div className="input-prepend">
                                        <p className="prepend-text">Rp</p>
                                      </div>
                                      <input type="text" value={item}/>
                                    </div>
                                  ))}
                                </td>
                                <td className="product-modal-nett">
                                  {item.modal_nett.map(item => (
                                    <div className="product-modal-nett-inner">
                                      <div className="input-precentage">
                                        <input type="text" />
                                        <div className="input-append">
                                          <p className="append-text">%</p>
                                        </div>
                                      </div>
                                      <p className="price">{formatToCurrency(item)}</p>
                                    </div>
                                  ))}
                                </td>
                                <td className="product-logistic">
                                  {item.logistic_costs.map(item => (
                                    <div className="input-pricing">
                                      <div className="input-prepend">
                                        <p className="prepend-text">Rp</p>
                                      </div>
                                      <input type="text" value={item}/>
                                    </div>
                                  ))}
                                </td>
                                <td className="product-jual">
                                  <div className="input-pricing">
                                    <div className="input-prepend">
                                      <p className="prepend-text">Rp</p>
                                    </div>
                                    <input type="text" value={item.price}/>
                                  </div>
                                  <div className="input-pricing">
                                    <div className="input-prepend">
                                      <p className="prepend-text">Rp</p>
                                    </div>
                                    <input type="text" value={item.price}/>
                                  </div>
                                  <div className="input-pricing">
                                    <div className="input-prepend">
                                      <p className="prepend-text">Rp</p>
                                    </div>
                                    <input type="text" value={item.price}/>
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

          </div>
        </div>

        <ScanDialog showScan={this.state.showScan} closeScan={handleCloseScan}/>

      </div>
    )
  }
}
// Todos:
// Add state for value select, set to null everytime filter is applied, so dropdown is alwAYS empty
// Change from class component to functional component!!!