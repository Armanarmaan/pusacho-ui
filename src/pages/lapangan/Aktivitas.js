import '../../styles/lapangan/Aktivitas.scss';
import $ from "jquery";
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '../../components/lapangan/Navbar';
import moment from 'moment';
import LazyLoad from 'react-lazyload';

function Aktivitas() {
    const env_api = process.env.REACT_APP_API_ENDPOINT;
    const Rectangle = require('../../assets/icons/Rectangle.svg').default;
    const [aktivitas, setAktivitas] = useState([]);

    // const lazyNotif = lazy(() => import({ActivityContents}));

    useEffect(() => {
        fetchAktivitas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAktivitas = async () => {
        // const token = localStorage.getItem('auth_token');
        // const required_role = '0,';
        try {
            const datas = await fetch(`${env_api}/lapangan/aktivitas?id=4`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth_token': token,
                    // 'required_role': required_role
                }
            }).then(response => response.json())
            console.log(datas)
            setAktivitas(datas.data)

        } catch (error) {

        }
    }

    const ActivityContents = () => {
        return aktivitas.map((item, index) =>
            <div className="box">
                <LazyLoad height={200} offset={100}>
                <div className="date">{moment(item[0].created_at).format("MMMM DD, YYYY")}</div>
                {item.map((itemz, index) =>
                    <div>
                        <div className="info">
                            <div className="imgproduk">
                                <img src={Rectangle} alt="rectangle" className="img" />
                            </div>
                            <div className="desc">
                                <div className="anda">Anda</div>
                                <div className="wording">{itemz.wording}</div>
                                <div className="name">{itemz.name}</div>
                                <div className="size">{itemz.size}</div>
                                <div className="sebanyak">sebanyak</div>
                                <div className="piece">{`${itemz.difference} buah`}</div>
                            </div>
                        </div>
                        <div className="time">
                            <p>{moment(itemz.created_at).format("HH:mm")}</p>
                        </div>
                        <div className="grayline"></div>
                    </div>
                )}
                </LazyLoad>
            </div>
        );
    }

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
                    {/* <LazyLoad height={2000}> */}
                        <ActivityContents />
                    {/* </LazyLoad> */}
                </div>
            </div>
            <Navbar pageName="Aktivitas" />
        </div>
    );
}

export default Aktivitas;
