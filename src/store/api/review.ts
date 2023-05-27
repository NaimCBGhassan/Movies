import { api } from "./api";
import { Review, ReviewPopulate } from "../../types/review";

export const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    addReview: build.mutation<ReviewPopulate, Omit<Review, "userId" | "id" | "createdAt">>({
      query: (body) => ({
        url: `/review/${body.mediaId}`,
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => {
        return error.data;
      },
      invalidatesTags: ["Reviews"],
    }),
    getReview: build.query<Review[], void>({
      query: () => `/review`,
      providesTags: ["Reviews"],
    }),
    deleteReview: build.mutation<{ message: string }, Pick<Review, "id">>({
      query: ({ id }) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (error) => {
        console.log(error);
        return error.data;
      },
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const { useAddReviewMutation, useDeleteReviewMutation, useGetReviewQuery } = reviewApi;
