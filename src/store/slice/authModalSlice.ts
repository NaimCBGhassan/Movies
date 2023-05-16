import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  authModal: boolean;
}

const initialState = {
  authModal: false,
} as InitialState;

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState,
  reducers: {
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.authModal = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;
