import { useNavigate } from "react-router-dom";
import { FaHotel, FaList, FaUsers, FaMoneyBill, FaBed, FaConciergeBell,FaStar } from "react-icons/fa";
import "./Admin.css"; // Importing CSS file
 
const Admin = () => {
  const navigate = useNavigate();
 
  const adminOptions = [
    { title: "Hotels", icon: <FaHotel />, path: "/hotel" },
    { title: "Rooms", icon: <FaBed />, path: "/rooms" },
    { title: "Room Types", icon: <FaList />, path: "/roomType" },
    { title: "Amenities", icon: <FaConciergeBell />, path: "/amenity" },
    { title: "Payments", icon: <FaMoneyBill />, path: "/payment-list" },
    { title: "Reservations", icon: <FaUsers />, path: "/reservations" },
    { title: "Reviews", icon: <FaStar />, path: "/reviews" },
  ];
 
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">Manage all aspects of your hotel system</p>
 
      <div className="card-container">
        {adminOptions.map((option, index) => (
          <div key={index} className="card" onClick={() => navigate(option.path)}>
            <div className="icon">{option.icon}</div>
            <h3 className="card-title">{option.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Admin;