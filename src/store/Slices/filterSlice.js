import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    priority: ''
}
export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setFilterAction: (state, action) => {
            state.name = action.payload.name;
            state.priority = action.payload.priority;
        }
    }
})

export const { setFilterAction } = filterSlice.actions

export default filterSlice.reducer