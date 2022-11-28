/* eslint-disable no-unused-vars */
import {useSelector} from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";



export default function Home(){
    const {loading, userInfo, error} = useSelector(s=>s.userLogin)

    return (
        <>
            {loading && <h1 className="text-center text-primary mt-5 pt-5" ><i className="fa fa-spinner fa-pulse fa-3x fa-fw" /></h1>}
            {error && <h1 className="bg-danger border-dark rounded m-5 p-3" >{error}</h1>}
            {userInfo && 
            <div className="">
                <Header />
                <div className="row mt-7 justify-content-between">

                    {/* First */}
                    <div className="col-3 position-relative">
                        <div className="position-fixed">
                            <Link to="/profile">
                                <div>
                                    <img className="rounded-circle mx-4 img-cover" alt="" height="40px" width="40px" src={userInfo.picture} />
                                    <h5 className="d-inline">{userInfo.first_name} {userInfo.last_name}</h5>
                                </div>
                            </Link>
                            <div>
                                <img src="./left/friends.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="d-inline bold">Friends</h5>
                            </div>
                            <div>
                                <img src="./left/groups.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="d-inline bold">Groups</h5>
                            </div>
                            <div>
                                <img src="./left/watch.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="d-inline bold">Watch</h5>
                            </div>
                            <div>
                                <img src="./left/memories.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="d-inline bold">Memories</h5>
                            </div>
                            <div>
                                <img src="./left/saved.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="d-inline bold">Saved</h5>
                            </div>
                            <div>
                                <img src="./left/pages.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="d-inline bold">Pages</h5>
                            </div>
                            <div>
                                <img src="./left/events.png" alt="" height="35px" width="35px" className="mx-4 mt-3" /> 
                                <h5 className="d-inline bold">Events</h5>
                            </div>
                            <div>
                                <i className="fas fa-chevron-circle-down mt-4 mx-4" />
                                <h5 className="d-inline bold">See more</h5>
                            </div> 
                            <hr/>
                            <p className="ms-3 bold text-muted">Your shortcuts</p>
                        </div>
                    </div>

                    {/* Middle */}
                    <div className="col-5">
                        <div className="card my-3 shadow">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ipsam maiores provident, quaerat quod nihil necessitatibus, hic vero aliquam eveniet praesentium alias dignissimos. Voluptas natus aperiam ipsum ab accusantium consequuntur iusto exercitationem, sapiente modi eligendi!</div>
                        <div className="card my-3 shadow">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ipsam maiores provident, quaerat quod nihil necessitatibus, hic vero aliquam eveniet praesentium alias dignissimos. Voluptas natus aperiam ipsum ab accusantium consequuntur iusto exercitationem, sapiente modi eligendi!</div>
                        <div className="card my-3 shadow">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ipsam maiores provident, quaerat quod nihil necessitatibus, hic vero aliquam eveniet praesentium alias dignissimos. Voluptas natus aperiam ipsum ab accusantium consequuntur iusto exercitationem, sapiente modi eligendi!</div>
                    </div>

                    {/* last */}
                    <div className="col-3 position-relative">
                        <div className="position-fixed">
                            <p>Contacts</p>
                            <div className="mt-3">
                                <img className="rounded-circle mx-4 img-cover" alt="" height="40px" width="40px" src={userInfo.picture} />
                                <h5 className="d-inline">{userInfo.first_name} {userInfo.last_name}</h5>
                            </div>
                            <div className="mt-3">
                                <img className="rounded-circle mx-4 img-cover" alt="" height="40px" width="40px" src={userInfo.picture} />
                                <h5 className="d-inline">{userInfo.first_name} {userInfo.last_name}</h5>
                            </div>
                            <div className="mt-3">
                                <img className="rounded-circle mx-4 img-cover" alt="" height="40px" width="40px" src={userInfo.picture} />
                                <h5 className="d-inline">{userInfo.first_name} {userInfo.last_name}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

