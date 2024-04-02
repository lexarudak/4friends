import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  nextMatch: 1718388000000,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = appSlice.actions;

export default appSlice.reducer;
