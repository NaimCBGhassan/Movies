import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Favorite } from "../../types/favorite";
import { User } from "../../types/user";
import { TMDB } from "../../types/tmdb";
import { toast } from "react-toastify";

interface InitialState {
  user: User | null;
  listFavorites: Favorite[];
}

const initialState = {
  user: null,
  listFavorites: [],
} as InitialState;

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
        toast.success("Sign out success");
      } else {
        if (localStorage.getItem("actkn") === null) toast.success("Sign in success");
        if (action.payload.token) localStorage.setItem("actkn", action.payload.token);
      }
      state.user = action.payload;
    },
    setListFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action: PayloadAction<Pick<TMDB, "mediaId">>) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter((e) => e.mediaId.toString() !== mediaId.toString());
    },
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { addFavorite, removeFavorite, setListFavorites, setUser } = userSlice.actions;
