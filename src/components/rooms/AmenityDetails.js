import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AmenityServices from '../../services/AmenityServices';
import './Room.css';

const AmenityDetails = () => {
  const { roomId } = useParams();
  const [amenities, setAmenities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    AmenityServices.getAmenitiesByRoom(roomId)
      .then((response) => {
        const amenitiesData = response.data;
        setAmenities(amenitiesData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Failed to load room amenities.');
        setIsLoading(false);
      });
  }, [roomId]);

  if (isLoading) {
    return <div>Loading room amenities...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="room-details-container">
      <h1>Amenities for Room </h1>
      <h2>Amenities</h2>
      {amenities.length > 0 ? (
        amenities.map((amenity) => (
          <div key={amenity.amenityId} className="amenity-detail">
            <h3>{amenity.name}</h3>
            <p><strong>Description:</strong> {amenity.description || 'No description available'}</p>
          </div>
        ))
      ) : (
        <p>No amenities available for this room.</p>
      )}

      <button onClick={() => navigate('/rooms')} className="back-btn">
        Back to Room List
      </button>
    </div>
  );
};

export default AmenityDetails;
