import {
    SET_HOME_INFO,
} from './types'
export function setHomeInfo(info){
    return{
        type:SET_HOME_INFO,
        payload:info
    }
}