import axios from "axios";
import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from './types'

export async function loginUser(userData) {
    const request = await axios.post('/api/users/login', userData);

    // console.log(request.data)

    return {
        type: LOGIN_USER,
        payload: request.data
    }
}

export async function registerUser(userData) {
    const request = await axios.post('/api/users/register', userData);

    // console.log(request.data)

    return {
        type: REGISTER_USER,
        payload: request.data
    }
}

export async function auth() {
    const request = await axios.get('/api/users/auth');

    // console.log(request.data)

    return {
        type: AUTH_USER,
        payload: request.data
    }
}

