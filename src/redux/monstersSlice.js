import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { apiCall } from '../api/api'

const initialState = {
    data: [],
    isLoading: false,
    error: null
};

export const fetchMonsters = createAsyncThunk(
    'monstes/fetchMonsters',
    async () => {
        const response = await apiCall('https://jsonplaceholder.typicode.com/users');
        return response;
    }

)

const monstersSlice = createSlice({
    name: 'monsters',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMonsters.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchMonsters.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchMonsters.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
});

export default monstersSlice.reducer;