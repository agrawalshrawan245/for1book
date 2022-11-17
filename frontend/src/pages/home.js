/* eslint-disable no-unused-vars */
import {useSelector} from "react-redux";


export default function Home(){

    const {loading, userInfo, error} = useSelector(s=>s.userLogin)

    return (
        <>
            {userInfo ? <h1>Hi {userInfo.first_name} {userInfo.last_name}! Welcome to for1book...</h1> : 
            loading && <h1><i className="fa fa-spinner fa-pulse fa-5x fa-fw" /></h1> }
        </>
    )
}


