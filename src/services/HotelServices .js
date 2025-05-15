import axios from "axios";

const BASE_URL = "http://localhost:8080/api/hotels"; // Ensure this matches your backend URL

class HotelServices {
  getHotels() {
    return axios.get(`${BASE_URL}/all`);
  }

  addHotel(hotel) {
    return axios.post(`${BASE_URL}/post`, hotel);
  }

  getHotelById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  getHotelsByAmenity(amenityId) {
    return axios.get(`${BASE_URL}/amenity/${amenityId}`);
  }

  updateHotel(id, hotel) {
    return axios.put(`${BASE_URL}/update/${id}`, hotel);
  }

  deleteHotel(id) {
    return axios.delete(`${BASE_URL}/delete/${id}`);
  }
}

export default new HotelServices();
