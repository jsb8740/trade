import { combineReducers } from 'redux'
import user from './user_reducer'
import post from './post_reducer'
import comment from './comment_reducer'
// import {comment} from './comment_reducer'
export default combineReducers({
    post, user, comment
})