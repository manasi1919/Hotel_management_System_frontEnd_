
import React from 'react';
import './HotelCard.css'; 
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate(); 
  const totalImages = 10;

 
  const imageUrl=`/hotel-images/image${(hotel.hotelId %totalImages)+1}.png`; 


  

  const handleHotelClick = () => {
    navigate(`/room-selection/${hotel.location}`);
  };

  return (
    <div className="hotel-card" onClick={handleHotelClick}>
      {/* Dynamically set the hotel image */}
      <img src={imageUrl} alt={hotel.name} className="hotel-image" />

      <h3>{hotel.name}</h3>
      <p>{hotel.location}</p>
      <p>{hotel.description}</p>
      <div className="hotel-amenities">
        {hotel.amenities?.map((amenity) => (
          <span key={amenity.amenityId} className="amenity">
            {amenity.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HotelCard;
