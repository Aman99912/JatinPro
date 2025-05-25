import React, { useState } from 'react';
import './product.css';

function ProductCard({ product }) {
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookNow = () => {
    setShowForm(true);
    setFormData({ date: '', time: '', address: '' }); // Reset form
    setShowPayment(false); // Reset payment visibility
  };

  const handleContinue = () => {
    const { date, time, address } = formData;
    if (date && time && address.trim() !== '') {
      setShowPayment(true);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowPayment(false);
    setFormData({ date: '', time: '', address: '' }); // Optional: clear on cancel
  };

  return (
    <>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        width: '200px',
        padding: '10px',
        textAlign: 'center'
      }}>
        <img src={product.image} alt={product.title} style={{ width: '150px', height: '170px', objectFit: 'cover' }} />
        <h3>{product.title}</h3>
        <p style={{ color: 'green', fontWeight: 'bold' }}>{product.price}</p>
        <button style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer'
        }} onClick={handleBookNow}>
          Book Now
        </button>
      </div>

      {showForm && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h2>{product.title}</h2>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="inputStyle" required />
            <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="inputStyle" required />
            <input type="text" name="address" placeholder="Enter address" value={formData.address} onChange={handleInputChange} className="inputStyle" required />

            <button className="continueBtn" onClick={handleContinue}>Continue</button>
            <button className="cancelBtn" onClick={handleCancel}>Cancel</button>

            {showPayment && (
              <div className="paymentBox">
                <p><strong>Service:</strong> {product.title}</p>
                <p><strong>Date:</strong> {formData.date}</p>
                <p><strong>Time:</strong> {formData.time}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>Amount:</strong> {product.price}</p>
                <button className="payBtn">Pay Now</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
