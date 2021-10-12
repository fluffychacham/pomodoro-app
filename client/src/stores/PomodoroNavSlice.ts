import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum EPomodoroNav {
  POMODORO,
  SHORT_BREAK,
  LONG_BREAK,
}

export interface PomodoroNav {
  nav: EPomodoroNav;
}

export const initialState: PomodoroNav = {
  nav: EPomodoroNav.POMODORO,
};

export const pomodoroNavSlice = createSlice({
  name: "pomodoroNav",
  initialState,
  reducers: {
    setNav: (state, action: PayloadAction<EPomodoroNav>) => {
      state.nav = action.payload;
    },
  },
});

export const { setNav } = pomodoroNavSlice.actions;

export const pomodoroReducer = pomodoroNavSlice.reducer;
