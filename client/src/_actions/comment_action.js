import axios from "axios";
import { 
    WRITE_COMMENT,
    VIEW_COMMENT,
    MODIFY_COMMENT,
    DELETE_COMMENT
} from './types'

export async function writeComment(body) {
    
    const request = await axios.post(`/api/comment/writeComment` , body);
    
    // console.log(request.data)

    return {
        type: WRITE_COMMENT,
        payload: request.data
    }
}

export async function getComments(body) {
    const request = await axios.post(`/api/comment/getComment` , body);
    
    // console.log(request.data)

    return {
        type: VIEW_COMMENT,
        payload: request.data
    }
}

export async function modifyComment(body) {
    const request = await axios.post(`/api/comment/modifyComment` , body);
    
    // console.log(request.data)

    return {
        type: MODIFY_COMMENT,
        payload: request.data
    }
}

export async function deleteComment(body) {
    const request = await axios.post(`/api/comment/deleteComment` , body);
    
    // console.log(request.data)

    return {
        type: DELETE_COMMENT,
        payload: request.data
    }
}
