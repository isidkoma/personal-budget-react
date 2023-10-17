import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './menu/menu'; // Renamed to start with an uppercase letter
import Hero from './hero/hero'; // Renamed to start with an uppercase letter
import Homepage from './homepage/homepage'; // Renamed to start with an uppercase letter
import Footer from './footer/footer'; // Renamed to start with an uppercase letter
import About from './about/about'; // Import the About component
import Login from './login/login'; // Import the Login component

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div className="MainContainer">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} /> {/* About route */}
          <Route path="/login" element={<Login />} /> {/* Login route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;