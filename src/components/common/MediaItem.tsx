import { PlayArrow, Favorite } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uiConfigs } from "../../configs/ui.config";
import { routesGen } from "../../routes/routes";
import CircularRate from "./CircularRate";
import { useAppSelector } from "../../store/store";
import { favoriteUtils } from "../../utils/favorite.utils";
import { MovieResult } from "../../types/movie";
import { TvSerieResult } from "../../types/tv";
import { TMDB } from "../../types/tmdb";
import * as tmdbConfig from "../../utils/tmdb.config";
import { isFavorite, isMovie, isTvSerie } from "../../utils/narrowingTypes";
import { Cast } from "../../types/person";
import { Favorite as FavoriteType } from "../../types/favorite";

type Props = {
  media: MovieResult | TvSerieResult | Cast | FavoriteType;
  mediaType: TMDB["mediaType"];
};

const MediaItem = ({ media, mediaType }: Props) => {
  const { listFavorites } = useAppSelector((state) => state.user);

  const [title, setTitle] = useState<string | undefined>("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState<string | null | undefined>(null);
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    if (isMovie(media)) {
      setTitle(media.title);
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    }
    if (isTvSerie(media)) {
      setTitle(media.name);
      setReleaseDate(media.first_air_date && media.first_air_date.split("-")[0]);
    }
    if (isMovie(media) || isTvSerie(media)) {
      setRate(media.vote_average);
      setPosterPath(tmdbConfig.posterPath(media.poster_path || media.backdrop_path));
    }

    if (isFavorite(media)) {
      setTitle(media.mediaTitle);
      setRate(media.mediaRate);
      setPosterPath(tmdbConfig.posterPath(media.mediaPoster));
    }
  }, [media, mediaType]);

  return (
    <Link
      to={mediaType !== "people" ? routesGen.mediaDetail(mediaType, `${media.id}`) : routesGen.person(`${media.id}`)}
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: "160%",
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "primary.contrastText",
        }}
      >
        {/* movie or tv item */}
        {mediaType !== "people" && (
          <>
            {favoriteUtils.check({ listFavorites, mediaId: +media.id.toString() }) && (
              <Favorite
                color="primary"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  fontSize: "2rem",
                }}
              />
            )}
            <Box
              className="media-back-drop"
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
              }}
            />
            <Button
              className="media-play-btn"
              variant="contained"
              startIcon={<PlayArrow />}
              sx={{
                display: { xs: "none", md: "flex" },
                opacity: 0,
                transition: "all 0.3s ease",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                "& .MuiButton-startIcon": { marginRight: "-4px" },
              }}
            />
            <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
                padding: { xs: "10px", md: "2rem 1rem" },
              }}
            >
              <Stack spacing={{ xs: 1, md: 2 }}>
                {rate && <CircularRate value={rate} />}
                <Typography>{releaseDate}</Typography>
                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{
                    fontSize: "1rem",
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
          </>
        )}
        {/* movie or tv item */}

        {/* people */}
        {/* {mediaType === "people" && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "max-content",
              bottom: 0,
              padding: "10px",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Typography>{media.name}</Typography>
          </Box>
        )} */}
        {/* people */}
      </Box>
    </Link>
  );
};

export default MediaItem;
