import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelServices from "../../services/HotelServices ";
import './Hotel.css';

const HotelForm = ({ isEdit }) => {
  const [hotel, setHotel] = useState({ name: "", location: "", description: "", price: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      HotelServices.getHotelById(id).then((res) => setHotel(res.data));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      HotelServices.updateHotel(id, hotel).then(() => navigate("/hotels"));
    } else {
      HotelServices.addHotel(hotel).then(() => navigate("/hotels"));
    }
  };

  return (
    <div className="hotel-form-card">
      <h2>{isEdit ? "Edit Hotel" : "Add Hotel"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input 
            type="text" 
            name="name" 
            placeholder="Hotel Name" 
            value={hotel.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            name="location" 
            placeholder="Location" 
            value={hotel.location} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            name="description" 
            placeholder="Description" 
            value={hotel.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-container">
          <button type="submit">{isEdit ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;
