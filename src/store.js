import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import { searchRobots, requestRobots } from "./reducer";

const rootReducer = () => ({
    searchRobots,
    requestRobots 
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [ ...getDefaultMiddleware(), reduxLogger, reduxThunk]
});
