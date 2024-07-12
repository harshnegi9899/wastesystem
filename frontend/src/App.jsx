// src/App.js
import React from 'react';
import { BrowserRouter , Route,Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SchedulePickup from './pages/SchedulePickup';
import RecyclingInfo from './pages/RecyclingInfo';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <div className="container">
            <h1 id="branding"><img src="/logo.png" alt="EcoManage Logo" /> EcoManage</h1>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/schedule-pickup">Schedule Pickup</Link></li>
                <li><Link to="/recycling-info">Recycling Info</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="container">
          <Routes>
          <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/schedule-pickup" component={SchedulePickup} />
            <Route path="/recycling-info" component={RecyclingInfo} />
            <Route path="/dashboard" component={Dashboard} />

          </Routes>
           
          
        </div>
        <footer>
          <p>EcoManage &copy; 2024</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
