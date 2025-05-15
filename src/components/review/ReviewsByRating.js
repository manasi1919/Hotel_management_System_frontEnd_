import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import ReservationServices from "../../services/ReservationServices"; // Import Reservation Service
import "./review.css";  

const ReviewsByRating = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState("");
    const [reviews, setReviews] = useState([]);
    const [reservations, setReservations] = useState({}); // Stores { reservationId: guestName }
    const [error, setError] = useState("");

    // Fetch all reservations on component mount
    useEffect(() => {
        ReservationServices.getReservations()
            .then((response) => {
                console.log("🔍 Reservations:", response.data);
                const reservationMap = {};
                response.data.forEach(res => {
                    reservationMap[res.reservationId] = res.guestName; 
                });
                setReservations(reservationMap);
            })
            .catch(() => setError("Failed to fetch reservations."));
    }, []);

    // Fetch reviews by rating
    const fetchReviews = () => {
        setError("");
        if (!rating || rating < 1 || rating > 5) {
            setError("Please enter a rating between 1 and 5.");
            return;
        }

        ReviewService.getReviewsByRating(rating)
            .then((response) => {
                setReviews(response.data);
            })
            .catch(() => setError("No reviews available for this rating."));
    };

    return (
        <div className="review-container">
            <h1 className="review-title">Reviews By Rating</h1>

            {/* Rating Input Section */}
            <div className="rating-input">
                <label className="rating-label">Enter Rating (1-5):</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="rating-field"
                />
                <button className="search-btn" onClick={fetchReviews}>🔍 Search</button>
            </div>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Reviews List */}
            {reviews.length > 0 ? (
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li key={review.reviewId} className="review-item">
                            <div className="review-header">
                                <h3 className="review-rating">⭐ {review.rating} Stars</h3>
                                <p className="review-date">📅 {review.reviewDate}</p>
                            </div>
                            <p className="review-comment">💬 "{review.comment}"</p>
                            <p className="review-author">
                                <strong>By:</strong> {reservations[review.reservationId] || "Unknown Guest"}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-reviews">No reviews found for this rating.</p>
            )}

            {/* Back Button */}
            <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
    );
};

export default ReviewsByRating;
