import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomTypeServices from "../../services/RoomTypeServices";
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import './RoomTypeList.css';  

const RoomTypeList = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [filteredRoomTypes, setFilteredRoomTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const total=4;

  useEffect(() => {
    RoomTypeServices.getRoomTypes()
      .then((response) => {
        const updatedRoomTypes = response.data.map((roomType) => ({
          ...roomType,
          imageUrl: `/Room-images/roomType${(roomType.roomTypeId  % total)+1}.jpg`,
        }));
        setRoomTypes(updatedRoomTypes);
        setFilteredRoomTypes(updatedRoomTypes);
      })
      .catch((error) => console.error("Error fetching room types:", error));
  }, []);

  useEffect(() => {
    const filtered = roomTypes.filter((roomType) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        roomType.roomTypeId.toString().includes(searchLower) ||
        roomType.typeName.toLowerCase().includes(searchLower) ||
        roomType.description.toLowerCase().includes(searchLower)
      );
    });
    setFilteredRoomTypes(filtered);
  }, [searchQuery, roomTypes]);

  if (!roomTypes.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Room Types</h1>
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
          {filteredRoomTypes.map((roomType) => (
            <div key={roomType.roomTypeId} className="card">
              <img
                src={roomType.imageUrl}
                alt={roomType.typeName}
                className="image"
                onError={(e) => (e.target.src = "/default-room.jpg")}
              />
              <h3 className="card-title">{roomType.typeName}</h3>
              <p>
                <strong>ID:</strong> {roomType.roomTypeId}
              </p>
              <p>
                <strong>Description:</strong> {roomType.description}
              </p>
              <p>
                <strong>Price per Night:</strong> {roomType.pricePerNight}
              </p>
              <p>
                <strong>Max Occupancy:</strong> {roomType.maxOccupancy}
              </p>
              <div className="button-container">
                <button
                  onClick={() =>
                    navigate(`/view-roomtype/${roomType.roomTypeId}`)
                  }
                  className="button button-blue"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-roomtype/${roomType.roomTypeId}`)
                  }
                  className="button button-green"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() =>
                    RoomTypeServices.deleteById(roomType.roomTypeId).then(() =>
                      navigate("/roomType")
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
          onClick={() => navigate("/add-roomtype")}
          className="wide-button button-blue"
        >
          <FaPlus /> Add New Room
        </button>
      </div>
    </div>
  );
};

export default RoomTypeList;
