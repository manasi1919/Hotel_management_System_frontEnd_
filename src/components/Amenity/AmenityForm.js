import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomServices from "../../services/RoomServices";
import AmenityServices from "../../services/AmenityServices";
import styled from "styled-components";

// Styled Components
const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title =styled.h2`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: ${(props) => (props.$primary ? "#28a745" : "#007bff")};
  color: white;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${(props) => (props.$primary ? "#218838" : "#0056b3")};
  }
`;

const AmenityForm = ({ isEdit }) => {
  const [amenity, setAmenity] = useState({
    name: "",
    description: "",
    roomId: "",
  });
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    RoomServices.getAllRooms()
      .then((res) => setRooms(res.data))
      .catch((error) => console.error("Error fetching rooms:", error));

    if (isEdit) {
      AmenityServices.getAmenityById(id)
        .then((res) => setAmenity(res.data))
        .catch((error) =>
          console.error("Error fetching amenity details:", error)
        );
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setAmenity({ ...amenity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      AmenityServices.updateAmenityById(id, amenity).then(() => navigate("/"));
    } else {
      AmenityServices.addAmenity(amenity).then(() => navigate("/"));
    }
  };

  return (
    <FormContainer>
      <Title>{isEdit ? "Edit Amenity" : "Add Amenity"}</Title>
      <StyledForm onSubmit={handleSubmit}>
        <label>Amenity Name:</label>
        <Input
          type="text"
          name="name"
          placeholder="Amenity Name"
          value={amenity.name}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <Textarea
          name="description"
          placeholder="Description"
          value={amenity.description}
          onChange={handleChange}
          required
        />

        <label>Room:</label>
        <Select
          name="roomId"
          value={amenity.roomId}
          onChange={handleChange}
          required
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.roomId} value={room.roomId}>
              {room.name}
            </option>
          ))}
        </Select>

        <Button type="submit">{isEdit ? "Update" : "Submit"}</Button>
      </StyledForm>
    </FormContainer>
  );
};

export default AmenityForm;
