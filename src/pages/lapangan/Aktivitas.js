import '../../styles/lapangan/Aktivitas.scss';
import $ from "jquery";
import React, { useState } from 'react';
import Navbar from '../../components/lapangan/Navbar';

function Aktivitas() {
    const Rectangle = require('../../assets/icons/Rectangle.svg').default;

    return (
        <div className="container-aktivitas">
            <div className="section-1">
                <div className="headeraktivitas">
                    <div className="text">
                        <p className="header">Aktivitas</p>
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="container-box">
                    <div className="box">
                        <div className="date">
                            May 29, 2021
                        </div>
                        <div className="info">
                            <div className="imgproduk">
                                <img src={Rectangle} alt="rectangle" className="img" />
                            </div>
                            <div>
                                <p>Anda menambahkan stok produk manik manik 10x10mm Hitam sebanyak 500 buah</p>
                            </div>
                        </div>
                        <div className="time">
                            <p>10:12 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    );
}

export default Aktivitas;
