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
  isRoomSelectorOpen: false,
  nextMatch: 1718388000000,
  serverError: DEFAULT_ERROR,
};

interface Payload {
  MESSAGE: string;
  ERRORFIELD?: string;
}

const redirectHandle = (
  state: { serverError: ServerError },
  { payload }: PayloadAction<Payload>,
) => {
  if (payload.ERRORFIELD === "TOKEN") {
    state.serverError = {
      isError: true,
      message: "",
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
    toggleRoomSelector(state) {
      state.isRoomSelectorOpen = !state.isRoomSelectorOpen;
    },
    closeRoomSelector(state) {
      state.isRoomSelectorOpen = false;
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
    builder.addMatcher(
      apiSlice.endpoints.getNextMatches.matchFulfilled,
      redirectHandle,
    );
    builder.addMatcher(
      apiSlice.endpoints.getNextMatches.matchRejected,
      serverErrHandle,
    );
    builder.addMatcher(
      apiSlice.endpoints.totalScore.matchFulfilled,
      redirectHandle,
    );
    builder.addMatcher(
      apiSlice.endpoints.totalScore.matchRejected,
      serverErrHandle,
    );
  },
});

export const {
  toggleMenu,
  closeMenu,
  closeModal,
  openModal,
  setServerError,
  removeServerError,
  toggleRoomSelector,
  closeRoomSelector,
} = appSlice.actions;

export default appSlice.reducer;
