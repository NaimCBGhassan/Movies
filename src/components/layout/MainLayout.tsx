import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import * as UserApi from "../../store/api/user";
import * as FavoriteApi from "../../store/api/favorite";
import { setListFavorites, setUser } from "../../store/slice/userSlice";

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const { data: userData, isError: userError } = UserApi.useGetUserQuery();
  const { data: favoriteData, isError: favoriteError } = FavoriteApi.useGetFavoriteQuery();

  useEffect(() => {
    const token = localStorage.getItem("actkn");

    if (userData && token) {
      dispatch(setUser({ token, user: userData }));
    }

    if (userError) dispatch(setUser(null));
  }, [userData, dispatch, userError]);

  useEffect(() => {
    const token = localStorage.getItem("actkn");

    if (favoriteData && token) {
      dispatch(setListFavorites(favoriteData));
    }

    if (favoriteError) dispatch(setListFavorites([]));
  }, [favoriteData, dispatch, favoriteError]);

  return (
    <>
      {/** global loading */}
      <GlobalLoading />
      {/** global loading */}
      {/* login modal */}
      <AuthModal />
      {/* login modal */}
      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}
        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>
      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;
