// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ReservationServices from "../../services/ReservationServices";
// import "./reservation.css";

// const AddReservation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [reservation, setReservation] = useState({
//     guestName: "",
//     guestEmail: "",
//     guestPhone: "",
//     checkInDate: "",
//     checkOutDate: "",
//     roomId: location.state?.roomId || "", // Automatically set roomId from PopupModal
//     reservationId: null, // Store reservation ID
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setReservation({ ...reservation, [name]: value });
//   };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validate phone number (10-digit validation)
  //   if (!reservation.guestPhone || reservation.guestPhone.length !== 10) {
  //     alert("Please enter a valid 10-digit phone number.");
  //     return;
  //   }

  //   console.log("Submitting reservation:", reservation);

  //   ReservationServices.addReservation(reservation)
  //     .then((response) => {
  //       console.log("Reservation added successfully:", response.data);
        
  //       // Update reservationId after adding reservation
  //       setReservation((prev) => ({
  //         ...prev,
  //         reservationId: response.data.reservationId, // Ensure correct key
  //       }));

  //       alert("Reservation added successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error adding reservation:", error);
  //     });
  // };

  // // Handle Pay button click - ensure reservationId exists before navigating
  // const handlePayment = () => {
  //   const reservationId = Math.floor(Math.random() * 1000); // Mock reservation ID (replace with actual API response)
  //   navigate("/add-payment", { state: { reservationId } });
  // };

  import React, { useState } from "react";
  import { useNavigate, useLocation } from "react-router-dom";
  import ReservationServices from "../../services/ReservationServices";
  import "./reservation.css";
   
  const AddReservation = () => {
    const navigate = useNavigate();
    const location = useLocation();
   
    const [reservation, setReservation] = useState({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      checkInDate: "",
      checkOutDate: "",
      roomId: location.state?.roomId || "",
    });
   
    const [reservationId, setReservationId] = useState(null);
   
    const handleChange = (e) => {
      const { name, value } = e.target;
      setReservation({ ...reservation, [name]: value });
    };
   
    const handleSubmit = (e) => {
      e.preventDefault();
   
      if (!reservation.guestPhone || reservation.guestPhone.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
   
      console.log("Submitting reservation:", reservation);
   
      ReservationServices.addReservation(reservation)
        .then((response) => {
          console.log("Raw Response:", response.data);
   
          // Extract Reservation ID from plain text response
          const reservationIdMatch = response.data.match(/Reservation ID:\s*(\d+)/);
          if (reservationIdMatch) {
            const extractedId = reservationIdMatch[1];
            setReservationId(extractedId);
            alert(`Reservation added successfully! Your ID: ${extractedId}`);
            
          } else {
            alert("Reservation added, but ID not found in response.");
          }
        })
        .catch((error) => {
          console.error("Error adding reservation:", error);
          alert("Failed to add reservation. Please try again.");
        });
    };
   
    const handlePayment = () => {
      if (!reservationId) {
        alert("Please add a reservation before proceeding to payment.");
        return;
      }
   
      navigate("/add-payment", {
        state: {
          reservationId: reservationId,
          amount: location.state?.amount || "",
          paymentDate: reservation.checkInDate,
        },
      });
    };
   
    return (
      <div className="add-reservation-container">
        <h2>Add Reservation</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="guestName" placeholder="Guest Name" value={reservation.guestName} onChange={handleChange} required />
          <input type="email" name="guestEmail" placeholder="Guest Email" value={reservation.guestEmail} onChange={handleChange} required />
          <input type="text" name="guestPhone" placeholder="Guest Phone" value={reservation.guestPhone} onChange={handleChange} required />
          <input type="date" name="checkInDate" value={reservation.checkInDate} onChange={handleChange} required />
          <input type="date" name="checkOutDate" value={reservation.checkOutDate} onChange={handleChange} required />
          <input type="number" name="roomId" placeholder="Room ID" value={reservation.roomId} readOnly />
   
          <button type="submit" className="submit-btn">Add Reservation</button>
          <button type="button" className="pay-btn" onClick={handlePayment}>Pay</button>
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </form>
      </div>
    );
  };
   
  export default AddReservation;