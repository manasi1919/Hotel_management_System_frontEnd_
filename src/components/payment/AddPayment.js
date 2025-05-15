import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';



const AddPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <PaymentForm />
     
    </div>
  );
};

export default AddPayment;
