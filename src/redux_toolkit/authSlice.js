import { createSlice } from "@reduxjs/toolkit";
import CheckUserRole from "./checkUserRole";

const initialState = {
    token: localStorage.getItem('token'),
    role: CheckUserRole()
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
        logout: (state, action) => {
            state.token = null,
                state.role = null,
                localStorage.clear()
        }
    }
})

export const { setToken, setRole, logout } = AuthSlice.actions;
export default AuthSlice.reducer