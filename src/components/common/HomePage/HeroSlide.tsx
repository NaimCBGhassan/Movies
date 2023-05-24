import { TMDB } from "../../../types/tmdb";
import { PlayArrow } from "@mui/icons-material";
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store/store";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { setGlobalLoading } from "../../../store/slice/globalLoading";
import { routesGen } from "../../../routes/routes";
import { uiConfigs } from "../../../configs/ui.config";
import CircularRate from "../CircularRate";
import * as MediaApi from "../../../store/api/media";
import { isErrorWithMessage } from "../../../utils/errorNarrowing";
import { backdropPath } from "../../../utils/tmdb.config";

const HeroSlide = ({ mediaType, mediaCategory }: Pick<TMDB, "mediaType" | "mediaCategory">) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const {
    data: dataList,
    error: listError,
    isFetching: fetchingList,
  } = MediaApi.useGetListQuery({ mediaType, mediaCategory, page: "1" });

  const { data: dataGenre, error: genteError, isFetching: fetchingGenre } = MediaApi.useGetGenreQuery({ mediaType });

  useEffect(() => {
    if (listError && isErrorWithMessage(listError)) toast.error(listError.message);
    if (genteError && isErrorWithMessage(genteError)) toast.error(genteError.message);

    dispatch(setGlobalLoading(fetchingList || fetchingGenre));
  }, [listError, genteError, fetchingList, fetchingGenre, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.constrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {dataList?.results.map((media, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${backdropPath(media.backdrop_path || media.poster_path)})`,
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode],
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                  width: { sm: "unset", md: "30%", lg: "40%" },
                }}
              >
                <Stack spacing={4} direction="column">
                  {/* title */}
                  <Typography variant="h4" fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }} fontWeight="700">
                    {"title" in media && media.title}
                    {"name" in media && media.name}
                  </Typography>
                  {/* title */}

                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rate */}
                    <CircularRate value={media.vote_average} />
                    {/* rate */}

                    <Divider orientation="vertical" />
                    {/* genres */}
                    {[...media.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="filled"
                        color="primary"
                        key={index}
                        label={
                          dataGenre?.genres.find((e) => e.id === genreId) &&
                          dataGenre?.genres.find((e) => e.id === genreId)?.name
                        }
                      />
                    ))}
                    {/* genres */}
                  </Stack>
                  {/* overview */}
                  <Typography variant="body1">{media.overview}</Typography>
                  {/* overview */}

                  {/* buttons */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrow />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, `${media.id}`)}
                  >
                    watch now
                  </Button>
                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
