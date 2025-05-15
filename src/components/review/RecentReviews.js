import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Import for navigation
import ReviewService from '../../services/ReviewService';
import ReservationServices from '../../services/ReservationServices';
import './review.css';

const RecentReviews = () => {
    const navigate = useNavigate(); // ✅ Hook for navigation
    const [reviews, setReviews] = useState([]);
    const [reservations, setReservations] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch Recent Reviews
        ReviewService.getRecentReviews()
            .then((response) => {
                console.log("🔍 Recent reviews:", response.data);
                setReviews(response.data);
            })
            .catch(() => setError("Failed to fetch recent reviews."));

        // Fetch Reservations to Get Guest Names
        ReservationServices.getReservations()
            .then((response) => {
                console.log("🔍 Reservations:", response.data);
                // Convert to { reservationId: guestName } format
                const reservationMap = {};
                response.data.forEach(res => {
                    reservationMap[res.reservationId] = res.guestName;
                });
                setReservations(reservationMap);
            })
            .catch(() => setError("Failed to fetch reservations."));
    }, []);

    return (
        <div className="view-review-container">
            <h2>Recent Reviews</h2>

            {error && <p className="error-message">{error}</p>}

            {reviews.length === 0 ? (
                <p className="no-reviews">No recent reviews available.</p>
            ) : (
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li key={review.reviewId} className="review-item">
                            <div className="review-header">
                                <h3 className="review-date">{review.reviewDate}</h3>
                                <span className="review-rating">⭐ {review.rating} / 5</span>
                            </div>
                            <p className="review-comment">"{review.comment}"</p> 
                            <p className="review-author">
                                <strong>By:</strong> {reservations[review.reservationId] || "Unknown Guest"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {/* 🔹 Back Button to Navigate to Previous Page */}
            <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
    );
};

export default RecentReviews;
