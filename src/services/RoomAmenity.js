
import axios from "axios";
class RoomAmenity{
    addRoomAminity(roomAmenity){
        return axios.post(`http://localhost:8080/api/roomamenity/post`,roomAmenity);
    }
}
export default new RoomServices();
