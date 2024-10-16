import { url } from "../api/configuration";
import React, { useState, useEffect } from 'react';
export const RoomOptions = () => {
    const [assignRoom, listRooms] = useState([]);
    const getInitialState = () => {
        const value = "101";
        return value;
    };

    const [value, setValue] = useState(getInitialState);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        fetch(`${url}/rooms`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                listRooms(data.data);
            });
    }, []);
    return (
        <select id="roomNumber" value={value} onChange={handleChange}>
            {
                assignRoom.map((assignRoom) => (
                    <option key={assignRoom.id} value={assignRoom.id}>{assignRoom.room_number}</option>
                ))
            }
        </select>
    );
};
export default RoomOptions;