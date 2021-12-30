import Login from './pages/Login';

import Product from './pages/manajemen/Product';
import Manajemen from './pages/manajemen/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/manajemen' element={<Manajemen/>} />
            <Route path='/manajemen/produk' element={<Product/>} component={App}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
