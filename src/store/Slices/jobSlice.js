import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    all: JSON.parse(localStorage.getItem('jobs')) ?? [],
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
        jobInsert: (state, action) => {
            state.all.unshift(action.payload);
            localStorage.setItem('jobs', JSON.stringify(state.all));
        },
        jobUpdate: (state, action) => {
            const index = action.payload.id;
            state.all[index] = action.payload;
            localStorage.setItem('jobs', JSON.stringify(state.all));
        },
        jobSelect: (state, action) => {
            state.editSelect = action.payload;
        },
        jobDelete: (state, {payload}) => {
            state.all = state.all.filter((job, index) => index !== payload);
            localStorage.setItem('jobs', JSON.stringify(state.all));
        },
    }
})

export const { jobInsert, jobUpdate, jobDelete, jobSelect, jobLoad } = jobSlice.actions

export default jobSlice.reducer