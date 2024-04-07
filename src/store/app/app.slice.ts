import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  isModalOpen: false,
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
    closeModal(state) {
      state.isModalOpen = false;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
  },
});

export const { toggleMenu, closeMenu, closeModal, openModal } =
  appSlice.actions;

export default appSlice.reducer;
