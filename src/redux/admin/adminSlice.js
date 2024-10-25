import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userPanigate: {
        page: 1,
        totalPages: 5,
        totalItems: 0,
    },
    truyenPanigate: {
        page: 1,
        totalPages: 5,
        totalItems: 0,
    },
    theloaiPanigate: {
        page: 1,
        totalPages: 5,
        totalItems: 0,
    },
    limit: 5,
    users: [],
    truyens: [],
    theloais: [],
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.data.rows;
            state.userPanigate.page = action.payload.page;
            state.userPanigate.totalPages = action.payload.totalPages;
            state.userPanigate.totalItems = action.payload.totalAccounts;
        },
        setTruyens: (state, action) => {
            state.truyens = action.payload.data;
            state.truyenPanigate.page = action.payload.page;
            state.truyenPanigate.totalPages = action.payload.totalPages;
            state.truyenPanigate.totalItems = action.payload.totalTruyens

        },
        setTheloais: (state, action) => {
            state.theloais = action.payload.data;
            state.theloaiPanigate.page = action.payload.page;
            state.theloaiPanigate.totalPages = action.payload.totalPages;
            state.theloaiPanigate.totalItems = action.payload.totalTheloais;
        },
        setPanigateUser: (state, action) => {
            state.userPanigate.page = action.payload;
        },
        setPanigateTruyen: (state, action) => {
            state.truyenPanigate.page = action.payload;
        },
        setPanigateTheLoai: (state, action) => {
            state.theloaiPanigate.page = action.payload;
        }

    },
})

export const { setUsers, setPanigateUser, setTruyens, setPanigateTruyen, setTheloais, setPanigateTheLoai } = adminSlice.actions

export default adminSlice.reducer