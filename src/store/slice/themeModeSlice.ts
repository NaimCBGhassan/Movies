import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  theme: "dark" | "light";
}

const initialState = {
  theme: "dark",
} as InitialState;

export const themeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
