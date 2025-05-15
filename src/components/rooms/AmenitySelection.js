import React, { useState } from "react";
import RoomAmenity from './path/to/RoomAmenity';

const AmenitySelection = ({ roomId, amenityId }) => {
    const [message, setMessage] = useState("");

    const roomAmenity = {
        roomId: roomId,
        amenityId: amenityId,
    };

    const addAmenity = async () => {
        try {
            const data = await RoomAmenity.addRoomAmenity(roomAmenity);
            setMessage("Room amenity added successfully.");
            console.log("Room amenity added successfully:", data);
        } catch (error) {
            setMessage("Failed to add room amenity.");
            console.error("Failed to add room amenity:", error);
        }
    };

    return (
        <div>
            <button onClick={addAmenity}>Add Amenity</button>
            <p>{message}</p>
        </div>
    );
};

export default AmenitySelection;
