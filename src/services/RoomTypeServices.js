import axios from "axios";

const BASE_URL = "http://localhost:8080/api/roomType";

class RoomTypeServices {
  // Fetch all room types
  getRoomTypes() {
    return axios.get(`${BASE_URL}/all`);
  }

  // Fetch a room type by ID
  getById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  // Create a new room type
  addRoomType(roomType) {
    return axios.post(`${BASE_URL}/post`, roomType);
  }

  // Update an existing room type by ID
  updateById(id, roomType) {
    return axios.put(`${BASE_URL}/update/${id}`, roomType);
  }

  // Delete a room type by ID
  deleteById(id) {
    return axios.delete(`${BASE_URL}/delete/${id}`);
  }
}

export default new RoomTypeServices();