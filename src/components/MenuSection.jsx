import React from 'react';
import './MenuSection.css';

const MenuSection = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Artisan Croissant',
      description: 'Flaky, buttery perfection baked fresh every morning.',
      price: '$4.50',
      image: '/images/croissant.jpg'
    },
    {
      id: 2,
      name: 'Signature Chocolate Cake',
      description: 'Rich, moist layers with silky ganache.',
      price: '$45.00',
      image: '/images/custom_cake.jpg'
    },
    {
      id: 3,
      name: 'Classic Sourdough',
      description: 'Naturally leavened with a perfect crust.',
      price: '$8.00',
      image: '/images/bakery_hero.jpg'
    }
  ];

  return (
    <section id="menu" className="section menu-section">
      <div className="container text-center">
        <h2 className="section-title">Our Delights</h2>
        <p className="section-subtitle">Baked fresh daily with the finest ingredients</p>
        
        <div className="grid grid-cols-1 grid-cols-md-3 menu-grid">
          {menuItems.map(item => (
            <div key={item.id} className="menu-card glass animate-fade-in">
              <div className="menu-image-wrapper">
                <img src={item.image} alt={item.name} className="menu-image" />
              </div>
              <div className="menu-content">
                <h3 className="menu-item-title">{item.name}</h3>
                <p className="menu-item-desc">{item.description}</p>
                <p className="menu-item-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
