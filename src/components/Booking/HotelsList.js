import React from 'react';
import HotelCard from './HotelCard';

const HotelList = ({ filteredHotels }) => {
  return (
    <div className="hotel-list">
      {filteredHotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;
