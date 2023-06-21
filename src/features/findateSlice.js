import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    ImageIndexs: [],
    index: 0,
    endOfGame: false,
    score: 0,
    playing: false,
    datesend: 2000,
    results: [],
}

const findateSlice = createSlice({
    name: 'findate',
    initialState,
    reducers: {
        setImageIndex: (state, { payload }) => {
            if (state.ImageIndexs.length <= 5) {
                state.ImageIndexs.push(payload)
            } else {
                state.endOfGame = true
            }
        },
        setPlaying: (state) => {
            state.playing = !state.playing
        },
        setdatesend: (state, { payload }) => {
            state.datesend = payload
        },
        setScore: (state, { payload }) => {
            state.score = state.score + Number(payload)
        },
        setIndex: (state) => {
            state.index = state.index + 1
        },
        setReset: (state) => {
            state.ImageIndexs = []
            state.index = 0
            state.endOfGame = false
            state.score = 0
            state.playing = false
            state.datesend = 2000
        },
        setResults: (state, { payload }) => {
            if (state.results.length === 5) {
                state.results = []
            }
            state.results.push(payload)
        },
        setDeleteOneIndex: (state, { payload }) => {
            state.ImageIndexs.splice(state.ImageIndexs.indexOf(payload), 1)
        }
    }
})

export default findateSlice.reducer

export const { setImageIndex } = findateSlice.actions
export const { setPlaying } = findateSlice.actions
export const { setdatesend } = findateSlice.actions
export const { setScore } = findateSlice.actions
export const { setIndex } = findateSlice.actions
export const { setReset } = findateSlice.actions
export const { setResults } = findateSlice.actions
export const { setDeleteOneIndex } = findateSlice.actions
