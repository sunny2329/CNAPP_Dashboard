import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from '../Slices/dashboardSlice.js'

export const store = configureStore({
    reducer:{
        dashboardSlice,
    }
})