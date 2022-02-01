import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import moment from 'moment';
import DialogFilters from '../mobile/DialogFilters';
import Pagination from '@mui/material/Pagination';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function DialogActivity({ showDialog, handleCloseDialog, datas, categoryOptions, 
  handleCategoryChange, setDateRangeFilter, selectedDateMobile,
  currentPage, totalDatas, handleChangePage, showDateLaporanOne, 
  selectedCategory, removeSelectedCategory, resetCategoryFilter }) {

  const env_api = process.env.REACT_APP_API_ENDPOINT;

  const icon_arrow_back_mobile = require('../../../assets/icons/arrow-back-mobile.svg').default;
  const icon_arrow_download = require('../../../assets/icons/icon-arrow-download.svg').default;
  const icon_filters = require('../../../assets/icons/icon-filters.svg').default;
  const blueCIcon = require('../../../assets/icons/close-blue-icon.svg').default;
  const classes = useStyles();


  const [showFilter, setShowFilter] = useState(false);

  const handleCloseFilter = () => {
    setShowFilter(false);
  }
  const handleShowFilter = () => {
    setShowFilter(true);
  }


  const ActivityContentsMobile = () => {
    return datas.map((item, index) =>
      <div className="activity-item" key={index}>
        <div className="date">{moment(item[0].created_at).format("MMMM D, YYYY")}</div>
        {item.map((item2) => 
          <div className="item-row" key={item2.id}>
            <div className="item-details">
              <div className="img-wrapper">
                <img src={`${env_api}${item2.images}`} alt="pic" />
              </div>
              <div className="desc">
                <p className="actor">{item2.actor_name}</p>
                <p className="action">{item2.wording}</p>
                <p className="item">{item2.name}</p>
                <p className="from-after">dari</p>
                <p className="value">{item2.initial_value}</p>
                <p className="from-after">menjadi</p>
                <p className="value">{item2.final_value}</p>
              </div>
            </div>
            <div className="time">{moment(item2.created_at).format("HH:mm")}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Dialog
        open={showDialog}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
        TransitionComponent={Transition}
      >
        <div className="dialog-activity-barang">
          <div className="header-dialog">
            <div className="titles">
              <div className="btn-back-wrapper" onClick={handleCloseDialog}>
                <img src={icon_arrow_back_mobile} alt="back" />
              </div>
              <div className="label-title">Aktivitas</div>
            </div>
            <div className="wrap-wrap">
              <div className="download-wrapper" onClick={showDateLaporanOne}>
                <img src={icon_arrow_download} alt="dwnld" />
                <p>Laporan</p>
              </div>
            </div>
          </div>
          <div className="content-dialog-activity">
            <div className="filters">
              <div className="filter-button" onClick={handleShowFilter}>
                <img src={icon_filters} alt="filt" />
                Filter
              </div>
            </div>
            <div className="product-applied-filters">
              <div className="applied-filter-list">
                {selectedCategory && selectedCategory.length > 0 ?
                  selectedCategory.map((filterItem, index) => (
                    <div className="applied-filter-item" key={index}>
                      <p className="filter-title">{filterItem.label}</p>
                      <img className="filter-remove" src={blueCIcon} alt="close icon" onClick={() => removeSelectedCategory(index)}/>
                    </div>
                  ))
                  : ""}
              </div>
              {selectedCategory && selectedCategory.length > 0 ?
                <p className="reset-filter-title" onClick={resetCategoryFilter}>Reset Kategori</p>
                : ""}
            </div>
            <div className="activity-items">
              <ActivityContentsMobile />
              <Pagination 
              defaultPage={currentPage}
              count={Math.ceil(totalDatas / 10)} 
              variant="outlined" shape="rounded" 
              onChange={handleChangePage}
              className="pagination-dashboard"/>
            </div>
          </div>
        </div>
        <DialogFilters showDialog={showFilter} handleCloseDialog={handleCloseFilter} categoryOptions={categoryOptions} 
        handleCategoryChange={handleCategoryChange} setDateRangeFilter={setDateRangeFilter} selectedDateMobile={selectedDateMobile}
        selectedCategory={selectedCategory}/>
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
    minWidth:"100vw!important",
    maxHeight:"unset!important",
    borderRadius:"0!important"
    // "@media (max-width: 771px)": {
    //   width: "100%",
    //   margin: 0,
    //   maxWidth: "unset",
    // }
 },
}));

export default DialogActivity;
