import Login from './pages/Login';
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
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
