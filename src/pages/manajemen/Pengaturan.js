import '../../styles/manajemen/Pengaturan.scss';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/manajemen/Navbar';
import Header from '../../components/manajemen/Header';
import Pagination from '@mui/material/Pagination';
import Select from 'react-select';
import DialogActionUser from '../../components/manajemen/DialogActionUser';
import DialogEditUser from '../../components/manajemen/DialogEditUser';
import DialogEditPassword from '../../components/manajemen/DialogEditPassword';
import DialogDeleteUser from '../../components/manajemen/DialogDeleteUser';
import DialogAddUser from '../../components/manajemen/DialogAddUser';

function Pengaturan() {
  const env_api = process.env.REACT_APP_API_ENDPOINT;
  const icon_search = require('../../assets/icons/icon-search.svg').default;
  const icon_seemore = require('../../assets/icons/icon-see-more.svg').default;
  const blueCIcon = require('../../assets/icons/close-blue-icon.svg').default;

  const [users, setUsers] = useState([]);
  const [paramsDashB, setParamsDashB] = useState({
    keyword: null,
    roles: [],
    offset: 0,
    limit: 10
  });
  const [totalDatas, setTotalDatas] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState(null);
  const categoryOptions = [
    { value: "0", label: "Manajemen"},
    { value: "1", label: "Lapangan"},
    { value: "2", label: "Hybrid (Lapangan + Manajemen produk)"},
  ];
  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showActionUser, setShowActionUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  // Fetch data for this page
  const fetchItems = async () => {
    const token = localStorage.getItem('auth_token');
    const required_role = '0,';
    const params = 
    `keyword=${paramsDashB.keyword}&roles=${paramsDashB.roles}&offset=${paramsDashB.offset}&limit=${paramsDashB.limit}`;
    try {
      const datas = await fetch(`${env_api}/manajemen/pengaturan/user?${params}`, {
        method: 'GET',
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
      else{
        setUsers(datas.data);
        setTotalDatas(datas.meta.total)
      }
    } catch (error) {
      console.log(error);
      setUsers([]);
      setTotalDatas(0)
    }
  }

  // ROUTER 
  useEffect( () => {
    if(!localStorage.getItem("auth_token")){
      localStorage.clear();
      window.location.href = "/";
    }
    else{
      // verifyToken();
      fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsDashB]);

  const changeKeyword = (event) => {
    setKeyword(event.target.value);
  }
  const handleSearch = (event) => {
    event.preventDefault();
    if(keyword !== null && keyword !== ''){
      setParamsDashB({
        ...paramsDashB,
        keyword: keyword
      })
    }
    else{
      setParamsDashB({
        ...paramsDashB,
        keyword: ""
      })
    }
  }

  const handleChangePage = (_, value) => {
    setCurrentPage(value);
    if (value === 1) {
      setParamsDashB({
        ...paramsDashB,
        offset: 0
      })
    }
    else{
      const tempOffset = (value - 1) * paramsDashB.limit;
      setParamsDashB({
        ...paramsDashB,
        offset: tempOffset
      })
    }
  }

  const handleCategoryChange = (event) => {
    let arrCategories = [];
    let arrFilterCategories = [];
    event.forEach((item) => {
      arrCategories.push(item.value);
      arrFilterCategories.push(item);
    })
    setParamsDashB({
      ...paramsDashB,
      roles: arrCategories
    })
    setSelectedRole(arrFilterCategories);
  }

  const removeSelectedCategory = (index) => {
    let arrFilterCat = selectedRole;
    arrFilterCat.splice(index, 1);
    let param = [];
    arrFilterCat.forEach((item) => {
      param.push(item.value);
    })
    setParamsDashB({
      ...paramsDashB,
      roles: param
    })
    setSelectedRole(arrFilterCat);
  }
  const resetCategoryFilter = () => {
    let arrFilterCat = [];
    setParamsDashB({
      ...paramsDashB,
      roles: []
    })
    setSelectedRole(arrFilterCat);
  }

  const handleCloseDialogAction = () => {
    setShowActionUser(false)
  }

  const handleOpenDialogAction = (item) => {
    setSelectedUser(item);
    setShowActionUser(true)
  }

  const handleShowEdit = () => {
    setShowActionUser(false);
    setShowEditUser(true);
  }
  const handleCloseEdit = () => {
    setShowEditUser(false);
    setShowActionUser(true);
  }

  const handleShowEditPassword = () => {
    setShowActionUser(false);
    setShowEditPassword(true);
  }
  const handleCloseEditPassword = () => {
    setShowEditPassword(false);
    setShowActionUser(true);
  }

  const handleShowDeleteUser  = () => {
    setShowActionUser(false);
    setShowDeleteUser(true);
  }
  const handleCloseDeleteUser = () => {
    setShowDeleteUser(false);
    setShowActionUser(true);
  }

  const handleShowAddUser  = () => {
    setShowAddUser(true);
  }
  const handleCloseAddUser = () => {
    setShowAddUser(false);
  }

  const resetPage = () => {
    setShowActionUser(false);
    setShowEditUser(false);
    setShowEditPassword(false);
    setShowDeleteUser(false);
    setShowAddUser(false);
    setParamsDashB({
      keyword: null,
      roles: [],
      offset: 0,
      limit: 10
    })
  }

  const tableContent = users.map((item) =>
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.username}</td>
      <td>{item.user_role}</td>
      <td><img src={icon_seemore} alt="see" onClick={() => handleOpenDialogAction(item)} className="action-wrapper"/></td>
    </tr>
  );

  return (
    <div className="container-manajemen">
      <Navbar pageName="Pengaturan"/>
      <div className="container-content-manajemen">
        <Header pageName="Pengaturan"/>
        <div className="container-manajemen-pengaturan">
          <div className="header-mobile">
            <p>Manajemen User</p>
          </div>
          <div className="manajemen-pengaturan">
            <div className="row">
              <div className="filters">
                <form onSubmit={handleSearch}>
                  <div className="search">
                    <input type="text" placeholder="Cari Username" onChange={changeKeyword}/>
                    <button type="submit"><img src={icon_search} alt="srch"/></button>
                  </div>
                </form>
                <Select placeholder="Peran" options={categoryOptions} classNamePrefix="product-select" 
                  isMulti={true} onChange={handleCategoryChange} controlShouldRenderValue={false}
                  value={selectedRole}/>
              </div>
              <div className="add-user">
                <button className="btn-add" onClick={handleShowAddUser}>Tambah User</button>
              </div>
            </div>
            <div className="product-applied-filters">
              <ul className="applied-filter-list">
                {selectedRole && selectedRole.length > 0 ?
                  selectedRole.map((filterItem, index) => (
                    <li className="applied-filter-item" key={index}>
                      <p className="filter-title">{filterItem.label}</p>
                      <img className="filter-remove" src={blueCIcon} alt="close icon" onClick={() => removeSelectedCategory(index)}/>
                    </li>
                  ))
                  : ""}
              </ul>
              {selectedRole && selectedRole.length > 0 ?
                <p className="reset-filter-title" onClick={resetCategoryFilter}>Reset Peran</p>
                : ""}
            </div>
            
            <table className="table-dashboard" cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <td>Nama</td>
                  <td>Username</td>
                  <td>Peran</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {tableContent}
              </tbody>
            </table>
            <Pagination 
              defaultPage={currentPage}
              count={Math.ceil(totalDatas / paramsDashB.limit)} 
              variant="outlined" shape="rounded" 
              onChange={handleChangePage}
              className="pagination-dashboard"/>
          </div>
        </div>
      </div>
      <DialogActionUser showDialog={showActionUser} handleCloseDialog={handleCloseDialogAction} item={selectedUser} 
      handleShowEdit={handleShowEdit} handleShowEditPassword={handleShowEditPassword} handleShowDeleteUser={handleShowDeleteUser}/>

      <DialogEditUser showDialog={showEditUser} handleCloseDialog={handleCloseEdit} item={selectedUser} resetPage={resetPage} />
      <DialogEditPassword showDialog={showEditPassword} handleCloseDialog={handleCloseEditPassword} item={selectedUser} resetPage={resetPage} />
      <DialogDeleteUser showDialog={showDeleteUser} handleCloseDialog={handleCloseDeleteUser} item={selectedUser} resetPage={resetPage} />

      <DialogAddUser showDialog={showAddUser} handleCloseDialog={handleCloseAddUser} resetPage={resetPage} />
    </div>
  );
}

export default Pengaturan;