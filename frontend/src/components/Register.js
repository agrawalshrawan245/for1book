import React, { useState } from 'react';
import { usrRegisterA } from '../actions/userActions';
import { useDispatch } from "react-redux";

export default function Register({setModal, history}) {
    const dispatch = useDispatch();
    const [first_name, setfirst_name] = useState("") 
    const [last_name, setlast_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bYear, setbYear] = useState("2021")
    const [bMonth, setbMonth] = useState("11")
    const [bDay, setbDay] = useState("14")
    const [gender, setGender] = useState("Male")

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(usrRegisterA({first_name, last_name, email, password, bYear, bMonth, bDay, gender}));
        history.push("/");
    }



    return (
        <div className="float-start modal-fade bg-gray-400">
        <div className="card max-w-md">

                <div className="block overflow-hidden pb-1">
                    <h2 className="text-3xl font-semibold float-left">Sign up</h2>
                    <button className="float-right text-gray-500" onClick={()=>(setModal(false))}><i className="fas fa-times"/></button>
                </div>
                <small className="text-gray-500" >It's quick and easy.</small>

                <hr />

                <form className="my-2">
                    <div className="flex">
                        <input value={first_name} onChange={(e)=>{setfirst_name(e.target.value)}} type="text" className="input" placeholder="First name" />
                        <input value={last_name} onChange={(e)=>{setlast_name(e.target.value)}} type="text" className="input" placeholder="Last name" />
                    </div>

                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className="input" placeholder="Mobile number or Email" />
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="input" placeholder="New password" />

                    <small className="text-gray-500 mt-2">Date of Birth <i className="fas fa-question-circle" /></small>

                    <div className="flex">
                        <div className="flex-1">
                            <select onChange={(e)=>{setbYear(e.target.value)}} className="input">
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <select onChange={(e)=>{setbMonth(e.target.value)}} className="input">
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <select onChange={(e)=>{setbDay(e.target.value)}} className="input">
                                <option value="14">14</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    </div>

                    <small className="text-gray-500">Gender <i className="fas fa-question-circle" /></small>

                    <div className="flex">
                        <div className="flex-1">
                            <div className="input">
                                <label className=""> Male </label>
                                <input onChange={(e)=>{setGender(e.target.value)}} type="radio" className="" name="Radio" value="Male" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="input">
                                <label className=""> Female </label>
                                <input onChange={(e)=>{setGender(e.target.value)}} type="radio" className="" name="Radio" value="Female" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="input">
                                <label className=""> Other </label>
                                <input onChange={(e)=>{setGender(e.target.value)}} type="radio" className="" name="Radio" value="Other" />
                            </div>
                        </div>
                    </div>



                    <div className="text-xs text-gray-500">People who use our service may have uploaded your contact information to For1book. Learn more.</div>
                    <div className="text-xs text-gray-500">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, vel minima! Eligendi, fuga eum tempore ducimus officiis veniam totam, eveniet sit expedita est eos voluptates.
                    </div>

                    <div className="text-center mt-2">
                        <button type="submit" className="btn-success w-48 font-semibold" onClick={submitHandler}>Sign up</button>
                    </div>
                </form>

        </div>                
    </div>

)

}

