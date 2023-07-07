import { configureStore } from "@reduxjs/toolkit";
import marathonReducer from "../features/marathonSlice";
import findateSlice from "../features/findateSlice";
import squaredashSlice from "../features/squaredashSlice";

export const store = configureStore({
    reducer: {
        marathon: marathonReducer,
        findate: findateSlice,
        squaredash: squaredashSlice
    }
})