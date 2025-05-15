// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Importing necessary icons from React Icons
// import HotelServices from "../../services/HotelServices ";
// import './Hotel.css';

// // Default total number of images (10 images)
// const totalImages = 10;

// // Function to generate the dynamic image URL based on hotelId
// const getHotelImage = (hotelId) => {
//   return `/hotel-images/image${(hotelId % totalImages) + 1}.png`; // Dynamically generate image URL
// };

// const HotelList = () => {
//   const [hotels, setHotels] = useState([]); // Stores all hotels
//   const [filteredHotels, setFilteredHotels] = useState([]); // Stores filtered hotels
//   const [searchId, setSearchId] = useState(""); // State for Search by ID
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadHotels();
//   }, []);

//   const loadHotels = () => {
//     HotelServices.getHotels()
//       .then((response) => {
//         setHotels(response.data);
//         setFilteredHotels(response.data);
//       })
//       .catch((error) => console.error("Error fetching hotels:", error));
//   };

//   const deleteHotel = (id) => {
//     HotelServices.deleteHotel(id).then(() => loadHotels());
//   };

//   // Filter Hotels on Frontend
//   const handleSearch = () => {
//     if (searchId) {
//       const result = hotels.filter((hotel) => hotel.hotelId.toString() === searchId);
//       if (result.length > 0) {
//         setFilteredHotels(result); // Show filtered hotels
//       } else {
//         alert("Hotel not found!");
//         setFilteredHotels([]); // Clear list if not found
//       }
//     } else {
//       setFilteredHotels(hotels); // Reset to show all hotels if search is empty
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Hotel List</h1>

//       {/* Search Input for Hotel ID */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by Hotel ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//         />
//         <i className="fa fa-search btn" onClick={handleSearch}></i> {/* Search Icon */}
//       </div>

//       {/* Add Hotel Button */}
//       <button className="add-hotel-btn" onClick={() => navigate("/add-hotel")}>
//         Add Hotel
//       </button>

//       {/* Hotel Cards */}
//       <div className="hotel-cards-container">
//         {filteredHotels.length > 0 ? (
//           filteredHotels.map((hotel) => (
//             <div key={hotel.hotelId} className="hotel-card">
//               <img
//                 src={getHotelImage(hotel.hotelId)} // Dynamically set hotel image
//                 alt={hotel.name}
//                 className="hotel-image"
//               />
//               <div className="hotel-info">
//                 <h3>{hotel.name}</h3>
//                 <p>{hotel.location}</p>
//                 <p>{hotel.description}</p>
//                 <p className="amenities">
//                   {hotel.amenities && hotel.amenities.length > 0
//                     ? hotel.amenities.map((amenity) => amenity.name).join(", ")
//                     : "No Amenities"}
//                 </p>
//                 <div className="hotel-actions">
//                   <FaEye
//                     className="view-icon"
//                     onClick={() => navigate(`/view-hotel/${hotel.hotelId}`)}
//                   /> {/* View Icon */}
//                   <FaEdit
//                     className="edit-icon"
//                     onClick={() => navigate(`/edit-hotel/${hotel.hotelId}`)}
//                   /> {/* Edit Icon */}
//                   <FaTrash
//                     className="delete-icon"
//                     onClick={() => deleteHotel(hotel.hotelId)}
//                   /> {/* Delete Icon */}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p style={{ width: "100%", textAlign: "center", fontSize: "18px", color: "#888" }}>
//             No hotels found.
//           </p>
//         )}
//       </div>

//       {/* Add Hotel Button */}
//       <button onClick={() => navigate("/add-hotel")} className="btn">
//         Add Hotel
//       </button>
//       <button onClick={() => navigate("/")} className="btn">
//         Back
//       </button>
//     </div>
//   );
// };

// export default HotelList;






// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HotelServices from "../../services/HotelServices ";
// import "./HotelList.css"; // Assuming you will create this CSS file

// const getHotelImage = (hotelId) => {
//   const imageMap = {
//     1: "/hotel-images/image1.png",
//     2: "/hotel-images/image2.png",
//     3: "/hotel-images/image3.png",
//     4: "/hotel-images/image4.png",
//     5: "/hotel-images/image5.png",
//     6: "/hotel-images/image6.png",
//     7: "/hotel-images/image7.png",
//     8: "/hotel-images/image8.png",
//     9: "/hotel-images/image9.png",
//     10: "/hotel-images/image10.png",
//   };
//   return imageMap[hotelId] || "/hotel-images/default.png"; // Default image
// };

// const HotelCard = ({ hotel, onSelectHotel }) => {
//   const navigate = useNavigate();
//   const [hotels, setHotels] = useState([]);

//   // Define the loadHotels function to fetch the hotels
//   const loadHotels = () => {
//     HotelServices.getHotels()
//       .then((response) => setHotels(response.data))
//       .catch((error) => console.error("Error fetching hotels:", error));
//   };

