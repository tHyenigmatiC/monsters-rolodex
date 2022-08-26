import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// reducers
import monstersReducer from './monstersSlice';
import searchReducer from './searchSlice';

export const setupStore = (preloadedState, isTesting = false) => {
    return configureStore({
        reducer: {
            monsters: monstersReducer,
            search: searchReducer
        },
        middleware: getDefaultMiddleware => 
            isTesting ? getDefaultMiddleware() : getDefaultMiddleware().concat(logger),
        preloadedState
    });
}