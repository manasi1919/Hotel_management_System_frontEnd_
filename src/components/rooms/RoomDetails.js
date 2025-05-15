
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomServices from '../../services/RoomServices'; // Assuming this service is available for room data
import RoomTypeServices from '../../services/RoomTypeServices'; // Assuming this service is available for room type data

import "./Room.css";
const RoomDetails = () => {
  const { roomId } = useParams(); // Fetch roomId from URL parameters
  const [room, setRoom] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  // Fetch room details and room type details
  useEffect(() => {
    // Fetch room details
    RoomServices.getRoomById(roomId)
      .then((response) => {
        setRoom(response.data); // Set room data
        return response.data.roomTypeId; // Fetch roomTypeId for room type data
      })
      .then((roomTypeId) => {
        // Fetch room type details based on roomTypeId
        RoomTypeServices.getById(roomTypeId)
          .then((response) => {
            setRoomType(response.data); // Set room type data
            setIsLoading(false); // Set loading to false once both room and room type data are loaded
          })
          .catch((error) => {
            setError('Failed to load room type.');
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setError('Failed to load room details.');
        setIsLoading(false);
      });
  }, [roomId]); // Dependency on roomId to refetch data if the URL changes

  // If loading, show a loading message
  if (isLoading) {
    return <div>Loading room details...</div>;
  }

  // If there is an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="room-details-container">
      <h1>Room Details</h1>
      <div className="room-details">
        <h2>Room Number: {room.roomNumber}</h2>
        <p><strong>Room Type:</strong> {roomType ? roomType.typeName : 'Unknown'}</p>
        <p><strong>Room ID:</strong> {room.roomId}</p>
        <p><strong>Capacity:</strong> {roomType ? roomType.maxOccupancy : 'N/A'}</p> {/* Show capacity from room type */}
        <p><strong>Price:</strong> ${roomType ? roomType.pricePerNight : 'N/A'}</p> {/* Show price from room type */}
        <p><strong>Description:</strong> {roomType ? roomType.description : 'No description available'}</p> {/* Show description from room type */}
        <p><strong>Status:</strong> {room.isAvailable ? 'Available' : 'Occupied'}</p>
      </div>
      <button onClick={() => navigate('/rooms')} className="back-btn">
        Back to Room List
      </button>
    </div>
  );
};

export default RoomDetails;
