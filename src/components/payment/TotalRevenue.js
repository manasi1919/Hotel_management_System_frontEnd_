import React, { useEffect, useState } from "react";
import PaymentServices from "../../services/PaymentServices";

const TotalRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    PaymentServices.getTotalRevenue()
      .then((res) => setTotalRevenue(res.data.totalRevenue))
      .catch((error) => console.error("Error fetching total revenue:", error));
  }, []);

  return (
    <div className="revenue-container">
      <h2>Total Revenue</h2>
      <p><strong>₹{totalRevenue}</strong></p>
    </div>
  );
};

export default TotalRevenue;