import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { posterPath } from "../utils/tmdb.config";
import * as ReviewApi from "../store/api/review";
import Container from "../components/common/Container";
import { uiConfigs } from "../configs/ui.config";
import { setGlobalLoading } from "../store/slice/globalLoading";
import DeleteIcon from "@mui/icons-material/Delete";
import { routesGen } from "../routes/routes";
import { isErrorWithMessage } from "../utils/errorNarrowing";
import { Review } from "../types/review";

type Props = {
  review: Review;
  onRemoved: (id: string) => void;
};

const ReviewItem = ({ review, onRemoved }: Props) => {
  const [removeReview, { isLoading }] = ReviewApi.useDeleteReviewMutation();

  const onRemove = async () => {
    if (isLoading) return;

    const data = await removeReview({ id: review.id });

    if (data && isErrorWithMessage(data)) return toast.error(data.message);
    if (data) {
      toast.success("Remove review success");
      onRemoved(review.id);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 1,
        opacity: isLoading ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box sx={{ width: { xs: 0, md: "10%" } }}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <Box
            sx={{
              paddingTop: "160%",
              ...uiConfigs.style.backgroundImage(posterPath(review.mediaPoster)),
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Typography variant="h6" sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">{dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}</Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      <LoadingButton
        variant="contained"
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "10px" },
          marginTop: { xs: 2, md: 0 },
          width: "max-content",
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={isLoading}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </Box>
  );
};

const ReviewList = () => {
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useAppDispatch();

  const { data: reviews, isLoading, error } = ReviewApi.useGetReviewQuery();

  const skip = 2;

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));

    if (error && isErrorWithMessage(error)) toast.error(error.message);
    if (reviews) {
      setCount(reviews.length);
      setFilteredReviews(reviews.slice(0, skip));
    }
  }, [dispatch, error, reviews, isLoading]);

  const onLoadMore = () => {
    if (reviews) {
      setFilteredReviews(reviews.slice(0, (page + 1) * skip));
      setPage(page + 1);
    }
  };

  const onRemoved = (id: string) => {
    const newReviews = reviews?.filter((e) => e.id !== id);
    newReviews && setFilteredReviews(newReviews.slice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              />
            </Box>
          ))}
          {reviews && filteredReviews.length < reviews.length && <Button onClick={onLoadMore}>load more</Button>}
        </Stack>
      </Container>
    </Box>
  );
};

export default ReviewList;
