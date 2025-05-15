import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelServices from "../../services/HotelServices ";
import './Hotel.css';

const ViewHotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    HotelServices.getHotelById(id).then((res) => setHotel(res.data.data));
  }, [id]);

  return (
    <div className="hotel-view-card">
      <h2>Hotel Details</h2>
      <div className="hotel-info">
        <p><strong>Name:</strong> {hotel.name}</p>
        <p><strong>Location:</strong> {hotel.location}</p>
        <p><strong>Description:</strong> {hotel.description}</p>
      </div>
      <button className="back-btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default ViewHotel;
