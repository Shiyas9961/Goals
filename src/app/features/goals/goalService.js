import axios from "axios"

const API_URL = 'https://goals-yr91.onrender.com/api/goals'

const createGoal = async (token,goalData) => {
    const config = { 
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL,{ 
        text : goalData
    },config)

    return response.data
}

const getGoal = async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)

    return response.data
}

const deleteGoal = async (id,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}/${id}`,config)

    return response.data
}

const updateGoal = async (goalData,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/${goalData.id}`,{text : goalData.text}, config)
    return response.data
}

const authService = {
    createGoal,
    getGoal,
    deleteGoal,
    updateGoal
}

export default authService
