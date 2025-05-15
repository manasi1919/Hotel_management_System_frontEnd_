import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import ReservationServices from "../../services/ReservationServices"; 
import "./review.css";

const ViewReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);
    const [reservations, setReservations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch Review by ID
        ReviewService.getReviewById(id)
            .then((res) => {
                console.log("✅ Review Data:", res.data);
                if (res.data && res.data.data) {
                    setReview(res.data.data);
                } else {
                    setError("Review not found.");
                }
            })
            .catch((err) => {
                console.error("❌ Error fetching review:", err);
                setError("Failed to load review details.");
            });

        // Fetch All Reservations (Like RecentReviews)
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
        
        setLoading(false);
    }, [id]);

    if (loading) {
        return <p className="view-review-loading">Loading review details...</p>;
    }

    if (error) {
        return <p className="view-review-error">{error}</p>;
    }

    return (
        <div className="view-review-container">
            <h2>View Review</h2>
            <div className="view-review-details">
                <p><strong>Review ID:</strong> {review?.reviewId ?? "N/A"}</p>
                <p><strong>Rating:</strong> ⭐ {review?.rating ?? "N/A"}</p>
                <p className="view-review-comment"><strong>Comment:</strong> {review?.comment ?? "N/A"}</p>
                <p><strong>Review Date:</strong> {review?.reviewDate ?? "N/A"}</p>
                <p><strong>Guest Name:</strong> {reservations[review?.reservationId] || "N/A"}</p>
            </div>
            <button className="view-review-back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
    );
};

export default ViewReview;
