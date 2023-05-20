import { PlayArrow, Favorite } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uiConfigs } from "../../configs/ui.config";
import { routesGen } from "../../routes/routes";
import CircularRate from "./CircularRate";
import { useAppSelector } from "../../store/store";
import { favoriteUtils } from "../../utils/favorite.utils";
import { Movies } from "../../types/movie";
import { TvSeries } from "../../types/tv";
import { TMDB } from "../../types/tmdb";

type Props = {
  media: Pick<Movies, "results"> | Pick<TvSeries, "results">;
  mediaType: Pick<TMDB, "mediaType">;
};

const MediaItem = ({ media, mediaType }: Props) => {
  const { listFavorites } = useAppSelector((state) => state.user);

  /*  useEffect(() => {}, [media, mediaType]); */

  return <Link to="/">{/* FIXING THIS */}</Link>;
};

export default MediaItem;
