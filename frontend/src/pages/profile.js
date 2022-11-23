/* eslint-disable no-unused-vars */
import axios from "axios";
import { usrUpdateA } from "../actions/userActions";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Profile({history}){
    const [profileD, setProfileD] = useState("");
    const [coverD, setCoverD] = useState("");
    const [first_name, setfirst_name] = useState("") 
    const [last_name, setlast_name] = useState("")
    const [password, setPassword] = useState("")
    const [bYear, setbYear] = useState("")
    const [bMonth, setbMonth] = useState("")
    const [bDay, setbDay] = useState("")
    const [gender, setGender] = useState("")

    const { userInfo } = useSelector(s => s.userLogin)

    const dispatch = useDispatch()

    const submitProfile = async(e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const form = new FormData();
        form.append('image', file);
        const config = {
            headers: { 
                "Content-Type":"multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.post("/api/database", form, config)
        setProfileD(data);
        // console.log(profileD);
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        dispatch(usrUpdateA({profileD, coverD, first_name, last_name, password, bDay, bMonth, bYear, gender}))
        history.go(-1)
    }


    const submitCover = async(e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const form = new FormData();
        form.append('image', file);
        const config = {
            headers: { 
                "Content-Type":"multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.post("/api/database", form, config);
        setCoverD(data);
    }

    return (
        <div className="bg-grey v-100">
            <div className="container p-5">
                <div className="card shadow p-3">
                    <h3 className="text-center mt-3">Edit Profile</h3>
                    <hr/>
                    <h4>Profile picture</h4>
                    <input type="file" onChange={submitProfile} />
                    <img className="rounded-circle mx-auto" src={profileD ? profileD : userInfo && userInfo.picture} alt="Profile" height="200px" width="200px" />
                    <h4>Cover photo</h4>
                    <input type="file" onChange={submitCover} />
                    <img className="rounded mx-auto" src={coverD ? coverD : userInfo && userInfo.cover} alt="Cover" height="250px" width="700px" />


                    <div className="card m-3 p-5 shadow">

                    <h3>Change your personal info here</h3>


                    <div className="row mb-2">
                        <div className="col-6">
                            <input value={first_name} onChange={(e)=>{setfirst_name(e.target.value)}} type="text" className="form-control bg-grey" placeholder="First name" />
                        </div>
                        <div className="col-6">
                            <input value={last_name} onChange={(e)=>{setlast_name(e.target.value)}} type="text" className="form-control bg-grey" placeholder="Last name" />
                        </div>
                    </div>

                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control bg-grey" placeholder="Change password" />

                    <small className="text-muted mt-2">Date of Birth <i className="fas fa-question-circle" /></small>

                    <div className="row">
                        <div className="col">
                            <select onChange={(e)=>{setbYear(e.target.value)}} className="form-select">
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                        <div className="col">
                            <select onChange={(e)=>{setbMonth(e.target.value)}} className="form-select">
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                        <div className="col">
                            <select onChange={(e)=>{setbDay(e.target.value)}} className="form-select">
                                <option value="14">14</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    </div>

                    <small className="text-muted">Gender <i className="fas fa-question-circle" /></small>

                    <div className="row">
                        <div className="col">
                            <div className="border rounded p-2">
                                <label className="form-check-label"> Male </label>
                                <input onChange={(e)=>{setGender(e.target.value)}} type="radio" className="form-check-input" name="Radio" value="Male" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="border rounded p-2">
                                <label className="form-check-label"> Female </label>
                                <input onChange={(e)=>{setGender(e.target.value)}} type="radio" className="form-check-input" name="Radio" value="Female" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="border rounded p-2">
                                <label className="form-check-label"> Other </label>
                                <input onChange={(e)=>{setGender(e.target.value)}} type="radio" className="form-check-input" name="Radio" value="Other" />
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="text-center mt-2">
                        <button type="submit" className="btn btn-primary my-3" onClick={submitHandler}>Submit this form</button>
                    </div>

                </div>
            </div>
        </div>
    )
}