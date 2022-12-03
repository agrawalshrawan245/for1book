import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userDetailsA } from '../actions/userActions';
import Header from '../components/Header'

export default function Profile({match}) {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(s=>s.userLogin);
    const {userDetails} = useSelector(s=>s.userDetails);
    const _id = match.params.id;

    // const config = {headers: { Authorization: `Bearer ${userInfo.token}`,}}

    useEffect(()=>{
        dispatch(userDetailsA(_id));
    },[_id, dispatch])

    const friendReqHandler = async(e) => {
        e.preventDefault();
        const config = {headers: { Authorization: `Bearer ${userInfo.token}`}}
        await axios.post(`/api/friendreq/${_id}`, {}, config)
        dispatch(userDetailsA(_id));
    }

    const unfriendHandler = async(e) => {
        e.preventDefault();
        const config = {headers: { Authorization: `Bearer ${userInfo.token}`,}}
        await axios.post(`/api/unfriend/${_id}`, {}, config)
        dispatch(userDetailsA(_id));
    }
    

    const acceptReqHandler = async(e) => {
        e.preventDefault();
        const config = {headers: { Authorization: `Bearer ${userInfo.token}`,}}
        await axios.post(`/api/friendreqacc/${_id}`, {}, config)
        dispatch(userDetailsA(_id));
    }
    
    return (
        <div className='bg-gray-100'>
            <Header />
            <div className='border-b bg-white shadow-lg'>
                {userDetails &&
                <div className='border-b mt-14 md:w-9/12 mx-auto'>
                    <img alt="" src={userDetails.cover} className="rounded-b-xl h-[25rem]  w-full object-cover" />

                    <div className='md:flex mb-4'>
                        <img alt="" src={userDetails.picture} className="rounded-full ml-16 -mt-7 h-[10.5rem] w-[10.5rem] object-cover border-4 border-white" />
                        <div className='flex-col flex-grow'>
                            <h1 className='text-4xl my-5 ml-5'><strong>{userDetails.first_name} {userDetails.last_name}</strong></h1>
                            <div className='flex justify-between mx-6 items-end'>
                                <div className='flex-col'>
                                    {userDetails.friends && <h1>{userDetails.friends.length} Friends {userDetails.friendship && userDetails.friendship.following && " . following"}</h1>}
                                    <div className='flex ml-3'>
										{userDetails.friends && userDetails.friends.map((fri,  ind)=>{
											if(ind > 6) return null;
											else return <img key={ind} alt="" src={fri.picture} className="rounded-full h-10 w-10 object-cover border-2 border-white -ml-3" />
										})}
                                    </div>
                                </div>
                                <div className='flex space-x-2'>
                                {userDetails.friendship && (
                                    userDetails.friendship.self ? 
                                    <Link className='btn-primary flex' to="/editprofile"><span className="material-icons">edit</span> Edit profile</Link>
                                    : userDetails.friendship.friends ? 
                                    <button className='btn-primary flex' onClick={unfriendHandler}><span className="material-icons">face</span> Unfriend</button>
                                    : userDetails.friendship.requestSent ?
                                    <h1 className='bg-gray-300  p-3 rounded-lg'>Request sent</h1>
                                    : userDetails.friendship.requestReceived ?
                                    <button className='btn-primary flex' onClick={acceptReqHandler}><span className="material-icons">face</span> Accept request </button>
                                    : <button className='btn-primary flex' onClick={friendReqHandler}><span className="material-icons">face</span> Add friend </button>
                                )}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

}
                <div className='flex md:w-9/12 mx-auto'>
                    <button className='py-4 px-5 border-b-4 border-blue-500 m-0'>Posts</button>
                    <button className='py-4 px-5 m-0'>Friends</button>
                    <button className='py-4 px-5 m-0'>Photos</button>
                </div>

        </div>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
        </div>
    )
}
