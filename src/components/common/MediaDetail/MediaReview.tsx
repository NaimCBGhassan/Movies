import dayjs from "dayjs";
import { toast } from "react-toastify";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store/store";

import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { Delete, SendOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import * as ReviewApi from "../../../store/api/review";
import { isErrorWithMessage } from "../../../utils/errorNarrowing";
import TextAvatar from "./TextAvatar";
import Container from "../Container";
import { isReviewType } from "../../../utils/narrowingTypes";
import { ReviewPopulate } from "../../../types/review";

import { MoviesID } from "../../../types/movie";
import { TvID } from "../../../types/tv";

type Props1 = {
  reviews: ReviewPopulate[];
  media: MoviesID | TvID;
  mediaType: string;
};
type Props2 = {
  review: ReviewPopulate;
  onRemoved: (id: string) => void;
};

const ReviewItem = ({ review, onRemoved }: Props2) => {
  const { user } = useAppSelector((state) => state.user);
  const [removeReviewApi, { isLoading: deleteIsLoading }] = ReviewApi.useDeleteReviewMutation();

  const onRemove = async () => {
    if (deleteIsLoading) return;

    const res = await removeReviewApi({ id: review.id });

    if (isErrorWithMessage(res)) return toast.error(res.message);
    if (res) onRemoved(review.id);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: deleteIsLoading ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        <TextAvatar text={review.userId?.displayName} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.userId?.displayName}
            </Typography>
            <Typography variant="caption">{dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}</Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.user.id === review.userId.id && (
            <LoadingButton
              variant="contained"
              startIcon={<Delete />}
              loadingPosition="start"
              loading={deleteIsLoading}
              onClick={onRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
              }}
            >
              remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }: Props1) => {
  const { user } = useAppSelector((state) => state.user);
  const [addReviewApi, { isLoading }] = ReviewApi.useAddReviewMutation();

  const [listReviews, setListReviews] = useState<ReviewPopulate[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewPopulate[]>([]);
  const [page, setPage] = useState(1);

  const content: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const [reviewCount, setReviewCount] = useState(0);

  const skip = 4;

  useEffect(() => {
    setFilteredReviews([...reviews].slice(0, skip));
    setListReviews([...reviews]);
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (isLoading) return;

    const body = {
      content: (content.current?.childNodes[0].childNodes[0] as HTMLTextAreaElement).value || "",
      mediaId: media.id.toString(),
      mediaType,
      mediaTitle: (media as MoviesID).title || (media as TvID).name,
      mediaPoster: media.poster_path,
    };

    const res = await addReviewApi(body);

    if ("error" in res && isErrorWithMessage(res.error)) return toast.error(res.error.message);
    if (isReviewType(res)) {
      toast.success("Post review success");

      setFilteredReviews([...filteredReviews, res.data]);
      setReviewCount(reviewCount + 1);
      (content.current?.childNodes[0].childNodes[0] as HTMLTextAreaElement).value = "";
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([...filteredReviews, ...[...listReviews].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id: string) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);

    toast.success("Remove review success");
  };

  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        {/* All Reviews */}
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.length > 0 &&
            filteredReviews.map((item) =>
              item.userId ? (
                <Box key={item.id}>
                  <ReviewItem review={item} onRemoved={onRemoved} />
                  <Divider
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  />
                </Box>
              ) : null
            )}
          {filteredReviews.length < listReviews.length && <Button onClick={onLoadMore}>load more</Button>}
        </Stack>
        {/* All Reviews */}
        {/* Box to make review */}
        {user ? (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              <TextAvatar text={user.user.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.user.displayName}
                </Typography>
                <TextField ref={content} multiline rows={4} placeholder="Write your review" variant="outlined" />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlined />}
                  loadingPosition="start"
                  loading={isLoading}
                  onClick={onAddReview}
                >
                  post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        ) : (
          <></>
        )}
        {/* Box to make review */}
      </Container>
    </>
  );
};

export default MediaReview;
