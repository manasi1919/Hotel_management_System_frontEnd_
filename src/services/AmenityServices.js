import axios from "axios";
 
const BASE_URL = "http://localhost:8080/api/amenity";  // Change the base URL as needed
 
class AmenityServices {
  // Fetch all amenities
  getAllAmenities() {
    return axios.get(`${BASE_URL}/all`);
  }
 
  // Fetch an amenity by ID
  getAmenityById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }
 
  // Add a new amenity
  addAmenity(amenityData) {
    return axios.post(`${BASE_URL}`, amenityData);
  }
 
  // Update an existing amenity by ID
  updateAmenityById(id, amenityData) {
    return axios.put(`${BASE_URL}/${id}`, amenityData);
  }
 
  // Delete an amenity by ID
  deleteAmenityById(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
 
  // Fetch amenities by room (optional if you need this endpoint)
  getAmenitiesByRoom(roomId) {
    return axios.get(`${BASE_URL}/room/${roomId}`);
  }
 
  // Fetch amenities by hotel (optional if you need this endpoint)
  getAmenitiesByHotel(hotelId) {
    return axios.get(`${BASE_URL}/hotel/${hotelId}`);
  }
}
 
export default new AmenityServices();