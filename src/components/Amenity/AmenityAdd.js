import React from "react";
import { useNavigate } from "react-router-dom";
import AmenityForm from "./AmenityForm";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 40px;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  border-radius: 12px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  color: #343a40;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  text-transform: uppercase;
`;

const BackButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  background: #dc3545;
  color: white;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
  display: inline-block;
  box-shadow: 0px 4px 10px rgba(220, 53, 69, 0.3);

  &:hover {
    background: #c82333;
    transform: scale(1.05);
  }
`;

const AmenityAdd = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Title>🏨 Add New Amenity</Title>

      <AmenityForm isEdit={false} />

      {/* Back Button navigates to Amenity List */}
      <BackButton onClick={() => navigate("/amenity")}>
        ⬅ Back to Amenities
      </BackButton>
    </PageContainer>
  );
};

export default AmenityAdd;
