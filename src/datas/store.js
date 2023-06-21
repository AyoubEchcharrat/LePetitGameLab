import { configureStore } from "@reduxjs/toolkit";
import marathonReducer from "../features/marathonSlice";
import findateSlice from "../features/findateSlice";

export const store = configureStore({
    reducer: {
        marathon: marathonReducer,
        findate: findateSlice
    }
})