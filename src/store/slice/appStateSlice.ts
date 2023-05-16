import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  appState: string;
}

const initialState = {
  appState: "",
} as InitialState;

export const appStateSlice = createSlice({
  name: "AppState",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
  },
});

export const { setAppState } = appStateSlice.actions;
