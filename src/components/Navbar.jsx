import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar glass">
      <div className="container nav-container">
        <a href="/" className="logo">
          Chloe<span className="highlight">'s</span>
        </a>
        
        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#menu" onClick={() => setIsOpen(false)}>Menu</a>
          <a href="#order" onClick={() => setIsOpen(false)}>Custom Cakes</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact Us</a>
        </nav>
        
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
