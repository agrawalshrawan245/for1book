/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from "react";
import { Link, Route } from "react-router-dom";
import Register from "../components/Register";
import { useDispatch } from "react-redux";
import { usrLoginA } from '../actions/userActions';
import {useNavigate} from "react-router-dom";


const Login = ({history}) => {
    // const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const {loading, userInfo, error} = useSelector(s => s.userLogin)

    const submitHandlerLogin = (e) => {
        e.preventDefault();
        dispatch(usrLoginA(email, password));
        history.push("/");
    }


    return (
        <div className="bg-fresh">

            {modal && <Register setModal={setModal} history={history}/>}
            {/* {modal && <Route render={({history}) => <Register history = {history} setModal={setModal} />} />} */}


            <div className="container">
            <div className="row full-page align-items-center">
                <div className="col-lg-1"></div>
                <div className="col-lg-6 p-lg-5">
                    <h1 className="text-primary bold"><Link to="/">for1book</Link></h1>
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

                        <button className="btn btn-primary mt-3 p-2 w-100" type="submit" onClick={submitHandlerLogin}><strong>Log In</strong></button>

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