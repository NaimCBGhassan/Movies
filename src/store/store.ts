import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { api } from "./api/api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userSlice } from "./slice/userSlice";
import { themeSlice } from "./slice/themeModeSlice";
import { appStateSlice } from "./slice/appStateSlice";
import { authModalSlice } from "./slice/authModalSlice";
import { globalLoadingSlice } from "./slice/globalLoading";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
    appState: appStateSlice.reducer,
    authModal: authModalSlice.reducer,
    globalLoading: globalLoadingSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
