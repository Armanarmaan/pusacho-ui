import Login from './pages/Login';

import Product from './pages/admin/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/admin/product' element={<Product/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
