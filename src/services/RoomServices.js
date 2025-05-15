import axios from "axios";

const BASE_URL = "http://localhost:8080/api";  // Change the base URL as needed

class RoomServices {
  // Fetch all rooms
  getAllRooms() {
    return axios.get(BASE_URL);
  }

  // Fetch a room by ID
  getRoomById(id) {
    return axios.get(`${BASE_URL}/room/${id}`);
  }

  addRoom(roomData) {
    return axios.post(`${BASE_URL}/rooms/post`, roomData);
  }
  updateRoomById(id, roomData) {
    return axios.put(`${BASE_URL}/room/update/${id}`, roomData);
  }
  deleteRoomById(id) {
    return axios.delete(`${BASE_URL}/rooms/${id}`);
  }
  getAvailableRoomsByType(roomTypeId) {
    return axios.get(`${BASE_URL}/rooms/available/${roomTypeId}`);
  }
  getRoomsByLocation(location) {
    return axios.get(`${BASE_URL}/rooms/location/${location}`);
  }
  getRoomsByAmenity(amenityId) {
    return axios.get(`${BASE_URL}/rooms/amenities/${amenityId}`);
  }
}

export default new RoomServices();
