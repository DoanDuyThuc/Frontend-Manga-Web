import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    truyenPanigate: {
        page: 1,
        totalPages: 5,
        totalItems: 0,
    },

    limit: 5,
    truyens: [],
}

export const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        setAuthorTruyens: (state, action) => {
            state.truyens = action.payload.data;
            state.truyenPanigate.page = action.payload.page;
            state.truyenPanigate.totalPages = action.payload.totalPages;
            state.truyenPanigate.totalItems = action.payload.totalTruyens

        },
        setAuthorPanigateTruyen: (state, action) => {
            state.truyenPanigate.page = action.payload;
        },


    },
})

export const { setAuthorTruyens, setAuthorPanigateTruyen } = authorSlice.actions

export default authorSlice.reducer