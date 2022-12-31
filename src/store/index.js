import { configureStore } from '@reduxjs/toolkit'
import job from './Slices/jobSlice'
import priority from "./Slices/prioritySlice";
import filter from "./Slices/filterSlice"

export default configureStore({
    reducer: { job, priority, filter}
})