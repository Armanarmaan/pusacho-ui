import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import $ from "jquery";
import Select from 'react-select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogAddUser({ showDialog, handleCloseDialog, resetPage }) {
  const env_api = process.env.REACT_APP_API_ENDPOINT;

  const line = require('../../assets/icons/Garis.svg').default;
  const rTrashCan = require('../../assets/icons/red-trashcan.svg').default;
  const gEdit = require('../../assets/icons/gray-edit-icon.svg').default;
  
  const classes = useStyles();

  const roleOptions = [
    { value: "0", label: "Manajemen"},
    { value: "1", label: "Lapangan"},
    { value: "2", label: "Hybrid (Lapangan + Manajemen produk)"},
  ];

  const [showPass, setShowPass] = useState(false);
  const [currentData, setCurrentData] = useState({
    username: '',
    password: '',
    name: '',
    role: ''
  });

  const usernameChange = (event) => {
    if(event.target.value !== ''){
      $('#username-ph').addClass('active');
      setCurrentData({
        ...currentData,
        username: event.target.value
      })
    }
    else{
      $('#username-ph').removeClass('active');
      setCurrentData({
        ...currentData,
        username: ''
      })
    }
  }
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
  const nameChange = (event) => {
    if(event.target.value !== ''){
      $('#name-ph').addClass('active');
      setCurrentData({
        ...currentData,
        name: event.target.value
      })
    }
    else{
      $('#name-ph').removeClass('active');
      setCurrentData({
        ...currentData,
        name: ''
      })
    }
  }
  const handleRoleChange = (event) => {
    setCurrentData({
      ...currentData,
      role: event.value
    })
  }

  const registerSubmit = async (event) => {
    event.preventDefault();
    const { username, password, name, role } = currentData;
    if(username !== '' && password !== '' && name !== '' && role !== ''){
      $('#alert-login').addClass('d-none');
      const respon = await fetch(`${env_api}/auth/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password, name: name, role: role})
      })
      .then(response => response.json())
      if(respon.status === 200){
        resetPage();
        setCurrentData({
          username: '',
          password: '',
          name: '',
          role: ''
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
          <p className="title">Tambah User</p>
          <div className="form-container">
            <form onSubmit={registerSubmit}>
              <div className="input-container">
                <p className="placeholder" id="username-ph">Username</p>
                <input type="text" onChange={usernameChange}/>
              </div>
              <div className="input-container">
                <p className="placeholder" id="password-ph">Password</p>
                <input type="password" onChange={passwordChange} id="input-password"/>
                <p className="show" onClick={showPassword}>Lihat</p>
              </div>
              <div className="input-container">
                <p className="placeholder" id="name-ph">Nama</p>
                <input type="text" onChange={nameChange}/>
              </div>
              <Select placeholder="Kategori" options={roleOptions} classNamePrefix="product-select" 
                onChange={handleRoleChange}/>
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
    width: "500px",
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

export default DialogAddUser;
