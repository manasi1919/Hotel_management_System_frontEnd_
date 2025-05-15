import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import ReservationServices from "../../services/ReservationServices";
import "./reservation.css"; // ✅ Separate CSS file for better styling

const ViewReservation = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ReservationServices.getReservationById(id)
            .then((res) => {
                setReservation(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching reservation:", err);
                setError("Failed to load reservation details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Loading reservation details...</p>
            </div>
        );
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="view-reservation-container">
            <h2>📄 Reservation Details</h2>
            <div className="reservation-card">
                <p><strong>Reservation ID:</strong> {reservation.reservationId}</p>
                <p><strong>Guest Name:</strong> {reservation.guestName}</p>
                <p><strong>Guest Email:</strong> {reservation.guestEmail}</p>
                <p><strong>Guest Phone:</strong> {reservation.guestPhone || "N/A"}</p>
                <p><strong>Check-in Date:</strong> {reservation.checkInDate}</p>
                <p><strong>Check-out Date:</strong> {reservation.checkOutDate}</p>
                <p><strong>Room ID:</strong> {reservation.roomId}</p>
            </div>
            <button className="back-btn" onClick={() => navigate(-1)}>🔙 Back</button>
        </div>
    );
};

export default ViewReservation;
