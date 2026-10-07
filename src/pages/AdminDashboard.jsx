import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('adminToken') ? true : false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError('Failed to connect to server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="glass" style={{padding: '3rem', borderRadius: '8px', width: '100%', maxWidth: '400px'}}>
          <h2 className="text-center" style={{marginBottom: '2rem', color: 'var(--secondary-color)'}}>Admin Login</h2>
          {loginError && <p style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{loginError}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Log In</button>
          </form>
          <div className="text-center" style={{marginTop: '1.5rem'}}>
            <Link to="/" className="text-sm text-gray">Return to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header glass">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Chloe's Admin Dashboard</h2>
          <div>
            <Link to="/" className="btn btn-outline" style={{marginRight: '1rem'}}>Website</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </header>

      <main className="container admin-main">
        <h3 className="section-title" style={{color: 'var(--secondary-color)'}}>Order Records</h3>
        
        {loading ? (
          <p>Loading records...</p>
        ) : (
          <div className="table-responsive glass">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Details</th>
                  <th>Specifications</th>
                  <th>Billing</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">No orders found.</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        <strong>{order.name}</strong><br/>
                        <span className="text-sm text-gray">{order.email}</span>
                      </td>
                      <td>
                        {order.cakeSize}<br/>
                        <span className="text-sm text-gray">{order.flavor}</span>
                      </td>
                      <td className="specs-cell" title={order.specifications}>{order.specifications}</td>
                      <td>
                        <strong>{order.totalPrice}</strong><br/>
                        <span className="text-sm text-gray">{order.paymentMethod}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        {order.status === 'Pending' ? (
                          <button onClick={() => updateStatus(order.id, 'Completed')} className="btn btn-sm btn-primary">Mark Complete</button>
                        ) : (
                          <button onClick={() => updateStatus(order.id, 'Pending')} className="btn btn-sm btn-outline">Revert</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
