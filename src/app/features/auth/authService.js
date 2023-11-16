import axios from 'axios'

const API_URL = 'https://goals-yr91.onrender.com/api/users'

const register = async (userData) => {
    const response = await axios.post(API_URL,userData)

    if(response.data){
        localStorage.setItem('users',JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`,userData)

    if(response.data){
        localStorage.setItem('users',JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    register,
    login
}

export default authService
