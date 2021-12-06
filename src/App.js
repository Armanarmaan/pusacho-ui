import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
