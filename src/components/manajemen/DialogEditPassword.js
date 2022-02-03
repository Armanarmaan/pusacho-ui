import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import $ from "jquery";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogEditPassword({ showDialog, handleCloseDialog, item, resetPage }) {
  const env_api = process.env.REACT_APP_API_ENDPOINT;

  const classes = useStyles();

  const [showPass, setShowPass] = useState(false);
  const [currentData, setCurrentData] = useState({
    password: ''
  });

  const passwordChange = (event) => {
    if(event.target.value !== ''){
      $('#password-ph').addClass('active');
      setCurrentData({
        ...currentData,
        password: event.target.value
      })
    } 
    else{
      $('#password-ph').removeClass('active');
      setCurrentData({
        ...currentData,
        password: ''
      })
    }
  }
  const showPassword = () => {
    if(showPass){
      $('#input-password').attr('type', 'password');
      setShowPass(false);
    }
    else{
      $('#input-password').attr('type', 'text');
      setShowPass(true);
    }
  }

  const editPasswordSubmit = async (event) => {
    event.preventDefault();
    const { password, } = currentData;
    if(password !== ''){
      const token = localStorage.getItem('auth_token');
      const required_role = '0,';

      $('#alert-login').addClass('d-none');
      const respon = await fetch(`${env_api}/auth/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': token,
          'required_role': required_role
        },
        body: JSON.stringify({id: item.id, password: password})
      })
      .then(response => response.json())
      if(respon.status === 200){
        resetPage();
        setCurrentData({
          password: '',
        })
      }
      else{
        $('#alert-login').removeClass('d-none');
      }
    }
    else{
      $('#alert-login').removeClass('d-none');
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
          <p className="title">Ubah Password {item ? item.username : null}</p>
          <div className="form-container">
            <form onSubmit={editPasswordSubmit}>
              <div className="input-container">
                <p className="placeholder" id="password-ph">Password</p>
                <input type="password" onChange={passwordChange} id="input-password"/>
                <p className="show" onClick={showPassword}>Lihat</p>
              </div>
              <p id="alert-login" className="d-none">Mohon cek kembali data yang diisi.</p>
              <input type="submit" value="Simpan" className="btn-blue"/>
            </form>
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

export default DialogEditPassword;
