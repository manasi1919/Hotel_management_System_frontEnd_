import React, { useEffect, useState } from 'react';
import './RoomCard.css';
import RoomTypeServices from '../../services/RoomTypeServices';

const RoomCard = ({ room, onSelectRoom }) => {
  const [roomType, setRoomType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRoomClick = () => {
    onSelectRoom(room);
  };

  const imageUrl = `/Room-images/roomType${room.roomTypeId}.jpg`;

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await RoomTypeServices.getById(room.roomTypeId);
        setRoomType(response.data);
      } catch (err) {
        setError('Failed to fetch room type');
      } finally {
        setLoading(false);
      }
    };

    if (room.roomTypeId) {
      fetchRoomType();
    }
  }, [room.roomTypeId]);

  if (loading) {
    return <div>Loading room details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="room-card" onClick={handleRoomClick}>
      <img
        src={imageUrl}
        alt={roomType ? roomType.typeName : 'Room Image'}
        className="room-image"
      />
      <div className="room-card-details">
        <h3>{room.name}</h3>
        <p><strong>Type:</strong> {roomType ? roomType.typeName : 'Unknown'}</p>
        <p><strong>Room Number:</strong> {room.roomNumber}</p>
        <p><strong>Price:</strong> ${roomType ? roomType.pricePerNight : 'N/A'}</p>
        <p><strong>Amenities:</strong> {room.amenities ? room.amenities.join(", ") : "No Amenities"}</p>
      </div>
    </div>
  );
};

export default RoomCard;
