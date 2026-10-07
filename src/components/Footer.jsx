import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111', color: '#888', padding: '2rem 0', textAlign: 'center' }}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Chloe's. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
