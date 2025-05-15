

import { useNavigate } from "react-router-dom";
import "./PopupModel.css";

const PopupModal = ({ room, roomTypeName, roomType, onCancel }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {

    const price = roomType?.pricePerNight || 'N/A'; 
    navigate("/add-reservation", {
      state: { roomId: room.roomId, amount: price },
    });
  };


  if (!roomType) {
    return <div>Error: Room type data is not available</div>;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <h3>Confirm Room Reservation</h3>
        <p><strong>Room Type:</strong> {roomTypeName}</p>
        <p><strong>Room Number:</strong> {room.roomNumber}</p>
        <p><strong>Room ID:</strong> {room.roomId}</p>
        <p><strong>Price:</strong> ${roomType?.pricePerNight || 'N/A'}</p>
        <div className="popup-actions">
          <button className="confirm-button" onClick={handleConfirm}>
            Yes, Reserve
          </button>
          <button className="cancel-button" onClick={onCancel}>
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
