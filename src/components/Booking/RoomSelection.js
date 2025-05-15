import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomServices from '../../services/RoomServices';
import RoomTypeServices from '../../services/RoomTypeServices';
import RoomCard from './RoomCard';
import './RoomSelection.css';
import PopupModal from './PopupModel';

const RoomSelection = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const hotelLocation = decodeURIComponent(location.pathname.split('/').pop());

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await RoomTypeServices.getRoomTypes();
        if (Array.isArray(response.data) && response.data.length > 0) {
          setRoomTypes(response.data);
        } else {
          setRoomTypes([]);
        }
      } catch (error) {
        // console.error('Error fetching room types:', error);
        setError('Failed to load room types. Please try again later.');
      }
    };

    const fetchRoomsForLocation = async () => {
      try {
        const response = await RoomServices.getRoomsByLocation(hotelLocation);
        if (response.data && response.data.length > 0) {
          setRooms(response.data);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error('Error fetching rooms by location:', error);
        setRooms([]);
      }
    };

    fetchRoomTypes();
    fetchRoomsForLocation();
  }, [hotelLocation]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setShowPopup(true);
  };

  const confirmReservation = () => {
    navigate('/add-reservation', { state: { roomId: selectedRoom.roomId } });
    setShowPopup(false);
  };

  const cancelReservation = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        let response;
        let availableRooms = [];
        if (selectedRoomType) {
          response = await RoomServices.getAvailableRoomsByType(selectedRoomType);
          const locationRooms = await RoomServices.getRoomsByLocation(hotelLocation);
          if (response.data && locationRooms.data) {
            availableRooms = response.data.filter(room =>
              locationRooms.data.some(locRoom =>
                locRoom.roomId === room.roomId && locRoom.roomTypeId === room.roomTypeId
              )
            );
          }
          setRooms(availableRooms);
        } else {
          response = await RoomServices.getRoomsByLocation(hotelLocation);
        }
        setRooms(response.data || []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelLocation, selectedRoomType]);

  const getRoomTypeName = (roomTypeId) => {
    const roomType = roomTypes.find((type) => type.roomTypeId === roomTypeId);
    return roomType ? roomType.typeName : 'Unknown Type';
  };

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  return (
    <div className="room-selection-container">
      <h2>Available Rooms in {hotelLocation}</h2>
      <div className="room-type-filter">
        <label htmlFor="roomType">Filter by Room Type:</label>
        <select
          id="roomType"
          value={selectedRoomType || ''}
          onChange={(e) => setSelectedRoomType(e.target.value)}
        >
          <option value="">All Room Types</option>
          {roomTypes.length === 0 ? (
            <option value="">No room types available</option>
          ) : (
            roomTypes.map((roomType) => (
              <option key={roomType.roomTypeId} value={roomType.roomTypeId}>
                {roomType.typeName}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="rooms-list">
        {rooms.length === 0 ? (
          <p>No rooms available in this location or for the selected room type.</p>
        ) : (
          rooms.map((room) => (
            <RoomCard
              key={room.roomId}
              room={room}
              roomTypeName={getRoomTypeName(room.roomTypeId)}
              onBookClick={handleRoomClick}
            />
          ))
        )}
      </div>
      {showPopup && selectedRoom && (
        <PopupModal
          room={selectedRoom}
          roomTypeName={getRoomTypeName(selectedRoom.roomTypeId)}
          roomType={roomTypes.find((type) => type.roomTypeId === selectedRoom.roomTypeId)}
          onConfirm={confirmReservation}
          onCancel={cancelReservation}
        />
      )}
    </div>
  );
};

export default RoomSelection;
