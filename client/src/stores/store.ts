import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "./MenuSlice";
import { pomodoroReducer } from "./PomodoroNavSlice";

export const store = configureStore({
  reducer: {
    pomodoroNav: pomodoroReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
