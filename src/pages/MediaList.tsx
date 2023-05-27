import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useAppDispatch } from "../store/store";
import { useParams } from "react-router-dom";
import * as MediaApi from "../store/api/media";
import { uiConfigs } from "../configs/ui.config";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../store/slice/appStateSlice";
import { setGlobalLoading } from "../store/slice/globalLoading";
import { toast } from "react-toastify";
import usePrevious from "../hooks/usePrevious";
import { TMDB } from "../types/tmdb";
import { isErrorWithMessage } from "../utils/errorNarrowing";
import { MovieResult } from "../types/movie";
import { TvSerieResult } from "../types/tv";

const MediaList = () => {
  const { mediaType } = useParams() as Pick<TMDB, "mediaType">;

  const [medias, setMedias] = useState<(MovieResult | TvSerieResult)[]>([]);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType);
  const dispatch = useAppDispatch();

  const mediaCategories = useMemo(() => ["popular", "top_rated"] as const, []);
  const category = ["popular", "top rated"];

  const { data, isLoading, error } = MediaApi.useGetListQuery({
    mediaType,
    mediaCategory: mediaCategories[currCategory],
    page: currPage.toString(),
  });

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    if (currPage === 1) dispatch(setGlobalLoading(true));

    dispatch(setGlobalLoading(false));

    if (error && isErrorWithMessage(error)) toast.error(error.message);
    if (data) {
      if (currPage !== 1) setMedias((m) => [...m, ...data.results]);
      else setMedias([...data.results]);
    }

    if (mediaType !== prevMediaType) {
      setCurrCategory(0);
      setCurrPage(1);
    }
  }, [data, error, mediaType, prevMediaType, currPage, dispatch]);

  const onCategoryChange = (categoryIndex: number) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currCategory]} />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === "movie" ? "Movies" : "TV Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  color: currCategory === index ? "primary.contrastText" : "text.primary",
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />
        <LoadingButton sx={{ marginTop: 8 }} fullWidth color="primary" loading={isLoading} onClick={onLoadMore}>
          load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
