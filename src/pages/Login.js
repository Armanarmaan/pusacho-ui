import '../styles/Login.scss';
import $ from "jquery";
import React, { useState } from 'react';

function Login() {
  const imgOffice = require('../assets/office-warehouse.png').default;

  const [showPass, setShowPass] = useState(false);

  const usernameChange = (event) => {
    event.target.value !== '' ?  $('#username-ph').addClass('active') : $('#username-ph').removeClass('active');
  }
  const passwordChange = (event) => {
    event.target.value !== '' ?  $('#password-ph').addClass('active') : $('#password-ph').removeClass('active');
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
  return (
    <div className="container-login">
      <div className="img-section">
        <img src={imgOffice} alt="office-warehouse"/>
      </div>
      <div className="form-section">
        <div className="form-container">
          <p className="title">Selamat Datang</p>
          <p className="sub-title">Masuk ke akun anda</p>
          <form>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
