import { Favorite, FavoriteBorderOutlined, PlayArrow } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/DetailsPage/ImageHeader";
import { uiConfigs } from "../configs/ui.config";
import * as MediaApi from "../store/api/media";
import * as FavoriteApi from "../store/api/favorite";
import { TMDB } from "../types/tmdb";
import { setGlobalLoading } from "../store/slice/globalLoading";
import { setAuthModalOpen } from "../store/slice/authModalSlice";
import { addFavorite, removeFavorite } from "../store/slice/userSlice";
import { isErrorWithMessage } from "../utils/errorNarrowing";
import { MoviesID } from "../types/movie";
import { TvID } from "../types/tv";
import { backdropPath, posterPath } from "../utils/tmdb.config";
import CastSlide from "../components/common/DetailsPage/CastSlide";
import { isFavoriteType } from "../utils/narrowingTypes";
import MediaVideoSlide from "../components/common/DetailsPage/MediaVideoSlide";
import BackdropSlide from "../components/common/DetailsPage/BackdropSlide";
import PosterSlide from "../components/common/DetailsPage/PosterSlide";
import RecommendSlide from "../components/common/DetailsPage/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/DetailsPage/MediaReview";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams() as Pick<TMDB, "mediaType" | "mediaId">;

  const { user, listFavorites } = useAppSelector((state) => state.user);

  const {
    data: mediaData,
    isFetching: mediaIsLoading,
    error: mediaError,
  } = MediaApi.useGetDetailQuery({ mediaType, mediaId });

  const [addFavoriteApi, { isLoading: addFavoriteLoading }] = FavoriteApi.useAddFavoriteMutation();
  const [removeFavoriteApi, { isLoading: removeFavoriteLoading }] = FavoriteApi.useDeleteFavoriteMutation();

  const [genres, setGenres] = useState<(MoviesID["genres"][number] | TvID["genres"][number])[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false);

  const dispatch = useAppDispatch();

  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setGlobalLoading(mediaIsLoading));

    if (mediaData) {
      const genresCopy = [...mediaData.genres];
      setGenres(genresCopy.splice(0, 2));
      setIsFavorite(mediaData.isFavorite);
    }

    if (mediaError && isErrorWithMessage(mediaError)) toast.error(mediaError.message);
  }, [mediaIsLoading, mediaError, mediaData, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));
    if (mediaData) {
      if (isFavorite) {
        const favorite = listFavorites.find((el) => el.mediaId === mediaData.id.toString());
        const removeRes = favorite && (await removeFavoriteApi({ id: favorite.id }));

        if (isErrorWithMessage(removeRes)) return toast.error(removeRes.message);

        setIsFavorite(false);
        favorite && dispatch(removeFavorite({ mediaId: favorite.mediaId }));
        toast.success("Removed favorite");
      }

      const body = {
        mediaType: mediaType,
        mediaId: mediaData.id.toString(),
        mediaTitle: (mediaData as MoviesID).title || (mediaData as TvID).name,
        mediaPoster: mediaData.poster_path,
        mediaRate: mediaData.vote_average,
      };

      if (!isFavorite) {
        const addRes = await addFavoriteApi(body);
        if (isErrorWithMessage(addRes)) return toast.error(addRes.message);

        setIsFavorite(true);
        if (isFavoriteType(addRes)) dispatch(addFavorite(addRes.data));
        toast.success("Added favorite");
      }
    }
  };

  return mediaData ? (
    <>
      <ImageHeader imgPath={backdropPath(mediaData.backdrop_path || mediaData.poster_path)} />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", ld: "-20rem" } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* poster */}
            <Box sx={{ width: { xs: "70%", sm: "50%", md: "40%" }, margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" } }}>
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(posterPath(mediaData.poster_path || mediaData.backdrop_path)),
                }}
              />
            </Box>
            {/* poster */}
            {/* media info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography variant="h4" fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }} fontWeight="700">{`${
                  (mediaData as MoviesID).title || (mediaData as TvID).name
                } ${
                  mediaType === "movie"
                    ? (mediaData as MoviesID).release_date.split("-")[0]
                    : (mediaData as TvID).first_air_date.split("-")[0]
                }`}</Typography>
                {/* title */}
                {/* rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* rate */}
                  <CircularRate value={mediaData.vote_average} />
                  {/* rate */}
                  <Divider orientation="vertical" />
                  {/* genres */}
                  {genres.map((genre, index) => (
                    <Chip label={genre.name} variant="filled" color="primary" key={index} />
                  ))}
                  {/* genres */}
                </Stack>
                {/* rate and genres */}

                {/* overview */}
                <Typography variant="body1"> {mediaData.overview}</Typography>
                {/* overview */}
                {/* buttons */}
                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButon-starIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
                    loadingPosition="start"
                    loading={addFavoriteLoading || removeFavoriteLoading}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      width: "max-content",
                    }}
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={() => videoRef.current?.scrollIntoView()}
                  >
                    watch now
                  </Button>
                </Stack>
                {/* buttons */}

                {/* cast */}
                <Container header="cast">
                  <CastSlide casts={mediaData.credits?.cast} />
                </Container>
                {/* cast */}
              </Stack>
            </Box>
            {/* madie info */}
          </Box>
        </Box>
        {/* media content */}

        {/* media videos */}
        <div ref={videoRef} style={{ paddingTop: "2rem" }}>
          <Container header="Videos">
            {mediaData.videos && <MediaVideoSlide videos={mediaData.videos.results.slice(0, 4)} />}
          </Container>
        </div>
        {/* media videos */}
        {/* media backdrop */}
        {mediaData.images.backdrops.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={mediaData.images.backdrops} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {mediaData.images.posters.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={mediaData.images.posters} />
          </Container>
        )}
        {/* media posters */}
        {/* media reviews */}
        {mediaData.reviews && mediaData.reviews.length > 0 && (
          <Container header="reviews">
            <MediaReview reviews={mediaData.reviews} media={mediaData} mediaType={mediaType} />
          </Container>
        )}
        {/* media reviews */}
        {/* media recommendation */}
        <Container header="you may also like">
          {mediaData.recommend && mediaData.recommend.length > 0 ? (
            <RecommendSlide medias={mediaData.recommend} mediaType={mediaType} />
          ) : (
            <MediaSlide mediaCategory="top_rated" mediaType={mediaType} />
          )}
        </Container>
        {/* media recommendation */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
