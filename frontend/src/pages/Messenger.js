import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { userDetailsA } from "../actions/userActions"
import Header from "../components/Header"

export const Messenger = ({match}) => {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState("")
    const _fid = match.params.id
    const {userInfo} = useSelector(s=>s.userLogin)
    const {userDetails} = useSelector(s=>s.userDetails)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(_fid) dispatch(userDetailsA(_fid))
        else dispatch(userDetailsA("mydetails"))
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const func = async() => {
            const chatid = await axios.get(`/api/chatid/${_fid}`, config)
            const {data} = await axios.get(`/api/chat/receive/${chatid.data}`, config)
            setChat(data)
        }
        if(_fid){func()}
    },[dispatch, _fid, userInfo])    

    const sendHandler = async(e) => {
        e.preventDefault();
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        // console.log(chat.)
        const {data} = await axios.post(`/api/chat/send/${chat._id}`, {message}, config)
        setMessage("")
        setChat(data)
    }


  return (
    <>
    <Header />
    <div className="mt-10 grid grid-cols-4 bg-gray-100">

        <div className="mt-16 relative hidden h-screen md:block">
            <div className="fixed">
                {userInfo &&
                <Link to={`/messenger`}>
                    <div className="flex my-0 hover:bg-gray-200 p-1.5 rounded-md">
                        <img className="rounded-full mx-4 object-cover h-10 w-10" alt="" src={userInfo.picture} />
                        <h5 className="font-semibold pt-1.5">{userInfo.first_name} {userInfo.last_name}</h5>
                    </div>
                </Link>
                }
            </div>
        </div>

        <div className="col-span-3 mt-6">
            {_fid ? <div className="mr-20">
                <h1 className="text-xl font-semibold mt-7 mb-4">Happy chatting</h1>
                {chat.text && chat.text.map((curr, ind)=>{
                    return <div key={ind}>
                    {curr.sendBy === _fid ? 
                        <div className="flex p-1 bg-gray-200 m-1 rounded-lg w-max max-w-md">
                            <img className="rounded-full mx-4 object-cover h-7 w-7" alt="" src={userDetails && userDetails.picture} />
                            <h5 className="font-semibold pt-0">{curr.message}</h5>
                        </div> : <div className="flex p-1 m-1 flex-row-reverse bg-blue-200 rounded-lg w-max ml-auto max-w-md">
                            <img className="rounded-full mx-4 object-cover h-7 w-7" alt="" src={userInfo && userInfo.picture} />
                            <h5 className="font-semibold pt-0">{curr.message}</h5>
                        </div>
                    }
                        {/* <h1>{curr.message}</h1> */}
                    </div>
                })}
                <div className="flex shadow-2xl my-5 space-x-3 mx-3">
                    <button className="bg-blue-700" onClick={sendHandler}>Send</button>
                    <input className="flex-grow bg-white rounded-lg border border-black" value={message} onChange={(e)=>setMessage(e.target.value)} />
                </div>
            </div>
            : <> <h1 className="text-xl font-semibold mt-7 mb-4">Chat page</h1>
            {userDetails && userDetails.friends && userDetails.friends.map((friend, ind) => {
                return <Link to={`/messenger/${friend._id}`} key={ind}>
                    <div className="flex my-0 hover:bg-gray-200 p-2 w-10/12 rounded-md">
                        <img className="rounded-full mx-4 object-cover h-10 w-10" alt="" src={friend.picture} />
                        <h5 className="font-semibold pt-1.5">{friend.first_name} {friend.last_name}</h5>
                    </div>
                </Link>
            })} </> }

        </div>

    </div>
    </>
)
}
