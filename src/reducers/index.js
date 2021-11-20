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
        default:
            return state
    }
}

currentUser + 1


const rootReducer = combineReducers({
    user: user_reducer
})

export default rootReducer;