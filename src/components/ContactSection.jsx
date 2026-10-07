import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title text-center">Visit Us</h2>
        <p className="section-subtitle text-center">We'd love to see you at our Lilongwe location.</p>
        
        <div className="grid grid-cols-1 grid-cols-md-2 contact-grid">
          <div className="contact-info glass animate-fade-in">
            <div className="info-block">
              <h3>Address</h3>
              <p>123 City Centre</p>
              <p>Lilongwe, Malawi</p>
            </div>
            
            <div className="info-block">
              <h3>Hours of Operation</h3>
              <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
              <p>Saturday: 8:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            
            <div className="info-block">
              <h3>Contact</h3>
              <p>Email: chirwagetrudechloe@gmail.com</p>
              <p>Phone: +163710542597</p>
            </div>
          </div>
          
          <div className="contact-map animate-fade-in">
            <iframe 
              title="Lilongwe Bakery Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123282.87103565011!2d33.687258045610815!3d-13.985958694082464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d3744658ebc9%3A0x9db2efd978a9c43f!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2sus!4v1716301234567!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '300px', borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
