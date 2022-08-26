import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// reducers
import monstersReducer from './monstersSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        monsters: monstersReducer,
        search: searchReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});