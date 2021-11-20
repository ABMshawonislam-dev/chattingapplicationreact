import * as actiontype from "./type";

export const setuser = (user)=>{
    return{
        type: actiontype.SET_USER,
        payload:{
            currentUser: user
        }
    }
}
