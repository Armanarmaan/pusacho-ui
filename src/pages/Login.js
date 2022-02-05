import '../styles/Login.scss';
import $ from "jquery";
import React, { useState } from 'react';

function Login() {
  const env_api = process.env.REACT_APP_API_ENDPOINT;
  const imgOffice = require('../assets/office-warehouse.png').default;

  // Check if user is logged in or not
  if(localStorage.getItem("auth_token")){
    localStorage.getItem("role") === '0' ? window.location.href = "/manajemen" : 
    localStorage.getItem("role") === '2' ? window.location.href = "/manajemen/produk" : window.location.href = "/manajemen";
  }

  const [showPass, setShowPass] = useState(false);
  const [currentData, setCurrentData] = useState({
    username: '',
    password: ''
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
  const loginSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = currentData;
    if(username !== '' && password !== ''){
      $('#alert-login').addClass('d-none');
      const respon = await fetch(`${env_api}/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
      })
      .then(response => response.json())
      if(respon.status === 200){
        localStorage.setItem("role", respon.role);
        localStorage.setItem("auth_token", respon.auth_token);
        localStorage.setItem("username", respon.username);
        localStorage.setItem("id", respon.id);
        setCurrentData({
          username: '',
          password: ''
        })
        if(respon.role === 0){
          window.location.href = "/manajemen";
        }
        else if(respon.role === 1){
          window.location.href = "/lapangan";
        }
        else if(respon.role === 2){
          window.location.href = "/manajemen/produk";
        }
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
    <div className="container-login">
      <div className="img-section">
        <img src={imgOffice} alt="office-warehouse"/>
      </div>
      <div className="form-section">
        <div className="form-container">
          <p className="title">Selamat Datang</p>
          <p className="sub-title">Masuk ke akun anda</p>
          <form onSubmit={loginSubmit}>
            <div className="input-container">
              <p className="placeholder" id="username-ph">Username</p>
              <input type="text" onChange={usernameChange}/>
            </div>
            <div className="input-container">
              <p className="placeholder" id="password-ph">Password</p>
              <input type="password" onChange={passwordChange} id="input-password"/>
              <p className="show" onClick={showPassword}>Lihat</p>
            </div>
            <input type="submit" value="Masuk" className="btn-blue"/>
            <p id="alert-login" className="d-none">Mohon cek kembali username / password anda!</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
