import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import { uiConfigs } from "../configs/ui.config";
import * as FavoriteApi from "../store/api/favorite";
import { setGlobalLoading } from "../store/slice/globalLoading";
import { removeFavorite } from "../store/slice/userSlice";
import { isErrorWithMessage } from "../utils/errorNarrowing";
import { Favorite } from "../types/favorite";
import { TMDB } from "../types/tmdb";

type Props = {
  onRemoved: (id: string) => void;
  media: Favorite;
};

const FavoriteItem = ({ media, onRemoved }: Props) => {
  const dispatch = useAppDispatch();

  const [removeFavoriteApi, { isLoading }] = FavoriteApi.useDeleteFavoriteMutation();

  const onRemove = async () => {
    if (isLoading) return;
    const data = await removeFavoriteApi({ id: media.id });

    if (data && isErrorWithMessage(data)) toast.error(data.message);
    if (data) {
      toast.success("Remove favorite success");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType as TMDB["mediaType"]} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={isLoading}
        disabled={isLoading}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </>
  );
};

const FavoriteList = () => {
  const [filteredMedias, setFilteredMedias] = useState<Favorite[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const { data: favoriteMedias, isLoading, error } = FavoriteApi.useGetFavoriteQuery();

  const dispatch = useAppDispatch();

  const skip = 8;

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));

    if (error && isErrorWithMessage(error)) toast.error(error.message);
    if (favoriteMedias) {
      setCount(favoriteMedias.length);
      setFilteredMedias(favoriteMedias.slice(0, skip));
    }
  }, [dispatch, isLoading, error, favoriteMedias]);

  const onLoadMore = () => {
    if (favoriteMedias) {
      setFilteredMedias(favoriteMedias.slice(0, (page + 1) * skip));
      setPage(page + 1);
    }
  };

  const onRemoved = (id: string) => {
    const newMedias = favoriteMedias?.filter((e) => e.id !== id);
    newMedias && setFilteredMedias(newMedias?.slice(0, page * skip));
    newMedias && setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {favoriteMedias && filteredMedias.length < favoriteMedias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
