import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  globalLoading: boolean;
}

const initialState = {
  globalLoading: false,
} as InitialState;

export const globalLoadingSlice = createSlice({
  name: "AuthModal",
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;
