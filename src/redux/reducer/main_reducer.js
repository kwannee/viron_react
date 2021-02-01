import{
    SET_HOME_INFO
} from '../actions/types'
const initialState = {
    info : []
}

export default function(state=initialState,action){
    switch(action.type){
        case SET_HOME_INFO:
            return {
                ...state,
                info: action.payload !== "reset" ? [...state.info, action.payload] : []
            }
        default:
            return state;
    }
}