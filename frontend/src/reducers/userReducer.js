export const userLoginR = (state = {}, action) => {
    switch(action.type){
        case "USR_LOGIN_REQ":
            return {loading:true};
        case "USR_LOGIN_SUCC":
            return {loading:false, userInfo: action.payload};
        case "USR_LOGIN_FAIL":
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

export const userRegisterR = userLoginR;





