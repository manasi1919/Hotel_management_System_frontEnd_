import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomServices from '../../services/RoomServices'; // Assuming you have this service
import './BookingPage.css'; // Add your styling here

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
  });
  const [loading, setLoading] = useState(true);

  // Extract the roomId from location state passed from the Filter page
  const { roomId } = location.state || {};

  useEffect(() => {
    if (roomId) {
      const fetchRoomDetails = async () => {
        try {
          const response = await RoomServices.getRoomById(roomId); // Fetch room details by roomId
          setRoom(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching room details', error);
          setLoading(false);
        }
      };
      fetchRoomDetails();
    } else {
      navigate('/'); // Redirect to home if roomId is not available
    }
  }, [roomId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Reservation submitted!');
    // Example: You can save this data or call an API to create the reservation
  };

  if (loading) {
    return <p>Loading room details...</p>;
  }

  if (!room) {
    return <p>Room not found.</p>;
  }

  return (
    <div className="booking-page">
      <h2>Booking Reservation</h2>
      <div className="room-details">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <p><strong>Price:</strong> {room.price}</p>
        <p><strong>Max Occupancy:</strong> {room.maxOccupancy} people</p>
      </div>

      <h3>Reservation Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Check-In Date</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Check-Out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <button onClick="/view-reservation/:"   type="submit">Submit Reservation</button>
      </form>
    </div>
  );
};

export default BookingPage;
