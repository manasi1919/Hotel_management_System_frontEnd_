import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomServices from "../../services/RoomServices";
import AmenityServices from "../../services/AmenityServices";
import "./Room.css";

const ViewRoom = () => {
  const [room, setRoom] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    RoomServices.getRoomById(id)
      .then((res) => {
        setRoom(res.data);
        AmenityServices.getAmenitiesByRoom(id)
          .then((amenityRes) => {
            setAmenities(amenityRes.data);
          })
          .catch((error) => {
            console.error("Error fetching amenities:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Room Details</h2>
      <div>
        <strong>Room Number:</strong> {room.roomNumber}
      </div>
      <div>
        <strong>Availability:</strong> {room.isAvailable ? "Available" : "Not Available"}
      </div>
      <div>
        <strong>Room Type:</strong> {room.roomTypeId ? `Room Type ID: ${room.roomTypeId}` : "N/A"}
      </div>
      <div>
        <strong>Amenities:</strong>
        <ul>
          {amenities && amenities.length > 0 ? (
            amenities.map((amenity) => (
              <li key={amenity.id}>{amenity.name}</li>
            ))
          ) : (
            <li>No amenities available</li>
          )}
        </ul>
      </div>

      <button onClick={() => navigate("/rooms")}>Back to Room List</button>
    </div>
  );
};

export default ViewRoom;
