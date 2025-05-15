import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReservationServices from "../../services/ReservationServices";
import "./reservation.css"; // ✅ Separate CSS file for better styling

const ReservationForm = ({ isEdit }) => {
  const [reservation, setReservation] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkInDate: "",
    checkOutDate: "",
    roomId: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      ReservationServices.getReservationById(id)
        .then((res) => setReservation(res.data))
        .catch((error) => {
          console.error("Error fetching reservation:", error);
          setError("Failed to fetch reservation details.");
        });
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      if (isEdit) {
        await ReservationServices.updateReservation(id, reservation);
      } else {
        await ReservationServices.addReservation(reservation);
      }
      navigate(-1); // Navigate back to previous page
    } catch (error) {
      setError(isEdit ? "Update failed! Please try again." : "Adding reservation failed! Please check your details.");
    }
  };

  return (
    <div className="reservation-form-container">
      <h2>{isEdit ? "✏ Edit Reservation" : "➕ Add Reservation"}</h2>

      {error && <p className="error-message">{error}</p>}

      <form className="reservation-form" onSubmit={handleSubmit}>
        <label>Guest Name:</label>
        <input type="text" name="guestName" value={reservation.guestName} onChange={handleChange} required />

        <label>Guest Email:</label>
        <input type="email" name="guestEmail" value={reservation.guestEmail} onChange={handleChange} required />

        <label>Guest Phone:</label>
        <input type="text" name="guestPhone" value={reservation.guestPhone} onChange={handleChange} required />

        <label>Check-in Date:</label>
        <input type="date" name="checkInDate" value={reservation.checkInDate} onChange={handleChange} required />

        <label>Check-out Date:</label>
        <input type="date" name="checkOutDate" value={reservation.checkOutDate} onChange={handleChange} required />

        <label>Room ID:</label>
        <input type="number" name="roomId" value={reservation.roomId} onChange={handleChange} required />

        <div className="form-buttons">
          <button type="submit" className="submit-btn">{isEdit ? "Update" : "Submit"}</button>
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
