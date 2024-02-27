"use client"

import { combineReducers , configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/tasks/tasksSlice";

const rootReducer = combineReducers({
    taskManager: tasksSlice
})

export const store = configureStore({
    reducer:rootReducer
})