import axios from "axios";

const BASE_URL = "http://localhost:8080/api/reservation"; 

class ReservationService {
    getReservations() {
        return axios.get(`${BASE_URL}/all`); // GET request is fine
    }

    deleteReservation(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    addReservation(reservation) {
        return axios.post(`${BASE_URL}/post`, reservation);  
    }

    getReservationById(id){
        return axios.get(`${BASE_URL}/${id}`);
    }

    updateReservation(id, reservation) {
    return axios.put(`http://localhost:8080/api/reservation/update/${id}`, reservation);
}
 
getReservationsByDateRange(startDate, endDate) {
    return axios.get(`${BASE_URL}/date-range`, {
        params: {
            startDate: startDate, 
            endDate: endDate
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
}
}

export default new ReservationService();
