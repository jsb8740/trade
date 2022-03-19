import axios from "axios";
import { 
    WRITE_POST,
    UPLOAD_FILE,
    GET_POST,
    MODIFY_POST,
    DELETE_POST,
    SEARCH_POST,
} from './types'

export async function write(postData) {
    const request = await axios.get('/api/post/write', {params: postData});
    //get방식으로는 body로 못보냄 params로 보내서 서버에서 query로 받는다
    // console.log(request.data)

    return {
        type: WRITE_POST,
        payload: request.data
    }
}

export async function uploadFile(file) {
    console.log(file)
    const request = await axios.post('/api/post/uploadFile', file);
    
    // console.log(request.data)

    return {
        type: UPLOAD_FILE,
        payload: request.data
    }
}

export async function getPost(body) {
    
    const request = await axios.post('/api/post/getPosts', body);
    
    // console.log(request.data)

    return {
        type: GET_POST,
        payload: request.data
    }
}

export async function modifyPost(body) {
    
    const request = await axios.post('/api/post/modifyPost', body);
    
    // console.log(request.data)

    return {
        type: MODIFY_POST,
        payload: request.data
    }
}

export async function deletePost(body) {
    
    const request = await axios.post('/api/post/deletePost', body);
    
    // console.log(request.data)

    return {
        type: DELETE_POST,
        payload: request.data
    }
}

export async function searchPost(body) {
    
    const request = await axios.get(`/api/post/searchPost` , {params:body});
    
    // console.log(request.data)

    return {
        type: SEARCH_POST,
        payload: request.data
    }
}

