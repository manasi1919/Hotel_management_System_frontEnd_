import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AmenityServices from "../../services/AmenityServices";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Details = styled.p`
  font-size: 18px;
  color: #555;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: #007bff;
  color: white;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
  &:hover {
    background: #0056b3;
  }
`;

const AmenityView = () => {
  const { id } = useParams();
  const [amenity, setAmenity] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    AmenityServices.getAmenityById(id).then((res) => setAmenity(res.data));
  }, [id]);

  return (
    <Container>
      <Title>Amenity Details</Title>
      <Details>
        <strong>Name:</strong> {amenity.name}
      </Details>
      <Details>
        <strong>Description:</strong> {amenity.description}
      </Details>
      <Button onClick={() => navigate("/")}>Back</Button>
    </Container>
  );
};

export default AmenityView;
