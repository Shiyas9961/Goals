import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


const user = JSON.parse(localStorage.getItem('users'))

const initialState = {
    user : user ? user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ''
}

export const registerUser = createAsyncThunk('user/registerUser', async (user,thunkAPI)=>{
    try{
        return authService.register(user)
    }catch(err){
        const message = err.response || err.response.data || err.response.data.message || err.message || err.message.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const loginUser = createAsyncThunk('user/loginUser', async (user,thunkAPI)=>{
    try{
        return authService.login(user)
    }catch(err){
        const message = err.response || err.response.data || err.response.data.message || err.message || err.message.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        reset : (state) => {
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.message = ''
        },
        logout : (state) => {
            localStorage.removeItem('users')
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.user = null
        }
    },
    extraReducers(builder)  {
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.user = null
            state.message = action.payload
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.user = null
            state.message = action.payload
        })
    } 
})


export const { reset,logout } = authSlice.actions
export default authSlice.reducer