import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/views/Home';
import { Login } from './components/views/login/Login';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
