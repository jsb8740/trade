import { 
    WRITE_POST,
    UPLOAD_FILE,
    GET_POST,
    MODIFY_POST,
    DELETE_POST,
    SEARCH_POST,

} from '../_actions/types'


export default function (state ={}, action) {
    switch(action.type) {
        case WRITE_POST:
            return {
                ...state, write:action.payload
            }
        case UPLOAD_FILE:
            return {
                ...state, file:action.payload
            }
        case GET_POST:
            return {
                ...state, getposts:action.payload
            }
        case MODIFY_POST:
            return {
                ...state, modify:action.payload
            }
        case DELETE_POST:
            return {
                ...state, delete:action.payload
            }
        case SEARCH_POST:
            return {
                ...state, search:action.payload
            }
        default :
            return state;
    }
}