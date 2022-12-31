import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    all: [],
    editSelect: {
        name: '',
        priority: ''
    }
}
export const jobSlice = createSlice({
    name: 'jobSlice',
    initialState,
    reducers: {
        jobLoad: (state, action) => {
            state.all = action.payload;
        },
        jobInsert: (state, {payload}) => {
            state.all.push(payload);
        },
        jobUpdate: (state, action) => {
            const index = action.payload.id;
            state.all[index] = action.payload;
        },
        jobSelect: (state, action) => {
            state.editSelect = action.payload;
        },
        jobDelete: (state, {payload}) => {
            state.all = state.all.filter((job, index) => index !== payload)
        },
    }
})

export const { jobInsert, jobUpdate, jobDelete, jobSelect, jobLoad } = jobSlice.actions

export default jobSlice.reducer