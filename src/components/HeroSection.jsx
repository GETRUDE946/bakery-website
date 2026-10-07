import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title">Crafting Sweet Memories in Lilongwe</h1>
        <p className="hero-subtitle">
          Artisanal pastries, custom cakes, and delightful treats baked fresh daily with passion and the finest ingredients.
        </p>
        <div className="hero-buttons">
          <a href="#menu" className="btn btn-primary">Explore Menu</a>
          <a href="#order" className="btn btn-outline" style={{color: 'white', borderColor: 'white'}}>Order Custom Cake</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
