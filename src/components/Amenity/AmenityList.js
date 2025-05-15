import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AmenityServices from "../../services/AmenityServices";
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";

const AmenityList = () => {
  const [amenities, setAmenities] = useState([]);
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const total=30;

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = () => {
    AmenityServices.getAllAmenities()
      .then((response) => {
        setAmenities(response.data);
        setFilteredAmenities(response.data);
      })
      .catch((error) => console.error("Error fetching amenities:", error));
  };

  useEffect(() => {
    const filtered = amenities.filter((amenity) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        amenity.amenityId.toString().includes(searchLower) ||
        amenity.name.toLowerCase().includes(searchLower) ||
        amenity.description.toLowerCase().includes(searchLower)
      );
    });
    setFilteredAmenities(filtered);
  }, [searchQuery, amenities]);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Amenities</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Search by ID, Name, or Description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchBarStyle}
        />
      </div>
      <div style={scrollableContainerStyle}>
        <div style={cardContainerStyle}>
          {filteredAmenities.map((amenity) => {
            const imageUrl = `/Amenity/amenity${(amenity.amenityId % total)+1}.jpg`;  // Move image URL creation here

            return (
              <div key={amenity.amenityId} style={cardStyle}>
                <img
                  src={imageUrl}  // Using the dynamically created image URL
                  alt={amenity.name}
                  style={imageStyle}
                  //onError={(e) => (e.target.src = "https://placehold.co/300")}  // Fallback image if error
                />
                <h3 style={cardTitleStyle}>{amenity.name}</h3>
                <p>
                  <strong>ID:</strong> {amenity.amenityId}
                </p>
                <p>
                  <strong>Description:</strong> {amenity.description}
                </p>
                <p>
                  <strong>Rooms:</strong>{" "}
                  {amenity.rooms?.map((room) => room.roomId).join(", ") || "No Rooms"}
                </p>
                <div style={buttonContainerStyle}>
                  <button
                    onClick={() => navigate(`/view-amenity/${amenity.amenityId}`)}
                    style={buttonStyle("#007bff")}
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => navigate(`/edit-amenity/${amenity.amenityId}`)}
                    style={buttonStyle("#28a745")}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() =>
                      AmenityServices.deleteAmenityById(amenity.amenityId).then(() => loadAmenities())
                    }
                    style={buttonStyle("#dc3545")}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={buttonGroupStyle}>
        <button
          onClick={() => navigate("/")}
          style={wideButtonStyle("#6c757d")}
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={() => navigate("/add-amenity")}
          style={wideButtonStyle("#007bff")}
        >
          <FaPlus /> Add Amenity
        </button>
      </div>
    </div>
  );
};

// 🌟 Updated Styles for Better Design
const containerStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#f8f9fa",
};
const titleStyle = {
  fontSize: "30px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#333",
};
const searchBarStyle = {
  width: "350px",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "25px",
  border: "1px solid #aaa",
  outline: "none",
  textAlign: "center",
  transition: "0.3s",
};
const scrollableContainerStyle = {
  maxHeight: "600px",
  overflowY: "auto",
  borderRadius: "10px",
  padding: "12px",
};
const cardContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};
const cardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  width: "320px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "0.3s",
};
const imageStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "10px",
  objectFit: "cover",
  marginBottom: "10px",
};
const cardTitleStyle = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "10px",
  color: "#333",
};
const buttonContainerStyle = {
  marginTop: "12px",
  display: "flex",
  justifyContent: "center",
  gap: "12px",
};
const buttonStyle = (bgColor) => ({
  padding: "12px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "8px",
  border: "none",
  backgroundColor: bgColor,
  color: "white",
  width: "45px",
  height: "45px",
  transition: "0.3s",
});
const buttonGroupStyle = {
  marginTop: "25px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};
const wideButtonStyle = (bgColor) => ({
  padding: "16px 35px",
  fontSize: "18px",
  cursor: "pointer",
  borderRadius: "8px",
  border: "none",
  backgroundColor: bgColor,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontWeight: "600",
  transition: "0.3s",
});

// ✨ Button Hover Effects
const hoverEffect = `
  button:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }
  input:focus {
    border: 1px solid #007bff;
  }
`;

// Inject CSS in Head (for global styles)
const styleTag = document.createElement("style");
styleTag.innerHTML = hoverEffect;
document.head.appendChild(styleTag);

export default AmenityList;
