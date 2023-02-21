import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from './goalService'

const initialState = {
    goals: [],
    isLoading: false,
    isSeccess: false,
    isError: false,
    message: '',
}

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSeccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSeccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSeccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
                // console.log(action)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSeccess = true
                state.goals = action.payload
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const createGoal = createAsyncThunk('goals/create', async (newGoalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        debugger
        return goalService.createGoal(newGoalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return goalService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const deleteGoal = createAsyncThunk('goals/delete', async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return goalService.deleteGoal(goalId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateGoal = createAsyncThunk('goals/update', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log(token, thunkAPI.getState())
        // debugger
        return goalService.updateGoal(goalData.text, goalData.goalId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer