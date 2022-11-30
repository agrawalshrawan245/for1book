import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {Logo} from "../svg";



export default function Header() {
    const {userInfo} = useSelector(s=>s.userLogin)
    const [search, setSearch] = useState("")
    const [searchL, setSearchL] = useState("")

    useEffect(()=>{
        const func = async() => {
            if(search.length){
                const {data} = await axios.get(`/api/searchuser?keyword=${search}`, {})
                setSearchL(data)
                // console.log(searchL)
            }
        }
        func()
    },[search])

    return (
        <>
        {userInfo &&
        <nav className="navbar">

            {/* First */}
            <div className='flex space-x-3'>
                <Link to="/login" className=""><Logo /></Link>
                <div className="dropdown">
                    <div className='bg-gray-100 rounded-full p-2.5 flex sm:w-48 w-32 space-x-2'>
                        <span className=""><i className='fas fa-search'></i></span>
                        <input className="bg-transparent outline-none w-full" type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." />
                    </div>

                    {search && searchL && 
                        <div className='dropdown-content divide-y-2'>
                            {searchL.map(function (item, index){
                                // console.log(index)
                                // console.log(item)
                                return(
                                    <Link key={index} to={`/profile/${item._id}`}>
                                        <div className='flex p-2.5'>
                                            <img alt="" src={item.picture} className=" mr-2 rounded-full h-10 w-10 cover" />
                                            <h1 className=""><strong>{item.first_name} {item.last_name}</strong></h1>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>

            {/* Middle */}
            <div className="hidden lg:block flex-1 text-center">
                <Link to="/">
                    <i className="fas fa-home fs-4 text-primary border-primary py-3 px-10 border-b-2"></i>
                </Link>
                <Link to="/">
                    <i className="fas fa-store text-muted fs-4 px-10"></i>
                </Link>
                <Link to="/">
                    <i className="position-relative fas fa-users text-muted fs-4 px-10"></i>
                </Link>
                <Link to="/">
                    <i className="fas fa-gamepad text-muted fs-4 px-10"></i>
                </Link>
            </div>

            {/* Last */}
            <ul className="flex max-w-48 space-x-2 pl-5 mr-4">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <div className="bg-gray-200 rounded-full p-2 px-3"><i className="fab fa-facebook-messenger text-dark" /></div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <div className="bg-gray-200 p-2 px-3 rounded-full"><i className="fas fa-bell" /></div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <div className="bg-gray-200 p-2 px-3 rounded-full"><i className="fas fa-ellipsis-h" /></div>
                    </Link>
                </li>
                <Link to={`/profile/${userInfo._id}`}>
                    <li className="nav-item">
                            <img alt="" src={userInfo.picture} className="rounded-full object-cover h-10 w-10" />
                    </li>
                </Link>
            </ul>
        </nav>}
        </>
    )
}
