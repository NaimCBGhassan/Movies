import { api } from "./api";
import { Review } from "../../types/review";

export const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    addReview: build.mutation<Review, Omit<Review, "userId" | "id">>({
      query: (body) => ({
        url: `/review/${body.mediaId}`,
        method: "POST",
        body,
      }),
    }),
    getReview: build.query<Review[], void>({
      query: () => `/review`,
    }),
    deleteReview: build.mutation<{ message: string }, Pick<Review, "id">>({
      query: ({ id }) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddReviewMutation, useDeleteReviewMutation, useGetReviewQuery } = reviewApi;
