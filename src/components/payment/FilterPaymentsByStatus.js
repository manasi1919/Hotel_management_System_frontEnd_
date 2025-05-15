import React, { useState } from "react";
import PaymentServices from "../../services/PaymentServices";


const FilterPaymentsByStatus = ({ setFilteredPayments }) => {
  const [status, setStatus] = useState("");

  const handleFilter = () => {
    if (status) {
      PaymentServices.getPaymentsByStatus(status)
        .then((res) => setFilteredPayments(res.data.data || []))
        .catch((error) => {
          console.error("Error fetching payments by status:", error);
          setFilteredPayments([]);
        });
    }
  };

  return (
    <div className="filter-container">
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="PENDING">Pending</option>
        <option value="COMPLETED">Completed</option>
        <option value="FAILED">Failed</option>
      </select>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterPaymentsByStatus;
