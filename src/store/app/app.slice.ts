import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ServerError = {
  isError: boolean;
  message: string;
};

const DEFAULT_ERROR: ServerError = {
  isError: false,
  message: "",
};

const initialState = {
  isMenuOpen: false,
  isModalOpen: false,
  nextMatch: 1718388000000,
  serverError: DEFAULT_ERROR,
};

interface Payload {
  ERRORFIELD?: string;
}

const redirectHandle = (
  state: { serverError: ServerError },
  { payload }: PayloadAction<Payload>,
) => {
  if (payload.ERRORFIELD === "TOKEN") {
    state.serverError = {
      isError: true,
      message: "Access token error",
    };
  }
};

const serverErrHandle = (
  state: { serverError: { isError: boolean; message: string } },
  { payload }: { payload: FetchBaseQueryError | undefined },
) => {
  console.log(payload);
  state.serverError = {
    isError: true,
    message: "Server error",
  };
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
    removeServerError(state) {
      state.serverError = DEFAULT_ERROR;
    },
    setServerError(state, { payload }: { payload: ServerError }) {
      state.serverError = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.user.matchFulfilled, redirectHandle);
    builder.addMatcher(apiSlice.endpoints.user.matchRejected, serverErrHandle);
  },
});

export const {
  toggleMenu,
  closeMenu,
  closeModal,
  openModal,
  setServerError,
  removeServerError,
} = appSlice.actions;

export default appSlice.reducer;
