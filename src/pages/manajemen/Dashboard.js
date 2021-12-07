import '../../styles/manajemen/Dashboard.scss';
import $ from "jquery";
import React, { useState } from 'react';
import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';

function Dashboard() {
  
  return (
    <div className="container-manajemen">
      <Navbar/>
      <div className="container-content-manajemen">
        <Header/>
      </div>
    </div>
  );
}

export default Dashboard;
