import Login from './pages/Login';
import './App.css';
import Product from './pages/manajemen/Product';
import Manajemen from './pages/manajemen/Dashboard';
import Pengaturan from './pages/manajemen/Pengaturan';
import HomeLapangan from './pages/lapangan/HomeLapangan';
import PDP from './pages/lapangan/PDP';
import Aktivitas from './pages/lapangan/Aktivitas';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/manajemen' element={<Manajemen/>} />
            <Route path='/manajemen/produk' element={<Product/>} />
            <Route path='/manajemen/pengaturan' element={<Pengaturan/>} />
            <Route path='/lapangan' element={<HomeLapangan/>} />
            <Route path='/lapangan/pdp' element={<PDP/>} />
            <Route path='/lapangan/aktivitas' element={<Aktivitas/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
