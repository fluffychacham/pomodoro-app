import { configureStore } from "@reduxjs/toolkit";
import { pomodoroReducer } from "../stores/PomodoroNavSlice";

export const store = configureStore({
  reducer: {
    pomodoroNav: pomodoroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
