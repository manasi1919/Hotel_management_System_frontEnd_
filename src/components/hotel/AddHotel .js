import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelServices from "../../services/HotelServices ";

const AddHotel = () => {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState({
        name: "",
        location: "",
        description: "",
        price: "", 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel({ ...hotel, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate price (must be greater than 0)
        if (!hotel.price || hotel.price <= 0) {
            alert("Please enter a valid price.");
            return;
        }

        console.log("Submitting hotel:", hotel);

        HotelServices.addHotel(hotel)
            .then((response) => {
                console.log("Hotel added successfully:", response.data);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error adding hotel:", error);
            });
    };

    return (
        <div className="container">
            <h2>Add Hotel</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Hotel Name"
                    value={hotel.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={hotel.location}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={hotel.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={hotel.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Hotel</button>
                <button type="button" onClick={() => navigate("/")}>Back</button>
            </form>
        </div>
    );
};

export default AddHotel;