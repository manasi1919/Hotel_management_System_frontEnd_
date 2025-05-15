import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentServices from '../../services/PaymentServices';
import { FaEye, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import './Payment.css';
import TotalRevenue from './TotalRevenue';
 
const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    loadPayments();
  }, []);
 
  const loadPayments = () => {
    PaymentServices.getPayments()
      .then((response) => {
        setPayments(response.data);
        setFilteredPayments(response.data);
      })
      .catch((error) => console.error('Error fetching payments:', error));
  };
 
  useEffect(() => {
    const filtered = payments.filter((payment) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        payment.paymentId.toString().includes(searchLower) ||
        payment.paymentStatus.toLowerCase().includes(searchLower)
      );
    });
    setFilteredPayments(filtered);
  }, [searchQuery, payments]);
 
  const deletePayment = (id) => {
    PaymentServices.deletePayment(id)
      .then(() => loadPayments())
      .catch((error) => console.error('Error deleting payment:', error));
  };
 
  return (
    <div className="container">
    {/*  Wrapping title & search bar together */}
    <div className="header">
      <h1 className="title">Payments</h1>
      <TotalRevenue />
 
 
      {/* Search Input */}
      <div className="search-container"
      style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="🔍 Search by ID or Status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
    </div>
      <div className="scrollable-container">
        <div className="card-container">
          {filteredPayments.map((payment) => (
            <div key={payment.paymentId} className="card">
              <h3 className="card-title">Payment ID: {payment.paymentId}</h3>
              <p><strong>Reservation ID:</strong> {payment.reservationId}</p>
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>Date:</strong> {payment.paymentDate}</p>
              <p><strong>Status:</strong> {payment.paymentStatus}</p>
              <div className="button-container">
                <button onClick={() => navigate(`/view-payment/${payment.paymentId}`)} className="button view">
                  <FaEye />
                </button>
               
                <button onClick={() => deletePayment(payment.paymentId)} className="button delete">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="button-group">
        <button onClick={() => navigate(-1)} className="wide-button back">
          <FaArrowLeft /> Back
        </button>
        <button onClick={() => navigate("/add-payment")} className="wide-button add">
          <FaPlus /> Add Payment
        </button>
      </div>
    </div>
  );
};
 
export default PaymentList;