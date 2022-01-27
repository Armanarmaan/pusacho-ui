import React from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogLogout({ showDialog, handleCloseDialog }) {

  const icon_logout = require('../../../assets/icons/icon-logout-mnjmn.svg').default;
  const line = require('../../../assets/icons/Garis.svg').default;
  
  const classes = useStyles();
  const submitLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }
  return (
    <Dialog
        open={showDialog}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <div className="dialog-filter-mobile-dashboard logout">
          <div className="header-filter-mobile">
            <img src={line} alt="line-dialog" />
          </div>
          <div className="filter-container"onClick={submitLogout}>
            <img src={icon_logout} alt="logout" />
            <p>Keluar</p>
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
    minWidth:"100vw!important",
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

export default DialogLogout;
