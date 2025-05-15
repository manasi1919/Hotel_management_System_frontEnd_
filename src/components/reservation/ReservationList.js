import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReservationServices from "../../services/ReservationServices";
import { FaEye, FaTrash, FaPlus, FaArrowLeft, FaEdit, FaMoneyBillWave } from "react-icons/fa";
import "./ReservationList.css";
 
const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
 
  useEffect(() => {
    loadReservations();
  }, []);
 
  const loadReservations = () => {
    ReservationServices.getReservations()
      .then((response) => {
        if (response.status === 204) {
          console.warn("No reservations found.");
          setReservations([]);
        } else {
          setReservations(response.data);
          setFilteredReservations(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  };
 
  useEffect(() => {
    const filtered = reservations.filter((reservation) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        reservation.reservationId.toString().includes(searchLower) ||
        reservation.guestName.toLowerCase().includes(searchLower) ||
        reservation.guestEmail.toLowerCase().includes(searchLower) ||
        reservation.roomId.toString().includes(searchLower)
      );
    });
    setFilteredReservations(filtered);
  }, [searchQuery, reservations]);
 
  const deleteReservation = (id) => {
    ReservationServices.deleteReservation(id)
      .then(() => loadReservations())
      .catch((error) => console.error("Error deleting reservation:", error));
  };
 
  return (
    <div className="container">
      <h1 className="title">Reservations</h1>
 
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search by ID, Name, Email, or Room ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
 
      <div className="scrollable-container">
        <div className="card-container">
          {filteredReservations.map((reservation) => (
            <div key={reservation.reservationId} className="card">
              <h3 className="card-title">Reservation ID: {reservation.reservationId}</h3>
              <p><strong>Guest:</strong> {reservation.guestName}</p>
              <p><strong>Email:</strong> {reservation.guestEmail}</p>
              <p><strong>Phone:</strong> {reservation.guestPhone}</p>
              <p><strong>Room:</strong> {reservation.roomId}</p>
              <p><strong>Check-in:</strong> {reservation.checkInDate}</p>
              <p><strong>Check-out:</strong> {reservation.checkOutDate}</p>
 
              <div className="button-container">
                <button onClick={() => navigate(`/view-reservation/${reservation.reservationId}`)} className="button view">
                  <FaEye />
                </button>
                <button onClick={() => navigate(`/edit-reservation/${reservation.reservationId}`)} className="button edit">
                  <FaEdit />
                </button>
                <button onClick={() => deleteReservation(reservation.reservationId)} className="button delete">
                  <FaTrash />
                </button>
                <button onClick={() => navigate(`/view-payment/${reservation.reservationId}`)} className="button payment">
                  <FaMoneyBillWave />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Navigation Buttons */}
      <div className="button-group">
        <button onClick={() => navigate("/")} className="wide-button back">
          <FaArrowLeft /> Back
        </button>
        <button onClick={() => navigate("/add-reservation")} className="wide-button add">
          <FaPlus /> Add Reservation
        </button>
      </div>
    </div>
  );
};
 
export default ReservationList;