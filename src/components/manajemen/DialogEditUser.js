import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import $ from "jquery";
import Select from 'react-select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogEditUser({ showDialog, handleCloseDialog, item, resetPage }) {
  const env_api = process.env.REACT_APP_API_ENDPOINT;

  const line = require('../../assets/icons/Garis.svg').default;
  const rTrashCan = require('../../assets/icons/red-trashcan.svg').default;
  const gEdit = require('../../assets/icons/gray-edit-icon.svg').default;
  
  const classes = useStyles();
  const [currentData, setCurrentData] = useState({
    username: '',
    name: '',
    role: '',
    id: ''
  });
  const roleOptions = [
    { value: "0", label: "Manajemen"},
    { value: "1", label: "Lapangan"},
    { value: "2", label: "Hybrid (Lapangan + Manajemen produk)"},
  ];
  
  // ROUTER 
  useEffect( () => {
    if(item){
      let selectedRole = null;
      roleOptions.forEach( itemz => {
        if(itemz.value === `${item.role}`){
          selectedRole = itemz;
        }
      })
      setCurrentData({
        username: item ? item.username : '',
        name: item ? item.name : '',
        role: selectedRole,
        id: item ? item.id : ''
      })
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

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
      role: event
    })
  }

  const editUserSubmit = async (event) => {
    event.preventDefault();
    const { id, username, password, name, role } = currentData;
    if(username !== '' && password !== '' && name !== '' && role !== ''){
      const token = localStorage.getItem('auth_token');
      const required_role = '0,';

      $('#alert-login').addClass('d-none');

      const respon = await fetch(`${env_api}/manajemen/pengaturan/user/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': token,
          'required_role': required_role
        },
        body: JSON.stringify({id: id, username: username, password: password, name: name, role: role.value})
      })
      .then(response => response.json())
      if(respon.status === 400){
        localStorage.clear();
        window.location.href = '/';
      }
      if(respon.code === 200){
        resetPage();
        setCurrentData({
          username: '',
          name: '',
          role: '',
          id: ''
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
          <p className="title">Ubah Detail User</p>
          <div className="form-container">
            <form onSubmit={editUserSubmit}>
              <div className="input-container">
                <p className="placeholder active" id="username-ph">Username</p>
                <input type="text" onChange={usernameChange} value={currentData.username}/>
              </div>
              <div className="input-container">
                <p className="placeholder active" id="name-ph">Nama</p>
                <input type="text" onChange={nameChange} value={currentData.name}/>
              </div>
              <Select placeholder="Kategori" options={roleOptions} classNamePrefix="product-select" 
                onChange={handleRoleChange} value={currentData.role}/>
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

export default DialogEditUser;
