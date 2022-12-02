/* eslint-disable no-unused-vars */
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { userDetailsA } from "../actions/userActions";



export default function Home(){
    const {loading, userInfo, error} = useSelector(s=>s.userLogin)
    const {userDetails} = useSelector(s=>s.userDetails)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userDetailsA("mydetails"))
    },[dispatch])

    return (
        <>
            {loading && <h1 className="text-center text-primary mt-5 pt-5" ><i className="fa fa-spinner fa-pulse fa-3x fa-fw" /></h1>}
            {error && <h1 className="bg-danger border-dark rounded m-5 p-3" >{error}</h1>}
            {userInfo && 
            <div className="relative">
                <Header />
                <div className="grid grid-cols-5 mt-16 w-screen">

                    {/* First */}
                    <div className="relative hidden h-screen md:block">
                        <div className="fixed">
                            <Link to={`/profile/${userInfo._id}`}>
                                <div className="flex my-2">
                                    <img className="rounded-full mx-4 object-cover h-10 w-10" alt="" src={userInfo.picture} />
                                    <h5 className="font-semibold pt-1.5">{userInfo.first_name} {userInfo.last_name}</h5>
                                </div>
                            </Link>
                            <div className="flex my-2">
                                <img src="./left/friends.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="font-semibold pt-4">Friends</h5>
                            </div>
                            <div className="flex my-2">
                                <img src="./left/groups.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="font-semibold pt-4">Groups</h5>
                            </div>
                            <div className="flex my-2">
                                <img src="./left/watch.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="font-semibold pt-4">Watch</h5>
                            </div>
                            <div className="flex my-2">
                                <img src="./left/memories.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="font-semibold pt-4">Memories</h5>
                            </div>
                            <div className="flex my-2">
                                <img src="./left/saved.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="font-semibold pt-4">Saved</h5>
                            </div>
                            <div className="flex my-2">
                                <img src="./left/pages.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="font-semibold pt-4">Pages</h5>
                            </div>
                            <div className="flex my-2">
                                <img src="./left/events.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="font-semibold pt-4">Events</h5>
                            </div>
                            <div className="flex my-2 mb-4">
                                <i className="fas fa-chevron-circle-down mt-4 mx-4" />
                                <h5 className="font-semibold pt-2">See more</h5>
                            </div> 
                            <hr/>
                            <p className="m-3 font-bold">Your shortcuts</p>
                        </div>
                    </div>

                    {/* Middle */}
                    <div className="md:col-span-3 sm:col-span-4 col-span-5">
                        <div className="w-8/12 mx-auto">
                            <div className="card">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ipsam maiores provident, quaerat quod nihil necessitatibus, hic vero aliquam eveniet praesentium alias dignissimos. Voluptas natus aperiam ipsum ab accusantium consequuntur iusto exercitationem, sapiente modi eligendi!</div>
                            <div className="card">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ipsam maiores provident, quaerat quod nihil necessitatibus, hic vero aliquam eveniet praesentium alias dignissimos. Voluptas natus aperiam ipsum ab accusantium consequuntur iusto exercitationem, sapiente modi eligendi!</div>
                            <div className="card">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ipsam maiores provident, quaerat quod nihil necessitatibus, hic vero aliquam eveniet praesentium alias dignissimos. Voluptas natus aperiam ipsum ab accusantium consequuntur iusto exercitationem, sapiente modi eligendi!</div>
                            <div className="card">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ipsam maiores provident, quaerat quod nihil necessitatibus, hic vero aliquam eveniet praesentium alias dignissimos. Voluptas natus aperiam ipsum ab accusantium consequuntur iusto exercitationem, sapiente modi eligendi!</div>
                        </div>
                    </div>

                    {/* last */}
                    <div className="relative sm:block hidden">
                        <div className="fixed">
                            <p className="text-lg font-medium">Contacts</p>
                            {/* {userDetails && userDetails.friends && console.log(userDetails.friends)}  */}
                            {userDetails && userDetails.friends && userDetails.friends.map((fri, ind)=>{
                            return <Link to={`/profile/${fri._id}`} key={ind}>
                                <div className="p-1.5 rounded-lg flex hover:bg-gray-200">
                                    <img className="rounded-full mx-4 object-cover h-10 w-10" alt="" src={fri.picture} />
                                    <h5 className="font-medium flex-grow">{fri.first_name} {fri.last_name}</h5>
                                </div>
                            </Link>
                            })} 
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

