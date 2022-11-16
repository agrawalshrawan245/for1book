import React, { useState } from 'react'
import axios from "axios";

export default function Modal({setModal}) {
    const [first_name, setfirst_name] = useState("") 
    const [last_name, setlast_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bYear, setbYear] = useState("2021")
    const [bMonth, setbMonth] = useState("11")
    const [bDay, setbDay] = useState("14")
    const [gender, setGender] = useState("")

    const submitHandler = async(e) => {
        e.preventDefault();
        const {data} = await axios.post('/api/register', {first_name, last_name, email, password, bYear, bMonth, bDay, gender});
        console.log(data);
    }



    return (
        <div className="float-start modal-fade shadow-lg">
        <div className="card max-w-30">
            <div className="card-body">
                <div className="clearfix m-0">
                    <h2 className="card-title mb-0 pb-0 float-left d-inline">Sign up</h2>
                    <button className="float-right btn btn-light p-1 text-muted" onClick={()=>(setModal(false))}><i className="fas fa-times"/></button>
                </div>
                <small className="card-title mt-0 text-muted" >It's quick and easy.</small>
                <div className="my-3 border-top"></div>

                <form>
                    <div className="row mb-2">
                        <div className="col-6">
                            <input value={first_name} onChange={(e)=>{setfirst_name(e.target.value)}} type="text" className="form-control bg-grey" placeholder="First name" />
                        </div>
                        <div className="col-6">
                            <input value={last_name} onChange={(e)=>{setlast_name(e.target.value)}} type="text" className="form-control bg-grey" placeholder="Last name" />
                        </div>
                    </div>

                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control mb-2 bg-grey" placeholder="Mobile number or Email" />
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control bg-grey" placeholder="New password" />

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



                    <small className="d-block text-muted">People who use our service may have uploaded your contact information to For1book. Learn more.</small>

                    <div className="text-center mt-2">
                        <button type="submit" className="btn btn-success my-3" onClick={submitHandler}>Create New Account</button>
                    </div>
                </form>

            </div>
        </div>                
    </div>
)
}
