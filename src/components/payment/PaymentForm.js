import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentServices from "../../services/PaymentServices";
import ReservationServices from "../../services/ReservationServices";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [payment, setPayment] = useState({
    amount: "",
    paymentDate: "",
    paymentStatus: "Pending",
    reservationId: "",
  });


  useEffect(() => {
    const reservationId = location.state?.reservationId;
    const amount = location.state?.amount; // Fetch amount from state

    if (reservationId) {
      setPayment((prev) => ({
        ...prev,
        reservationId,
        amount: amount || prev.amount, // Set amount if available
      }));

      // Fetch check-in date
      ReservationServices.getReservationById(reservationId)
        .then((res) => {
          let checkInDate = new Date(res.data.checkInDate).toISOString().split("T")[0];

          setPayment((prev) => ({
            ...prev,
            paymentDate: checkInDate,
          }));
        })
        .catch((error) => {
          console.error("Error fetching reservation:", error);
        });
    }
  }, [location.state]);


  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PaymentServices.addPayment(payment)
      .then(() => {
        alert("Payment Successful! 🎉");
        navigate(`/view-reservation/${payment.reservationId}`);
      })
      .catch((error) => console.error("Error processing payment:", error));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4">Make a Payment</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              placeholder="Enter amount"
              value={payment.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Payment Date (Check-in Date)</label>
            <input
              type="date"
              name="paymentDate"
              className="form-control"
              value={payment.paymentDate}
              onChange={handleChange}
            // Read-only since it's auto-filled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Payment Status</label>
            <input
              type="text"
              className="form-control"
              value="Completed"
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reservation ID</label>
            <input
              type="text"
              name="reservationId"
              className="form-control"
              placeholder="Enter Reservation ID"
              value={payment.reservationId}
              onChange={handleChange} // Editable now
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit Payment
          </button>
          <button className="btn btn-primary w-100" onClick={() => navigate(-1)}>Back</button>

        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
