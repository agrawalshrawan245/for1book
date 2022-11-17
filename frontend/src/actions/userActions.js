import axios from "axios";
import cookies from "js-cookie";

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










