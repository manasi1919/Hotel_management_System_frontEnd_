import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentServices from "../../services/PaymentServices";

const ViewPayment = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    PaymentServices.getPaymentById(id)
      .then((res) => setPayment(res.data))
      .catch((error) => console.error("Error fetching payment:", error));
  }, [id]);

  return (
    <div className="container">
      <h2>Payment Details</h2>
      <p><strong>Payment ID:</strong> {payment.paymentId}</p>
      <p><strong>Reservation ID:</strong> {payment.reservationId}</p>
      <p><strong>Amount:</strong> {payment.amount}</p>
      <p><strong>Payment Date:</strong> {payment.paymentDate}</p>
      <p><strong>Payment Status:</strong> {payment.paymentStatus}</p>

      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default ViewPayment;
