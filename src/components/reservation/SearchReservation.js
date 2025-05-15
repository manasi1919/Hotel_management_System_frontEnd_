import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReservationServices from "../../services/ReservationServices";
import "./reservation.css"; // ✅ Separate CSS for this component

const SearchReservation = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!startDate || !endDate) {
      setError("⚠ Both start date and end date are required.");
      return;
    }

    try {
      const response = await ReservationServices.getReservationsByDateRange(startDate, endDate);
      if (response.data.length === 0) {
        setError("🔍 No reservations found for the selected date range.");
      } else {
        setReservations(response.data);
      }
    } catch (error) {
      setError("❌ Failed to fetch reservations. Please try again.");
      console.error("Error fetching reservations:", error);
    }
  };

  return (
    <div className="search-reservation-container">
      <h2>🔍 Search Reservations by Date Range</h2>
      
      {/* 🔹 Search Form */}
      <form className="search-form" onSubmit={handleSearch}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <button type="submit" className="search-btn">Search</button>
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
      </form>

      {/* 🔹 Display Error Message if Exists */}
      {error && <p className="error-message">{error}</p>}

      {/* 🔹 Display Reservation Results */}
      {reservations.length > 0 ? (
        <div className="result-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Guest Name</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
                <th>Room ID</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.guestName}</td>
                  <td>{reservation.checkInDate}</td>
                  <td>{reservation.checkOutDate}</td>
                  <td>{reservation.roomId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data-message">No reservations to display.</p>
      )}
    </div>
  );
};

export default SearchReservation;
