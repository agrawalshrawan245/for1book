import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function Profile() {
    const {userInfo} = useSelector(s=>s.userLogin)
    // const _id = match.params.id

    // console.log(_id)
    return (
        <div className='bg-grey'>
            <Header />
            <div className='border-bottom pb-4 bg-light'>
                <div className='text-center'>
                    <img alt="" src={userInfo.cover} height="450px" width="1100px" className="rounded-bottom" />
                </div>
                <div className='col-10'>
                    <img alt="" src={userInfo.picture} height="200px" width="200px" className="rounded-circle img-cover profile-img" />

                    <h2 className='ms-3 d-inline'><strong>{userInfo.first_name} {userInfo.last_name}</strong></h2>
                    <button className='btn btn-primary float-right mt-5'><Link to="/editprofile">Edit profile</Link></button>
                </div>
            </div>
        </div>
    )
}
