import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomTypeServices from "../../services/RoomTypeServices";

const ViewRoomType = () => {
  const [roomType, setRoomType] = useState(null); 
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    RoomTypeServices.getById(id)
      .then((res) => setRoomType(res.data))
      .catch((error) => {
        console.error("Error fetching room type data", error);
        navigate("/roomType"); 
      });
  }, [id, navigate]);

  if (!roomType) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>View Room Type Details</h1>
      <p><strong>Room Type Name:</strong> {roomType.typeName}</p>
      <p><strong>Description:</strong> {roomType.description}</p>
      <p><strong>Price Per Night:</strong> {roomType.pricePerNight}</p>
      <p><strong>Max Occupancy:</strong> {roomType.maxOccupancy}</p>
      <button onClick={() => navigate("/roomType")}>Back</button>
    </div>
  );
};

export default ViewRoomType;