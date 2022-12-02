import axios from "axios";
import cookies from "js-cookie";



export const userDetailsA = (_id) => async(dispatch, getState) => {
    try{
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        dispatch({type:"USR_DETAILS_REQ",})
        const {data} = await axios.get(`/api/profile/${_id}`, config)
        dispatch({type:"USR_DETAILS_SUCC", payload:data})
    }catch(error){
        dispatch({type:"USR_DETAILS_FAIL", payload:error.message})
    }
}

// export const usrLoginA = (email, password) => {
export const usrLoginA = (email, password) => async(dispatch) => {
    try{
        dispatch({type:"USR_LOGIN_REQ",})
        const {data} = await axios.post(`/api/login`, {email, password})
        dispatch({type:"USR_LOGIN_SUCC", payload: data})
        cookies.set("user", JSON.stringify(data))
    }catch(error){
        dispatch({type:"USR_LOGIN_FAIL", payload:error.message})
    }
}


export const usrRegisterA = (reqData) => async(dispatch) => {
    try{
        dispatch({type:"USR_LOGIN_REQ",})
        const {data} = await axios.post(`/api/register`, {...reqData})
        dispatch({type:"USR_LOGIN_SUCC", payload: data})
        cookies.set("user", JSON.stringify(data))
    }catch(error){
        dispatch({type:"USR_LOGIN_FAIL", payload:error.message})
    }
}



export const usrUpdateA = (reqData) => async(dispatch, getState) => {
    // console.log("config")
    try{
        const {userLogin:{userInfo},} = getState()
        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        dispatch({type:"USR_LOGIN_REQ",})
        const {data} = await axios.put(`/api/update`, {...reqData}, config)
        dispatch({type:"USR_LOGIN_SUCC", payload: data})
        cookies.set("user", JSON.stringify(data))
    }catch(error){
        dispatch({type:"USR_LOGIN_FAIL", payload:error.message})
    }
}










