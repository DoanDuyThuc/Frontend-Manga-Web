import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    truyenPanigate: {
        page: 1,
        totalPages: 5,
        totalItems: 0,
    },
    searchTruyen: '',
    limit: 42,
    truyens: [],
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setHomeTruyens: (state, action) => {
            state.truyens = action.payload.data;
            state.truyenPanigate.page = action.payload.page;
            state.truyenPanigate.totalPages = action.payload.totalPages;
            state.truyenPanigate.totalItems = action.payload.totalTruyens

        },
        setHomePanigateTruyen: (state, action) => {
            state.truyenPanigate.page = action.payload;
        },
        setSearchTruyen: (state, action) => {
            state.searchTruyen = action.payload;
        },
    },
})

export const { setHomePanigateTruyen, setHomeTruyens, setSearchTruyen } = homeSlice.actions

export default homeSlice.reducer