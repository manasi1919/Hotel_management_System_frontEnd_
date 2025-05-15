

import React, { useEffect, useState } from 'react';
import './Roomcard.css'; 
import RoomTypeServices from '../../services/RoomTypeServices';

const RoomCard = ({ room, onBookClick }) => {
  const [roomType, setRoomType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const totalImages = 5; 
  const roomImage = `/Room-images/roomType${(room.roomTypeId % totalImages) + 1}.jpg`; 

  useEffect(() => {
    
    const fetchRoomType = async () => {
      try {
        const response = await RoomTypeServices.getById(room.roomTypeId);
        console.log(response.data); 
        setRoomType(response.data); 
      } catch (err) {
        console.error(err); 
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
    return <div>Loading room type...</div>;
  }

  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="room-card">
      <img src={roomImage} alt={roomType?.typeName} className="room-image" />
      <div className="room-details">
        <h4>{roomType?.typeName}</h4>
        <p><strong>Room ID:</strong> {room.roomId}</p>
        <p><strong>Description:</strong> {roomType?.description || 'No description available'}</p>
        <p><strong>Max Occupancy:</strong> {roomType?.maxOccupancy} people</p>
        <p><strong>Amenities:</strong>
          {room.amenities?.length ? (
            room.amenities.map((amenity, index) => (
              <span key={amenity.amenityId}>
                {amenity.name}{index < room.amenities.length - 1 ? ', ' : ''}
              </span>
            ))
          ) : (
            <span>No amenities available</span>
          )}
        </p>
        <p><strong>Price:</strong> ${roomType?.pricePerNight || 'N/A'}</p>
        {room.isAvailable ? (
          <button onClick={() => onBookClick(room)}>Book Now</button>
        ) : (
          <p>Room is not available</p>
        )}
      </div>
    </div>
  );
};

export default RoomCard;

