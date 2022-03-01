//전 state와  현재 state를 next로 만드는 곳.

import{
    LOGIN_USER, REGISTER_USER
} from '../_action/types';

export default function(state={}, action){
    switch(action.type){
        case LOGIN_USER:                    //user_action.js의 payload를 담음.
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return{ ...state, register: action.payload }  
        default:
            return state;
    }
}