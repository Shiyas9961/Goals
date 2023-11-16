import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals : [],
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : ''
}

export const addGoals = createAsyncThunk('goals/addGoals',async (goalData,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(token,goalData)
    }catch(err){
        const message = err.message || err.message.toString() || err.response || err.response.data
        return thunkAPI.rejectWithValue(message) 
    }
})

export const getGoal = createAsyncThunk('goal/getGoal', async (_,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoal(token)
    }catch(err){
        const message = err.message || err.message.toString() || err.response || err.response.data
        return thunkAPI.rejectWithValue(message) 
    }
})

export const deleteGoal = createAsyncThunk('goal/deleteGoal', async (id,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id,token)
    }catch(err){
        const message = err.message || err.message.toString() || err.response || err.response.data
        return thunkAPI.rejectWithValue(message)  
    }
})

export const updateGoal = createAsyncThunk('goal/updateGoal', async (goalData,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.updateGoal(goalData,token)
    }catch(err){
        const message = err.message || err.message.toString() || err.response || err.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name : 'goal',
    initialState,
    reducers : {
        reset : (state) => {
            return state = initialState
        }
    },
    extraReducers(builder){
        builder.addCase(addGoals.pending,(state)=>{
            state.isLoading = true
        }).addCase(addGoals.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.goals.push(action.payload)
        }).addCase(addGoals.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        }).addCase(getGoal.pending,(state)=>{
            state.isLoading = true
        }).addCase(getGoal.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.goals = action.payload
        }).addCase(getGoal.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        }).addCase(deleteGoal.pending,(state)=>{
            state.isLoading = true
        }).addCase(deleteGoal.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.goals = state.goals.filter(goal=>{
                return goal._id !== action.payload.id
            })
        }).addCase(deleteGoal.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        }).addCase(updateGoal.pending,(state)=>{
            state.isLoading = true
        }).addCase(updateGoal.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.goals.map(goal=>{
                if(goal._id === action.payload.id){
                    return {
                        ...goal,text : action.payload.text
                    }
                }
                return goal
            })

        }).addCase(updateGoal.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.paupdateGoal
        })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer