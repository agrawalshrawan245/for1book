import React from 'react';
// eslint-disable-next-line
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import cookies from "js-cookie";


const Login = () => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async(e) => {
        e.preventDefault();
        const {data} = await axios.post(`/api/login`, {email, password})
        cookies.set("user", JSON.stringify(data))
    }


    return (
        <div className="bg-fresh">
            {modal && <Modal setModal={setModal} />}
            {/* {modal && 
                <div className="float-start modal-fade shadow-lg">
                <div className="card max-w-30">
                    <div className="card-body">
                        <div className="clearfix m-0">
                            <h2 className="card-title mb-0 pb-0 float-left d-inline">Sign up</h2>
                            <button className="float-right btn btn-light p-1 text-muted" onClick={()=>{setModal(false)}}><i className="fas fa-times"/></button>
                        </div>
                        <small className="card-title mt-0 text-muted" >It's quick and easy.</small>
                        <div className="my-3 border-top"></div>

                        <form>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <input type="text" className="form-control bg-grey" placeholder="First name" />
                                </div>
                                <div className="col-6">
                                    <input type="text" className="form-control bg-grey" placeholder="Last name" />
                                </div>
                            </div>

                            <input type="email" className="form-control mb-2 bg-grey" placeholder="Mobile number or Email" />
                            <input type="password" className="form-control bg-grey" placeholder="New password" />

                            <small className="text-muted mt-2">Date of Birth <i className="fas fa-question-circle" /></small>

                            <div className="row">
                                <div className="col">
                                    <select className="form-select">
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <select className="form-select">
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <select className="form-select">
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
                                        <input type="radio" className="form-check-input" name="Radio" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="border rounded p-2">
                                        <label className="form-check-label"> Female </label>
                                        <input type="radio" className="form-check-input" name="Radio" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="border rounded p-2">
                                        <label className="form-check-label"> Custom </label>
                                        <input type="radio" className="form-check-input" name="Radio" />
                                    </div>
                                </div>
                            </div>

                            <small className="d-block text-muted">People who use our service may have uploaded your contact information to For1book. Learn more.</small>

                            <div className="text-center mt-2">
                                <button type="submit" className="btn btn-success my-3">Create New Account</button>
                            </div>
                        </form>

                    </div>
                </div>                
            </div>
            }
             */}

            <div className="container">
            <div className="row full-page align-items-center">
                <div className="col-lg-1"></div>
                <div className="col-lg-6 p-lg-5">
                    <h1 className="text-primary bold">for1book</h1>
                    <p className="text-lg">Connect with friends and the world around you on For1book.</p>
                </div>
                <div className="col-lg-4">
                    <div className="border rounded p-3 shadow  bg-light">
                        <div className="form-group mt-3">
                            <input className="form-control p-3" type={"text"} value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email or phone number" />
                        </div>
                        <div className="form-group mt-3">
                            <input className="form-control p-3" type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
                        </div>

                        <button className="btn btn-primary mt-3 p-2 w-100" type="submit" onClick={submitHandler}><strong>Log In</strong></button>

                        <Link to="/" className="d-block mt-2 text-center text-primary mb-4">Forgot password?</Link>

                        <div className="border-top"></div>

                        <div className="text-center">
                            <button className="btn btn-success mt-4 p-3" onClick={()=>{setModal(true)}}><strong>Create new account</strong></button>
                        </div>

                    </div>
                    <br />
                    <Link to="/" className="mt-1 d-block text-center"><strong>Create a Page</strong> for a celebrity, brand or business.</Link>
                </div>
                <div className="col-lg-1"></div>

            </div>
            </div>
        </div>
    )
}


export default Login