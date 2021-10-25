import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMenuState {
  isOpen: boolean;
}

export const initialState: IMenuState = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setIsOpen, toggle } = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
