import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isPlaying: false,
    time: 15,
    gameMode: 'normal',
    lose: false,
    flagOne: '',
    flagTwo: '',
    find: '',
    score: 0,
}

const marathonSlice = createSlice({
    name: 'marthon',
    initialState,
    reducers: {
        setIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying
            state.lose = false
            state.score = 0
            state.flagOne = ''
            state.flagTwo = ''
        },
        setTime: (state, { payload }) => {
            state.time = payload.time
            state.gameMode = payload.mode
        },
        Timer: (state, { payload }) => {
            state.time = payload
            if (state.time === 0) {
                state.lose = true
            }
        },
        setLose: (state) => {
            state.lose = true
            state.isPlaying = false
        },
        ResetingTimer: (state) => {
            if (state.gameMode === 'easy') {
                state.time = 30
            } else if (state.gameMode === 'normal') {
                state.time = 15
            } else if (state.gameMode === 'hard') {
                state.time = 7
            } else if (state.gameMode === 'legendary') {
                state.time = 3
            }
        },
        ResetingGame: (state) => {
            state.lose = false
            state.isPlaying = false
            if (state.gameMode === 'easy') {
                state.time = 30
            } else if (state.gameMode === 'normal') {
                state.time = 15
            } else if (state.gameMode === 'hard') {
                state.time = 7
            } else if (state.gameMode === 'legendary') {
                state.time = 3
            }
            state.flagOne = ''
            state.flagTwo = ''
            state.score = 0
        },
        setCurrent: (state, { payload }) => {
            console.log("payload", payload)
            if (payload.flagNumber === 1) {
                state.flagOne = payload
            } else {
                state.flagTwo = payload
            }
        },
        setFind: (state, { payload }) => {
            state.find = payload
        },
        setScore: (state) => {
            state.flagOne = ''
            state.flagTwo = ''
            state.score = state.score + 1
        }
    }
})

export default marathonSlice.reducer

export const { setIsPlaying } = marathonSlice.actions
export const { setTime } = marathonSlice.actions
export const { Timer } = marathonSlice.actions
export const { setLose } = marathonSlice.actions
export const { ResetingTimer } = marathonSlice.actions
export const { ResetingGame } = marathonSlice.actions
export const { setCurrent } = marathonSlice.actions
export const { setFind } = marathonSlice.actions
export const { setScore } = marathonSlice.actions