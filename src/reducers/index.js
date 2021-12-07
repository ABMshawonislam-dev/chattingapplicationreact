import { combineReducers } from 'redux'
import * as actiontype from '../actions/type'

const initialstate = {
    currentUser: null,
    isLoading: true
}


const  user_reducer = (state = initialstate,action) =>{
    switch(action.type){
        case actiontype.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actiontype.CLEAR_USER:
            return{
                ...initialstate
            }
        
        default:
            return state
    }
}

const initialstategroup = {
    currentGroup: null,
}

const group_reducer = (state=initialstategroup,action)=>{
    switch(action.type){
        case actiontype.SET_CURRENT_GROUP:
            return{
                ...state,
                currentGroup: action.payload.currentgroup
            }
        default:
            return state
    }
}



const rootReducer = combineReducers({
    user: user_reducer,
    group: group_reducer
})

export default rootReducer;