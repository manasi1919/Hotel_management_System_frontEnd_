import axios from "axios";

const BASE_URL = "http://localhost:8080/api/review";

class ReviewService {
    getReviews() {
        return axios.get(`${BASE_URL}/all`);
    }

    deleteReview(id) {
        return axios.delete(`${BASE_URL}/delete/${id}`);
    }

    addReview(review) {
        return axios.post(`${BASE_URL}/post`, review);
    }

    getReviewById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    updateReview(id, review) {
        return axios.put(`${BASE_URL}/update/${id}`, review);
    }

    getReviewsByRating(rating) {
        return axios.get(`${BASE_URL}/rating/${rating}`);
    }
    getRecentReviews() {
        return axios.get(`${BASE_URL}/recent`);
    }
}

export default new ReviewService();
