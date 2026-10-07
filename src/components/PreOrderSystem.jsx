import React, { useState, useEffect } from 'react';
import './PreOrderSystem.css';

const PreOrderSystem = () => {
  const initialFormState = {
    name: '',
    email: '',
    cakeSize: '6-inch',
    flavor: 'Vanilla Bean',
    specifications: '',
    paymentMethod: 'Airtel Money'
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [step, setStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Pricing logic
  const sizePrices = {
    '6-inch': 25,
    '8-inch': 45,
    '10-inch': 65,
    'Tiered': 100
  };

  const flavorSurcharges = {
    'Vanilla Bean': 0,
    'Rich Chocolate': 5,
    'Red Velvet': 5,
    'Lemon Raspberry': 10
  };

  useEffect(() => {
    const base = sizePrices[formData.cakeSize] || 25;
    const surcharge = flavorSurcharges[formData.flavor] || 0;
    setTotalPrice(base + surcharge);
  }, [formData.cakeSize, formData.flavor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, totalPrice: `$${totalPrice}` })
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData(initialFormState);
        setStep(1);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Failed to submit order.");
      }
    } catch (error) {
      console.error("Failed to submit order", error);
      alert("Failed to submit order. Make sure the backend server is running.");
    }
  };

  return (
    <section id="order" className="section order-section">
      <div className="container">
        <div className="order-container glass">
          <div className="order-info text-center">
            <h2 className="section-title">Pre-Order Custom Cakes</h2>
            <p className="section-subtitle">Let us make your celebration extra special.</p>
          </div>
          
          {submitted ? (
            <div className="success-message animate-fade-in text-center">
              <h3>Thank You!</h3>
              <p>Your pre-order request has been received. We will contact you shortly to confirm details.</p>
            </div>
          ) : (
            <div className="form-wrapper">
              {step === 1 ? (
                <form onSubmit={handleProceed} className="order-form animate-fade-in">
                  <div className="grid grid-cols-1 grid-cols-md-2">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input type="text" name="name" value={formData.name} className="form-input" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" name="email" value={formData.email} className="form-input" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Cake Size</label>
                      <select name="cakeSize" value={formData.cakeSize} className="form-select" onChange={handleChange}>
                        <option value="6-inch">6-inch (Serves 8-10)</option>
                        <option value="8-inch">8-inch (Serves 12-15)</option>
                        <option value="10-inch">10-inch (Serves 20-25)</option>
                        <option value="Tiered">Tiered (Custom Servings)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Flavor Profile</label>
                      <select name="flavor" value={formData.flavor} className="form-select" onChange={handleChange}>
                        <option value="Vanilla Bean">Classic Vanilla Bean</option>
                        <option value="Rich Chocolate">Rich Chocolate Ganache</option>
                        <option value="Red Velvet">Signature Red Velvet</option>
                        <option value="Lemon Raspberry">Lemon Raspberry</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Design Specifications & Notes</label>
                    <textarea name="specifications" value={formData.specifications} className="form-textarea" rows="4" placeholder="Tell us about the occasion, theme, and any special requests..." required onChange={handleChange}></textarea>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Proceed to Billing</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="billing-form animate-fade-in">
                  <h3 className="billing-title text-center" style={{marginBottom: '1.5rem', color: 'var(--primary-color)'}}>Order Summary & Billing</h3>
                  
                  <div className="summary-box glass" style={{padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                      <span>Cake Size ({formData.cakeSize})</span>
                      <span>${sizePrices[formData.cakeSize] || 25}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem'}}>
                      <span>Flavor ({formData.flavor})</span>
                      <span>${flavorSurcharges[formData.flavor] || 0}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem'}}>
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Select Payment Method</label>
                    <select name="paymentMethod" value={formData.paymentMethod} className="form-select" onChange={handleChange}>
                      <option value="Airtel Money">Airtel Money</option>
                      <option value="TNM Mpamba">TNM Mpamba</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash on Pickup">Cash on Pickup</option>
                    </select>
                  </div>

                  <div className="text-center" style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem'}}>
                    <button type="button" onClick={handleBack} className="btn btn-outline">Back</button>
                    <button type="submit" className="btn btn-primary">Confirm Order</button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreOrderSystem;
