import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogDeleteUser({ showDialog, handleCloseDialog, item, resetPage }) {
  const env_api = process.env.REACT_APP_API_ENDPOINT;

  const line = require('../../assets/icons/Garis.svg').default;
  const rTrashCan = require('../../assets/icons/red-trashcan.svg').default;
  const gEdit = require('../../assets/icons/gray-edit-icon.svg').default;

  const [showError, setShowError] = useState(false);
  
  const classes = useStyles();

  const handleDeleteUser = async () => {
    const token = localStorage.getItem('auth_token');
    const required_role = '0,';
    const params = `id=${item.id}&role=${item.role}`;
    try {
      const datas = await fetch(`${env_api}/manajemen/pengaturan/user?${params}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': token,
          'required_role': required_role
        }
      }).then(response => response.json());
      if(datas.status === 400){
        localStorage.clear();
        window.location.href = '/';
      }
      else if(datas.code === 401){
        setShowError(true);
      }
      else{
        resetPage();
        setShowError(false);
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <Dialog
        open={showDialog}
        fullWidth={true}
        classes={{ container: classes.root, paper: classes.paper }}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <div className="dialog-action-pengaturan">
          <div className="delete-user">
            <img src={rTrashCan} alt='del' />
            <p>Anda yakin ingin menghapus user dengan username: {item ? item.username : null}?</p>
            <div className="buttons">
              <button className="primary" onClick={handleCloseDialog}>Batal</button>
              <button className="secondary" onClick={handleDeleteUser}>Hapus</button>
            </div>
            {showError ? 
            <div className="error-message">User dengan peran manajemen tidak bisa habis.</div>
            :
            null}

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

export default DialogDeleteUser;
