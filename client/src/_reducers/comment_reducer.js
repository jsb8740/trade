import { 
    WRITE_COMMENT,
    VIEW_COMMENT,
    MODIFY_COMMENT,
    DELETE_COMMENT
} from '../_actions/types'


export default function (state ={}, action) {
    switch(action.type) {
        case WRITE_COMMENT:
            return {
                ...state, write_comment:action.payload
            }
        case VIEW_COMMENT:
            return {
                ...state, view_comment:action.payload
            }
        case MODIFY_COMMENT:
            return {
                ...state, modify_comment:action.payload
            }
        case DELETE_COMMENT:
            return {
                ...state, delete_comment:action.payload
            }
        default :
            return state;
    }
}