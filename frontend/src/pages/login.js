/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from "react";
import { Link, Route } from "react-router-dom";
import Register from "../components/Register";
import { useDispatch } from "react-redux";
import { usrLoginA } from '../actions/userActions';
// import {useNavigate} from "react-router-dom";


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
        <div className="bg-gray-100">

            {modal && <Register setModal={setModal} history={history}/>}
            {/* {modal && <Route render={({history}) => <Register history = {history} setModal={setModal} />} />} */}


            <div className="w-10/12 container mx-auto">
            <div className="md:flex md:items-center md:justify-center min-h-screen md:pb-24">
                <div className="md:mb-28 md:w-1/2 lg:w-2/3 mx-auto md:mx-none">
                    <h1 className="text-primary font-bold text-[3.6rem]"><Link to="/">for1book</Link></h1>
                    <p className="text-2xl">For1book helps you connect and share with the people in your life.</p>
                </div>
                <div className="md:w-1/2 lg:w-1/3 mx-auto md:mx-none m-10">
                    <div className="border p-2 bg-white shadow-xl rounded-lg">
                        <input className="input" type={"text"} value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email or phone number" />
                        <input className="input" type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />

                        <button className="btn-primary block w-[96%] mt-3 mx-auto" type="submit" onClick={submitHandlerLogin}><strong>Log In</strong></button>

                        <Link to="/" className="block text-center my-4 text-primary">Forgot password?</Link>

                        <hr />
                        {/* <div className="border-top"></div> */}

                        <button className="btn-success mt-4 block mx-auto" onClick={()=>{setModal(true)}}><strong>Create new account</strong></button>

                    </div>
                    <br />
                    <Link to="/" className="mt-0 block text-center"><strong>Create a Page</strong> for a celebrity, brand or business.</Link>
                </div>

            </div>
            </div>
        </div>
    )
}


export default Login