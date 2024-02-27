"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface RootState {
    taskManager: {
        inProgress: TaskType[];
        completed: TaskType[];
    };
}

interface TaskType {
    id: number | string;
    task?: string;
    endTime?: Date | string;
    status?: number
}


const initialState: {
    inProgress: TaskType[];
    completed: TaskType[];
} = {
    inProgress: [],
    completed: []
};


export const taskSlice = createSlice({
    name: "taskManager",
    initialState: initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.inProgress.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<TaskType>) => {
            const { id, status } = action.payload;
            if (status === 1) {
                state.inProgress = state.inProgress.filter((task) => task.id !== id);
            } else if (status === 0) {
                state.completed = state.completed.filter((task) => task.id !== id);
            }
        },
        editTask: (state, action: PayloadAction<TaskType>) => {
            const { id, task ,endTime} = action.payload;
            const taskIndex = state.inProgress.findIndex((data) => data.id === id);
            if (taskIndex !== -1) {
                state.inProgress[taskIndex] = {
                    ...state.inProgress[taskIndex],
                    task,
                    endTime
                };
            }
        },
        taskCompleted: (state, action: PayloadAction<TaskType>) => {
            const { id, status } = action.payload;
            const taskDoneIndex = state.inProgress.findIndex((task) => task.id === id);
            if (taskDoneIndex !== -1) {
                const [removedTask] = state.inProgress.splice(taskDoneIndex, 1)
                state.completed.push(removedTask);
            }

        },


    },
});



export const { addTask, deleteTask, editTask, taskCompleted } = taskSlice.actions;

export default taskSlice.reducer