import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReviewsByRating from "./ReviewsByRating";
import ReviewService from "../../services/ReviewService";
import './review.css';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    // Fetch reviews when component mounts
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        console.log("Fetching reviews...");

        try {
            const response = await ReviewService.getReviews();
            console.log("API Response:", response);

            // Check if response contains an array inside an object
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                setReviews(response.data.data);
                console.log("Reviews set in state:", response.data.data);
            } else {
                setReviews([]);
                console.warn("Unexpected API response format:", response);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]);
        }
    };

    const deleteReview = async (reviewId) => {
        if (!reviewId) {
            console.error(" Error: reviewId is undefined!", reviewId);
            alert("Invalid review ID");
            return;
        }
    
        if (!window.confirm("Are you sure you want to delete this review?")) {
            return;
        }
    
        try {
            console.log(` Deleting review with ID: ${reviewId}`);
            const response = await ReviewService.deleteReview(reviewId);
            
            console.log("Delete API Response:", response.data);
            alert("Review deleted successfully!");
    
            //  Remove deleted review from state
            setReviews(reviews.filter((review) => review.reviewId !== reviewId));
        } catch (error) {
            console.error(" Delete failed:", error);
            alert("Failed to delete review");
        }
    };
    
    return (
        <div className="review-container">
            <h2>Review List</h2>
            <button onClick={() => navigate("/add-review")}>Add Review</button>
            <button onClick={() => navigate("/reviews-by-rating")}>Search Reviews By Rating</button>
            <button onClick={() => navigate("/reviews-by-reservation")}>Search Reviews By Reservation</button>
            <br />
            <br />
            <Link to="/">Back to Home</Link>
            <br />
            <br />
            <h3>Reviews</h3>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Review Date</th>
                        <th>Reservation ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.length > 0 ? (
                        reviews.map((review) => {
                            
                            return (
                                <tr key={review.reviewId}>
                                    <td>{review.reviewId}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.reviewDate}</td>
                                    <td>{review.reservationId ? `Reservation ${review.reservationId}` : "N/A"}</td>
                                    <td>
                                        <button onClick={() => deleteReview(review.reviewId)}>Delete</button>
                                        <button onClick={() => navigate(`/edit-review/${review.reviewId}`)}>Edit</button>
                                        <button onClick={() => navigate(`/view-review/${review.reviewId}`)}>View</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6}>No reviews found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}    

export default ReviewList;
