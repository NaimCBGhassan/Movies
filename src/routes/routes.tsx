import { createBrowserRouter } from "react-router-dom";
import ProtectedPage from "../components/common/ProtectedPage";
import {
  HomePage,
  FavoriteList,
  MediaDetail,
  MediaList,
  MediaSearch,
  PasswordUpdate,
  PersonDetail,
  ReviewList,
} from "../pages";
import MainLayout from "../components/layout/MainLayout";
import PageWrapper from "../components/common/PageWrapper";

export const routesGen = {
  home: "/",
  mediaList: (type: string) => `/${type}`,
  mediaDetail: (type: string, id: string) => `/${type}/${id}`,
  mediaSearch: `/search`,
  person: (id: string) => `/person/${id}`,
  favoriteList: `/favorites`,
  reviewList: `/reviews`,
  passwordUpdate: `/password-update`,
};

const routesData = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "/person.detail",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },
  {
    path: "/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
];

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: routesData.map((route) =>
      route.index
        ? {
            index: route.index,
            element: route.state ? <PageWrapper state={route.state}>{route.element}</PageWrapper> : route.element,
          }
        : {
            path: route.path,
            element: route.state ? <PageWrapper state={route.state}>{route.element}</PageWrapper> : route.element,
          }
    ),
  },
]);
