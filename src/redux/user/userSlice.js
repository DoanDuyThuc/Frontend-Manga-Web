import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: '',
    username: '',
    avatar: null,
    email: '',
    role: '',
    point: 0,
    token: '',
    isLogin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.isLogin = true;
            state.userId = action.payload?.id;
            state.username = action.payload?.username;
            state.email = action.payload?.email;
            state.role = action.payload?.role;
            state.point = action.payload?.point;
            state.avatar = action.payload?.avatar;
            state.token = action.payload?.token;
        },
        clearUser: (state) => {
            state.isLogin = false;
            state.userId = '';
            state.username = '';
            state.email = '';
            state.role = '';
            state.point = 0;
            state.avatar = null;
            state.token = '';
        },
        refreshToken: (state, action) => {
            state.token = action.payload
        }
    },
})

export const { setUserId, clearUser, refreshToken } = userSlice.actions

export default userSlice.reducer