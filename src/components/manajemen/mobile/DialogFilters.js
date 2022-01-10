import React from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import moment from 'moment';
import Select from 'react-select';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

function DialogFilters({ showDialog, handleCloseDialog, categoryOptions, handleCategoryChange, setDateRangeFilter, selectedDateMobile }) {

  const line = require('../../../assets/icons/Garis.svg').default;
  const icon_expand = require('../../../assets/icons/icon-expand.svg').default;
  const icon_calendar = require('../../../assets/icons/icon-calendar.svg').default;
  
  const classes = useStyles();

  const showDateFilter = () => {
    let daterangeObj = document.getElementById("daterangepicker-filter-mob").ej2_instances[0]; 
    daterangeObj.show();
  }
  return (
    <Dialog
        open={showDialog}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
        onClose={handleCloseDialog}
      >
        <div className="dialog-filter-mobile-dashboard">
          <div className="header-filter-mobile">
            <img src={line} alt="line-dialog" />
          </div>
          <div className="filter-container">
            <div className="filter">
              <Select placeholder="Kategori" options={categoryOptions} classNamePrefix="product-select" 
              isMulti={true} onChange={handleCategoryChange} className="container-select"/>
            </div>
            <div className="filter">
              <div className="content">
                <button className="btn-date-mob" onClick={showDateFilter}>
                  <div>
                    <img src={icon_calendar} alt="clndr" />
                    <p className="label-chosen-date-filter">{selectedDateMobile === '' ? 'Pilih Tanggal' : selectedDateMobile}</p>
                  </div>
                  <img src={icon_expand} alt="expnd" />
                </button>
                <DateRangePickerComponent id="daterangepicker-filter-mob" 
                change={setDateRangeFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    margin: 0
    // "@media (max-width: 771px)": {
    //   alignItems: "flex-end",
    // }
  },
  paper: { 
    minWidth:"100vw",
    maxHeight:"unset!important",
    borderRadius:"0!important",
    margin: 0,
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent"
    // "@media (max-width: 771px)": {
    //   width: "100%",
    //   margin: 0,
    //   maxWidth: "unset",
    // }
 },
}));

export default DialogFilters;
