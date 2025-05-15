import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomTypeServices from "../../services/RoomTypeServices";

const RoomTypeForm = ({ isEdit }) => {
    const [roomType, setRoomType] = useState({
        typeName: "",
        description: "",
        pricePerNight: "",
        maxOccupancy: ""
    });
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect (()=>{
        console.log(isEdit);
        if(isEdit){
            RoomTypeServices.getById(id)
            .then((res)=>{
                setRoomType(res.data)
            })
        }
    },[isEdit,id]);
    const handleChange=(e)=>{
        setRoomType({...roomType,[e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            RoomTypeServices.updateById(id, roomType).then(()=>navigate("/roomType"));
        } else {
            RoomTypeServices.addRoomType(roomType)
            .then(()=>navigate("/roomType"))
            .catch((error) => console.error("Error adding room:", error));
        }
    };

    return (
        <div className="container">
            <h2>{isEdit ? "Edit Room Type" : "Add Room Type"}</h2>
            <form onSubmit={handleSubmit}>
                Room Type Name: <input type="text" name="typeName" placeholder="Enter Room Type Name" value={roomType.typeName} onChange={handleChange} required /><br/>
                Description: <input type="text" name="description" placeholder="Enter Description" value={roomType.description} onChange={handleChange} required /><br/>
                Price Per Night: <input type="number" name="pricePerNight" placeholder="Enter Price Per Night" value={roomType.pricePerNight} onChange={handleChange} required /><br/>
                Max Occupancy: <input type="number" name="maxOccupancy" placeholder="Enter Max Occupancy" value={roomType.maxOccupancy} onChange={handleChange} required /><br/>

                <button type="submit">{isEdit ? "Update" : "Submit" }</button>
            </form>
        </div>
    );
};
export default RoomTypeForm;