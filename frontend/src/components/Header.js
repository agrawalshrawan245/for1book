import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {Logo, Search} from "../svg";



export default function Header() {
    const {userInfo} = useSelector(s=>s.userLogin)

    return (
        <>
        {userInfo &&
        <nav className="navbar navbar-expand-sm bg-white shadow px-3 fixed-top">
            {/* First */}
            <Link to="/login" className="navbar-brand"><Logo /></Link>
            <div className="input-group w-20">
                <span className="input-group-text border-0"><Search /></span>
                <input type="search" className="bg-grey form-control border-0 p-2" placeholder="Search..." />
            </div>

            {/* Middle */}
            <div className="text-center w-100">
                <Link to="/">
                    <i className="fas fa-home fs-4 text-primary border-bottom border-5 border-primary py-3 px-4"></i>
                </Link>
                <Link to="/">
                    <i className="fas fa-store text-muted fs-4 px-4"></i>
                </Link>
                <Link to="/">
                    <i className="position-relative fas fa-users text-muted fs-4 px-4"></i>
                </Link>
                <Link to="/">
                    <i className="fas fa-gamepad text-muted fs-4 px-4"></i>
                </Link>
            </div>

            {/* Last */}
            <ul className="navbar-nav ms-auto w-20">
                {/* <li className="nav-item">
                    <h5 className="py-2">
                        <Link to="/" className="nav-link text-dark">{userInfo.first_name}</Link>
                    </h5>
                </li> */}
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <div className="bg-grey rounded-circle border p-2 px-3"><i className="fab fa-facebook-messenger text-dark" /></div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <div className="bg-grey text-dark p-2 px-3 rounded-circle border"><i className="fas fa-bell" /></div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <div className="bg-grey text-dark p-2 px-3 rounded-circle border"><i className="fas fa-ellipsis-h" /></div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <img alt="" src={userInfo.picture} height="40px" width="40px" className="rounded-circle  img-cover" />
                    </Link>
                </li>
            </ul>
        </nav>}
        </>
    )
}
