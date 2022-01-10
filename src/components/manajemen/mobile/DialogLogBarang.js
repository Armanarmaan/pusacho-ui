import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import moment from 'moment';
import DialogFilters from '../mobile/DialogFilters';

function DialogLogBarang({ showDialog, handleCloseDialog, changeKeyword, datas, currencyFormat, 
  handleSearch, categoryOptions, handleCategoryChange, setDateRangeFilter, selectedDateMobile }) {
  const icon_arrow_back_mobile = require('../../../assets/icons/arrow-back-mobile.svg').default;
  const icon_arrow_download = require('../../../assets/icons/icon-arrow-download.svg').default;
  const icon_search = require('../../../assets/icons/icon-search.svg').default;
  const icon_filters = require('../../../assets/icons/icon-filters.svg').default;
  const classes = useStyles();

  const [showFilter, setShowFilter] = useState(false);

  const handleCloseFilter = () => {
    setShowFilter(false);
  }
  const handleShowFilter = () => {
    setShowFilter(true);
  }

  const LogBarangContentsMobile = () => {
    return datas.map((item, index) =>
      <div className="log-item" key={index}>
        <div className="date-and-status">
          <div className="date">{moment(item.created_at).format("MMMM D, YYYY")}</div>
          <div className={`status-wrapper ${item.activity_id === 1 ? 'masuk' : 'keluar'}`}>{item.activity_id === 1 ? 'MASUK' : 'KELUAR'}</div>
        </div>
        <div className="name-and-id">
          <p className="name">{item.name}</p>
          <p className="id">{item.product_id}</p>
        </div>
        <div className="price-and-value">
          <p className="difference">Harga: {currencyFormat(item.price)}</p>
          <p className="price">Jumlah: {item.difference} pcs</p>
        </div>
      </div>
    );
  }
  return (
    <Dialog
        open={showDialog}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
      >
        <div className="dialog-log-barang">
          <div className="header-dialog">
            <div className="titles">
              <div className="btn-back-wrapper" onClick={handleCloseDialog}>
                <img src={icon_arrow_back_mobile} alt="back" />
              </div>
              <div className="label-title">Log Barang</div>
            </div>
            <div className="wrap-wrap">
              <div className="download-wrapper">
                <img src={icon_arrow_download} alt="dwnld" />
                <p>Laporan</p>
              </div>
            </div>
          </div>
          <div className="content-dialog-log">
            <div className="filters">
              <div className="filter-button" onClick={handleShowFilter}>
                <img src={icon_filters} alt="filt" />
              </div>
              <form onSubmit={handleSearch}>
                <div className="search">
                  <input type="text" placeholder="Cari produk" id="search-log-modal" onChange={changeKeyword}/>
                  <button type="submit"><img src={icon_search} alt="srch"/></button>
                </div>
              </form>
            </div>
            <div className="items">
              <LogBarangContentsMobile />
            </div>
          </div>
        </div>
        <DialogFilters showDialog={showFilter} handleCloseDialog={handleCloseFilter} categoryOptions={categoryOptions} 
        handleCategoryChange={handleCategoryChange} setDateRangeFilter={setDateRangeFilter} selectedDateMobile={selectedDateMobile}/>
      </Dialog>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    // "@media (max-width: 771px)": {
    //   alignItems: "flex-end",
    // }
  },
  paper: { 
    minWidth:"100vw",
    maxHeight:"unset!important",
    borderRadius:"0!important"
    // "@media (max-width: 771px)": {
    //   width: "100%",
    //   margin: 0,
    //   maxWidth: "unset",
    // }
 },
}));

export default DialogLogBarang;
