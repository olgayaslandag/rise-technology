import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    all: [
        {
            class: 'danger',
            name: 'Urgent'
        },
        {
            class: 'primary',
            name: 'Important'
        },
        {
            class: 'warning',
            name: 'Regular'
        }
    ]
}
export const prioritySlice = createSlice({
    name: 'prioritySlice',
    initialState,
    reducers: {}
})

export const {  } = prioritySlice.actions

export default prioritySlice.reducer