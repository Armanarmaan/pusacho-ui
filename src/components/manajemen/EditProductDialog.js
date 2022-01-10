import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import { makeStyles } from "@mui/styles";

import $ from "jquery";

export default function ScanDialog({ showModal, closeModal }) {
  const classes = useStyles();
 
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
      <div className="edit-product-wrapper">
        
      </div>
    </Dialog>
  )
};