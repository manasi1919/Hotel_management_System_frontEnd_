// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import RoomServices from '../../services/RoomServices'; // Assuming this service is available for room data
// // import RoomTypeServices from '../../services/RoomTypeServices'; // Assuming this service is available for room type data
// // import AmenityServices from "../../services/AmenityServices"; // Service to fetch amenities
// // import "./Room.css";
// // import './RoomForm.css'; 
// // import './RoomEdit.css';  
// // import './AddRoom.css';  
// // const RoomForm = ({ isEdit }) => {
// //   const [room, setRoom] = useState({
// //     roomNumber: "",
// //     isAvailable: true,
// //     roomTypeId: "",
// //     amenities: [], // Ensure amenities is always an array
// //   });

// //   const [roomTypes, setRoomTypes] = useState([]);
// //   const [amenities, setAmenities] = useState([]);
// //   const navigate = useNavigate();
// //   const { id } = useParams();

// //   // Fetch Room Types and Amenities on mount
// //   useEffect(() => {
// //     RoomTypeServices.getRoomTypes()
// //       .then((res) => setRoomTypes(res.data))
// //       .catch((error) => console.error("Error fetching room types:", error));

// //     AmenityServices.getAllAmenities()
// //       .then((res) => setAmenities(res.data))
// //       .catch((error) => console.error("Error fetching amenities:", error));

// //     if (isEdit) {
// //       // Fetch room details for editing
// //       RoomServices.getRoomById(id)
// //         .then((res) => {
// //           // Ensure amenities is always an array when loading room data
// //           setRoom({
// //             ...res.data,
// //             amenities: res.data.amenities || [], // Default to an empty array if amenities is undefined
// //           });
// //         })
// //         .catch((error) => console.error("Error fetching room details:", error));
// //     }
// //   }, [isEdit, id]);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     if (type === "checkbox") {
// //       setRoom({
// //         ...room,
// //         [name]: checked,
// //       });
// //     } else {
// //       setRoom({
// //         ...room,
// //         [name]: value,
// //       });
// //     }
// //   };

// //   const handleAmenityChange = (e) => {
// //     const { value, checked } = e.target;
// //     setRoom({
// //       ...room,
// //       amenities: checked
// //         ? [...room.amenities, value] // Add the selected amenity ID
// //         : room.amenities.filter((amenity) => amenity !== value), // Remove the deselected amenity ID
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const roomData = {
// //       roomNumber: room.roomNumber,
// //       isAvailable: room.isAvailable,
// //       roomTypeId: room.roomTypeId,
// //       amenities: room.amenities.map((amenityId) => ({ amenityId })), // Convert selected amenities to the expected format
// //     };

// //     if (isEdit) {
// //       // Update the room details
// //       RoomServices.updateRoomById(id, roomData)
// //         .then(() => navigate("/rooms"))
// //         .catch((error) => console.error("Error updating room:", error));
// //     } else {
// //       // Add a new room
// //       RoomServices.addRoom(roomData)
// //         .then(() => navigate("/rooms"))
// //         .catch((error) => console.error("Error adding room:", error));
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h2>{isEdit ? "Edit Room" : "Add Room"}</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Room Number:</label>
// //           <input
// //             type="number"
// //             name="roomNumber"
// //             value={room.roomNumber}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Available:</label>
// //           <input
// //             type="checkbox"
// //             name="isAvailable"
// //             checked={room.isAvailable}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div>
// //           <label>Room Type:</label>
// //           <select
// //             name="roomTypeId"
// //             value={room.roomTypeId}
// //             onChange={handleChange}
// //             required
// //           >
// //             <option value="">Select Room Type</option>
// //             {roomTypes.map((roomType) => (
// //               <option key={roomType.roomTypeId} value={roomType.roomTypeId}>
// //                 {roomType.typeName}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div>
// //           <label>Amenities:</label>
// //           {amenities.map((amenity) => (
// //             <div key={amenity.amenityId}>
// //               <input
// //                 type="checkbox"
// //                 value={amenity.amenityId}
// //                 checked={room.amenities.indexOf(amenity.amenityId.toString()) !== -1} // Check if amenity is selected by checking index
// //                 onChange={handleAmenityChange}
// //               />
// //               <label>{amenity.name}</label>
// //             </div>
// //           ))}
// //         </div>
// //         <button type="submit">{isEdit ? "Update Room" : "Add Room"}</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default RoomForm;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomServices from '../../services/RoomServices'; // Assuming this service is available for room data
import RoomTypeServices from '../../services/RoomTypeServices'; // Assuming this service is available for room type data
import AmenityServices from "../../services/AmenityServices"; // Service to fetch amenities
import "./Room.css";
import './RoomForm.css';
import './RoomEdit.css';
import './AddRoom.css';

const RoomForm = ({ isEdit }) => {
  const [room, setRoom] = useState({
    roomNumber: "",
    isAvailable: true,
    roomTypeId: "",
    amenities: [],
  });

  const [roomTypes, setRoomTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch Room Types and Amenities on mount
  useEffect(() => {
    RoomTypeServices.getRoomTypes()
      .then((res) => setRoomTypes(res.data))
      .catch((error) => console.error("Error fetching room types:", error));

    AmenityServices.getAllAmenities()
      .then((res) => setAmenities(res.data))
      .catch((error) => console.error("Error fetching amenities:", error));

    if (isEdit) {
      // Fetch room details for editing
      RoomServices.getRoomById(id)
        .then((res) => {
          // Ensure amenities is always an array when loading room data
          setRoom({
            ...res.data,
            amenities: res.data.amenities || [], // Default to an empty array if amenities is undefined
          });
        })
        .catch((error) => console.error("Error fetching room details:", error));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRoom({
        ...room,
        [name]: checked,
      });
    } else {
      setRoom({
        ...room,
        [name]: value,
      });
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setRoom({
      ...room,
      amenities: checked
        ? [...room.amenities, value] // Add the selected amenity ID
        : room.amenities.filter((amenity) => amenity !== value), // Remove the deselected amenity ID
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomData = {
      roomNumber: room.roomNumber,
      isAvailable: room.isAvailable,
      roomTypeId: room.roomTypeId,
      amenities: room.amenities.map((amenityId) => ({ amenityId })), // Convert selected amenities to the expected format
    };

    if (isEdit) {
      // Update the room details
      RoomServices.updateRoomById(id, roomData)
        .then(() => navigate("/rooms"))
        .catch((error) => console.error("Error updating room:", error));
    } else {
      // Add a new room
      RoomServices.addRoom(roomData)
        .then(() => navigate("/rooms"))
        .catch((error) => console.error("Error adding room:", error));
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? "Edit Room" : "Add Room"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Number:</label>
          <input
            type="number"
            name="roomNumber"
            value={room.roomNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Available:</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={room.isAvailable}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Room Type:</label>
          <select
            name="roomTypeId"
            value={room.roomTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Select Room Type</option>
            {roomTypes.map((roomType) => (
              <option key={roomType.roomTypeId} value={roomType.roomTypeId}>
                {roomType.typeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amenities:</label>
          <div className="amenities-container">
            {amenities.map((amenity) => (
              <div key={amenity.amenityId} className="amenity-card">
                <input
                  type="checkbox"
                  value={amenity.amenityId}
                  checked={room.amenities.indexOf(amenity.amenityId.toString()) !== -1}
                  onChange={handleAmenityChange}
                />
                <label>{amenity.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">{isEdit ? "Update Room" : "Add Room"}</button>
      </form>
    </div>
  );
};

export default RoomForm;

