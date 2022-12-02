import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Header from "../components/Header"


export const ListAll = ({history}) => {
    const dispatch = useDispatch()
    const [allUsers, setAllUsers] = useState("")
    const {userInfo} = useSelector(s=>s.userLogin)

    const config = {
        headers: { 
            Authorization: `Bearer ${userInfo.token}`,
        }
    }


    useEffect(()=>{
        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const funct = async() => {
            const {data} = await axios.get("/api/listallusers", config)
            setAllUsers(data)
        }
        funct()
    },[userInfo.token])

    const adminLoginHandler = async(email) => {
        try{
            const { data } = await axios.post("/api/adminlogin", {email}, config)
            // console.log(data)
            dispatch({type:"USR_LOGIN_SUCC", payload:data})
            history.push("/")
        }catch(error){
            dispatch({type:"USR_LOGIN_FAIL", payload:error.message})
        }

    }

    return (
        <>
        <Header />
        <div className="mt-10 grid grid-cols-4 bg-gray-100">

            <div className="mt-6 relative hidden h-screen md:block">
                <div className="fixed">
                    {userInfo &&
                    <Link to={`/profile/${userInfo._id}`}>
                        <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                            <img className="rounded-full mx-4 object-cover h-10 w-10" alt="" src={userInfo.picture} />
                            <h5 className="font-semibold pt-1.5">{userInfo.first_name} {userInfo.last_name}</h5>
                        </div>
                    </Link>
                    }
                    <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                        <img src="./left/friends.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                        <h5 className="font-semibold pt-4">Friends</h5>
                    </div>
                    <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                        <img src="./left/groups.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                        <h5 className="font-semibold pt-4">Groups</h5>
                    </div>
                    <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                        <img src="./left/watch.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                        <h5 className="font-semibold pt-4">Watch</h5>
                    </div>
                    <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                        <img src="./left/memories.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                        <h5 className="font-semibold pt-4">Memories</h5>
                    </div>
                    <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                        <img src="./left/saved.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                        <h5 className="font-semibold pt-4">Saved</h5>
                    </div>
                    <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                        <img src="./left/pages.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                        <h5 className="font-semibold pt-4">Pages</h5>
                    </div>
                    <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                        <img src="./left/events.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                        <h5 className="font-semibold pt-4">Events</h5>
                    </div>
                    <div className="flex my-0 mb-4 hover:bg-gray-200 p-1.5 rounded-md">
                        <i className="fas fa-chevron-circle-down mt-4 mx-4" />
                        <h5 className="font-semibold pt-2">See more</h5>
                    </div> 
                    <hr/>
                    <p className="m-3 font-bold">Your shortcuts</p>
                </div>
            </div>

            <div className="col-span-3 mt-6">
                <h1 className="text-xl font-semibold mt-7">All facebook users.</h1>
                {allUsers &&
                    <div className="mx-0 my-2">
                        {allUsers.map(function(req,ind){
                            // return <Link to={`/profile/${req._id}`} key ={ind}>

                                return <div className="flex hover:bg-gray-200 p-5 rounded-2xl" key={ind}>
                                    <img alt="my_image" src={req.picture} className="h-10 w-10 rounded-full mt-3 mr-2" />
                                    <div className="mx-2 my-0">
                                        <div className="text-xl font-semibold">{req.first_name} {req.last_name}</div>
                                        <div className="text-sm">{req.username}</div>
                                    </div>
                                    <button className="btn-primary self-center ml-auto mr-3" onClick={()=>adminLoginHandler(req.email)}>Admin login</button>
                                </div>
                            // </Link> 
                        })}
                    </div>
                }

            </div>

        </div>
        </>
    )
}
