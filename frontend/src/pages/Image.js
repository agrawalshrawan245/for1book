import axios from 'axios';
import React, { useState } from 'react'

export default function Image() {
    const [dataa, setdata] = useState("");
    const submitHandler = async(e) => {
        // e.preventDefault();
        const file = e.target.files[0];
        const form = new FormData();
        form.append('image', file);
        const config = {
            headers: { 
                "Content-Type":"multipart/form-data"
            }
        }
        const {data} = await axios.post("/api/database", form, config);
        setdata(data);
        console.log(dataa);
    }
    return (
        <>
            <input type="file" onChange={submitHandler} />
            <img src={dataa} alt="" />
        </>
    )
}
