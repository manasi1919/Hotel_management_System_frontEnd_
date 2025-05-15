import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomServices from "../../services/RoomServices"; 
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import './Room.css';  
import RoomTypeServices from "../../services/RoomTypeServices";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    RoomServices.getAllRooms()
      .then((response) => {
        setRooms(response.data);
        setFilteredRooms(response.data);
      })
      .catch((error) => {
        setError("Error fetching rooms");
      });
  }, []);

  useEffect(() => {
    RoomTypeServices.getRoomTypes()
      .then((response) => setRoomTypes(response.data))
      .catch((error) => setError("Failed to fetch room types"))
      .finally(() => setLoading(false));
  }, []);

  const getAmenities = (amenities) => {
    if (amenities && amenities.length > 0) {
      return amenities.map((amenity) => (
        <li key={amenity.amenityId}>
          <strong>{amenity.name}:</strong> {amenity.description}
        </li>
      ));
    } else {
      return <li>No amenities available</li>;
    }
  };
  
  useEffect(() => {
    const filtered = rooms.filter((room) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        room.roomId.toString().includes(searchLower) ||
        (room.name && room.name.toLowerCase().includes(searchLower)) ||
        (room.description && room.description.toLowerCase().includes(searchLower))
      );
    });
    setFilteredRooms(filtered);
  }, [searchQuery, rooms]);

  const getRoomTypeDescription = (roomTypeId) => {
    const roomType = roomTypes.find((type) => type.roomTypeId === roomTypeId);
    return roomType ? roomType.description : "No description available";
  };

  const getRoomTypePrice = (roomTypeId) => {
    const roomType = roomTypes.find((type) => type.roomTypeId === roomTypeId);
    return roomType ? roomType.pricePerNight : "N/A";
  };

  const getRoomTypeName = (roomTypeId) => {
    const roomType = roomTypes.find((type) => type.roomTypeId === roomTypeId);
    return roomType ? roomType.typeName : "Unknown";
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Rooms</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by ID, Name, or Description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="scrollable-container">
        <div className="card-container">
          {filteredRooms.map((room) => (
            <div key={room.roomId} className="card">
              {/* Dynamically set image URL */}
              <img
                src={`/Room-images/roomType${room.roomTypeId}.jpg`} 
                alt={room.name}
                className="image"
                onError={(e) => (e.target.src = "/default-room.jpg")} 
              />
              <h3 className="card-title">{room.name}</h3>
              <p>
                <strong>ID:</strong> {room.roomId}
              </p>
              <p><strong>Type:</strong> {getRoomTypeName(room.roomTypeId)}</p>
              <p><strong>Room Number:</strong> {room.roomNumber}</p>
              <p><strong>Price:</strong> ${getRoomTypePrice(room.roomTypeId)}</p>
              <div className="button-container">
                <button
                  onClick={() => navigate(`/view-room/${room.roomId}`)}
                  className="button button-blue"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => navigate(`/edit-room/${room.roomId}`)}
                  className="button button-green"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() =>
                    RoomServices.deleteRoomById(room.roomId).then(() =>
                      setRooms(rooms.filter((r) => r.roomId !== room.roomId)) // Remove the room after deletion
                    )
                  }
                  className="button button-red"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="button-group">
        <button
          onClick={() => navigate("/")}
          className="wide-button button-grey"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={() => navigate("/add-room")}
          className="wide-button button-blue"
        >
          <FaPlus /> Add Room
        </button>
      </div>
    </div>
  );
};

export default RoomList;
