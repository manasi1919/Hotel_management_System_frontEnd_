
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelServices from "../../services/HotelServices ";
import HotelCard from "./HotelCard";
import "./Filter.css";

const Filter = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [allHotels, setAllHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await HotelServices.getHotels();
        
        const uniqueHotels = [
          ...new Map(response.data.map((hotel) => [hotel.hotelId, hotel])).values(),
        ];
        
        setAllHotels(uniqueHotels);  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels", error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    let hotelsList = allHotels;

    if (location) {
      hotelsList = hotelsList.filter((hotel) => hotel.location === location);
    }

    const uniqueHotels = [
      ...new Map(hotelsList.map((hotel) => [hotel.hotelId, hotel])).values(),
    ];

    setFilteredHotels(uniqueHotels); // Set the filtered unique hotels
  }, [location, allHotels]);

  
  const handleHotelSelect = (hotel) => {
    navigate(`/room-selection/${hotel.location}`, { state: { hotelId: hotel.hotelId } });
  };

  return (
    <div className="filter-page">
      {/* Filter by Location */}
      <div className="filter-container" style={{ marginBottom: '20px' }}>
        <h2>Select Location</h2>
        <select onChange={(e) => setLocation(e.target.value)} value={location} style={{ padding: '8px' }}>
          <option value="">Select Location</option>
          {[...new Set(allHotels.map((hotel) => hotel.location))].map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Display Hotels */}
      <div className="hotel-cards-container">
        <h3>Select Hotel</h3>
        {loading ? (
          <p>Loading hotels...</p>
        ) : filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.hotelId} 
              hotel={hotel}
              onSelectHotel={handleHotelSelect}
            />
          ))
        ) : (
          <p>No hotels found for the selected location.</p>
        )}
      </div>
    </div>
  );
};

export default Filter;
