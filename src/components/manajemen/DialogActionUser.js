import React from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogActionUser({ showDialog, handleCloseDialog, handleShowEdit, handleShowEditPassword, handleShowDeleteUser, item }) {

  const line = require('../../assets/icons/Garis.svg').default;
  const rTrashCan = require('../../assets/icons/red-trashcan.svg').default;
  const gEdit = require('../../assets/icons/gray-edit-icon.svg').default;

  const classes = useStyles();
  return (
    <Dialog
        open={showDialog}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <div className="dialog-action-pengaturan">
          <p className="title">Username : {item ? item.username : ""}</p>
          <div className="items">
            <div className="item" onClick={handleShowEdit}>
              <img src={gEdit} alt="edit" />
              <p>Ubah Detail User</p>
            </div>
            <div className="item" onClick={handleShowEditPassword}>
              <img src={gEdit} alt="edit" />
              <p>Ubah Password User</p>
            </div>
            <div className="item" onClick={handleShowDeleteUser}>
              <img src={rTrashCan} alt="trash" />
              <p>Hapus User</p>
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
    width: "375px",
    height: "fit-content",
    "@media (max-width: 771px)": {
      minWidth:"100vw!important",
      height: "50vh",
      maxHeight:"unset!important",
      width: "unset!important",
      borderRadius:"0!important",
      margin: 0,
      position: "absolute",
      bottom: 0,
      borderRadius: "10px"
    }
 },
}));

export default DialogActionUser;
