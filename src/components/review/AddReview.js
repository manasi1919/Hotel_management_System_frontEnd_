import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import './review.css';

const AddReview = () => {
    const navigate = useNavigate();
    const [review, setReview] = useState({
        rating: "",
        comment: "",
        reviewDate: new Date().toISOString().split("T")[0], // Default to today
        reservationId: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure rating is between 1 and 5
        if (review.rating < 1 || review.rating > 5) {
            alert("Rating must be between 1 and 5.");
            return;
        }

        // Ensure reservationId is provided
        if (!review.reservationId) {
            alert("Please enter a valid Reservation ID.");
            return;
        }

        console.log("Submitting review:", review);

        ReviewService.addReview(review)
            .then(() => {
                alert("Review Added Successfully!");
                navigate("/reviews");
            })
            .catch((error) => console.error("Error adding review:", error));
    };

    return (
        <div  className="review-form-container">
            <h2>Add Review</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="rating" placeholder="Rating (1-5)" value={review.rating} onChange={handleChange} required />
                <input type="text" name="comment" placeholder="Comment" value={review.comment} onChange={handleChange} required />
                <input type="date" name="reviewDate" value={review.reviewDate} onChange={handleChange} required />
                <input type="number" name="reservationId" placeholder="Reservation ID" value={review.reservationId} onChange={handleChange} required />

                <button type="submit">Add Review</button>
                <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
            </form>
        </div>
    );
};

export default AddReview;
