import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import './review.css';

const ReviewForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id; // Determines if it's an edit or add form

    const [review, setReview] = useState({
        rating: "",
        comment: "",
        reviewDate: new Date().toISOString().split("T")[0], // Default to today's date
        reservationId: "",
    });

    const [error, setError] = useState("");

    // Fetch review data if editing
    useEffect(() => {
        if (isEdit) {
            ReviewService.getReviewById(id)
                .then((response) => {
                    if (response.data) {
                        setReview(response.data);
                    }
                })
                .catch(() => setError("Failed to load review details"));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validate Rating
        if (review.rating < 1 || review.rating > 5) {
            setError("Rating must be between 1 and 5.");
            return;
        }

        // Ensure Reservation ID is provided
        if (!review.reservationId) {
            setError("Please enter a valid Reservation ID.");
            return;
        }

        console.log(isEdit ? "Updating review:" : "Adding review:", review);

        if (isEdit) {
           ReviewService.updateReview(id, review)
                .then(() => {
                    alert("Review updated successfully!");
                    navigate("/reviews");
                })
                .catch(() => setError("Update failed!"));
        } else {
            ReviewService.addReview(review)
                .then(() => {
                    alert("Review added successfully!");
                    navigate("/reviews");
                })
                .catch(() => setError("Adding review failed!"));
        }
    };

    return (
        <div className="review-form-container">
            <h2>{isEdit ? "Edit Review" : "Add Review"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="number" name="rating" placeholder="Rating (1-5)" value={review.rating} onChange={handleChange} required />
                <input type="text" name="comment" placeholder="Comment" value={review.comment} onChange={handleChange} required />
                <input type="date" name="reviewDate" value={review.reviewDate} onChange={handleChange} required />
                <input type="number" name="reservationId" placeholder="Reservation ID" value={review.reservationId} onChange={handleChange} required />

                <button type="submit">{isEdit ? "Update Review" : "Add Review"}</button>
                <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
            </form>
        </div>
    );
};

export default ReviewForm;
