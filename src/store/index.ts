import {configureStore} from "@reduxjs/toolkit";

import VacancyReducer from './slices/VacancySlice.ts'

export const store = configureStore({
    reducer: {
        vacancy: VacancyReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;