//   useEffect(() => {
//     loadHotels(); // Fetch hotels on component mount
//   }, []);

//   const handleHotelClick = () => {
//     onSelectHotel(hotel.location); // Pass the selected hotel location to handle navigation
//   };

//   const deleteHotel = (id) => {
//     HotelServices.deleteHotel(id).then(() => loadHotels()); // Refresh hotel list after deleting
//   };

//   return (
//     <div className="hotel-card">
//       <div className="hotel-card-image">
//         <img src={hotel.photoUrl || getHotelImage(hotel.hotelId)} alt={hotel.name} />
//       </div>
//       <div className="hotel-card-content">
//         <h3>{hotel.name}</h3>
//         <p className="hotel-location">{hotel.location}</p>
//         <p>{hotel.description}</p>
//         <p className="hotel-amenities">
//           {hotel.amenities && hotel.amenities.length > 0
//             ? hotel.amenities.join(", ")
//             : "No Amenities"}
//         </p>
//       </div>
//       <div className="hotel-card-actions">
//         <button onClick={() => navigate(`/view-hotel/${hotel.hotelId}`)}>View</button>
//         <button onClick={() => navigate(`/edit-hotel/${hotel.hotelId}`)}>Edit</button>
//         <button onClick={() => deleteHotel(hotel.hotelId)}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default HotelCard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa"; // Importing necessary icons from React Icons
import HotelServices from "../../services/HotelServices ";
import './Hotel.css';

// Default total number of images (10 images)
const totalImages = 10;

// Function to generate the dynamic image URL based on hotelId
const getHotelImage = (hotelId) => {
  return `/hotel-images/image${(hotelId % totalImages) + 1}.png`; // Dynamically generate image URL
};

const HotelList = () => {
  const [hotels, setHotels] = useState([]); // Stores all hotels
  const [filteredHotels, setFilteredHotels] = useState([]); // Stores filtered hotels
  const [searchQuery, setSearchQuery] = useState(""); // State for Search by Hotel ID, Name, Location, Description
  const navigate = useNavigate();

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = () => {
    HotelServices.getHotels()
      .then((response) => {
        setHotels(response.data);
        setFilteredHotels(response.data);
      })
      .catch((error) => console.error("Error fetching hotels:", error));
  };

  const deleteHotel = (id) => {
    HotelServices.deleteHotel(id).then(() => loadHotels());
  };

  // Filter Hotels on Frontend
  const handleSearch = () => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const result = hotels.filter(
        (hotel) =>
          hotel.hotelId.toString().includes(searchLower) ||
          hotel.name.toLowerCase().includes(searchLower) ||
          hotel.location.toLowerCase().includes(searchLower) ||
          hotel.description.toLowerCase().includes(searchLower)
      );
      if (result.length > 0) {
        setFilteredHotels(result); // Show filtered hotels
      } else {
        alert("No hotels found matching the search criteria!");
        setFilteredHotels([]); // Clear list if not found
      }
    } else {
      setFilteredHotels(hotels); // Reset to show all hotels if search is empty
    }
  };

  return (
    <div className="container">
      <h1>Hotel List</h1>

      {/* Search Input for Hotel ID, Name, Location, and Description */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID, Name, Location, Description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <i className="search-icon">
          <FaSearch onClick={handleSearch} style={{ cursor: "pointer" }} />
        </i> {/* Search Icon */}
      </div>

      {/* Add Hotel Button */}
      <div className="button-container">
        <button className="add-hotel-btn" onClick={() => navigate("/add-hotel")}>
          <FaPlus /> Add Hotel
        </button>
      </div>

      {/* Hotel Cards */}
      <div className="hotel-cards-container">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div key={hotel.hotelId} className="hotel-card">
              <img
                src={getHotelImage(hotel.hotelId)} // Dynamically set hotel image
                alt={hotel.name}
                className="hotel-image"
              />
              <div className="hotel-info">
                <h3 className="hotel-title">{hotel.name}</h3>
                <p>{hotel.location}</p>
                <p>{hotel.description}</p>
                <div className="amenities">
                  {hotel.amenities && hotel.amenities.length > 0
                    ? hotel.amenities.map((amenity) => amenity.name).join(", ")
                    : "No Amenities"}
                </div>
                <div className="hotel-actions">
                  <FaEye
                    className="view-icon"
                    onClick={() => navigate(`/view-hotel/${hotel.hotelId}`)}
                  />
                  <FaEdit
                    className="edit-icon"
                    onClick={() => navigate(`/edit-hotel/${hotel.hotelId}`)}
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => deleteHotel(hotel.hotelId)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels found matching the search criteria!</p>
        )}
      </div>

      {/* Add Hotel Button */}
      <div className="button-container">
        <button onClick={() => navigate("/")} className="btn">
          Back
        </button>
      </div>
    </div>
  );
};

export default HotelList;
