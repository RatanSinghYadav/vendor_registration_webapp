import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux_toolkit/authSlice.js'

export const store = configureStore({
    reducer: authReducer,
});