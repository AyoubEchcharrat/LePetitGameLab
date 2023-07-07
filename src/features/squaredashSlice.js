import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    gameOver: false,
    isReseting: false,
    playerRef: {
        positionX: 0,
        positionY: 0,
        velocityY: 0,
        isJumping: false,
        jumpHeight: 80,
        jumpSpeed: 0.1,
        gravity: 0.2,
        size: 50,
    },
    obstacleRef: {
        positionX: 800,
        positionY: 0,
        width: 50,
        height: 50,
        speed: 5,
    }
}

const squaredashSlice = createSlice({
    name: 'squaredash',
    initialState,
    reducers: {
        setIsReseting: (state, { payload }) => {
            state.gameOver = payload
        },
        setGameOver: (state, { payload }) => {
            state.gameOver = payload
        },
        setIsJumping: (state, { payload }) => {
            state.playerRef.isJumping = payload
            state.playerRef.velocityY = state.playerRef.jumpSpeed * state.playerRef.jumpHeight
        },
        setPosition: (state) => {
            state.playerRef.positionY += state.playerRef.velocityY;
        },
        setTouchGround: (state) => {
            state.playerRef.positionY = 0;
            state.playerRef.velocityY = 0;
            state.playerRef.isJumping = false;
        }
    }
})

export default squaredashSlice.reducer

export const { setIsReseting } = squaredashSlice.actions
export const { setGameOver } = squaredashSlice.actions
export const { setIsJumping } = squaredashSlice.actions
export const { setPosition } = squaredashSlice.actions
export const { setTouchGround } = squaredashSlice.actions
