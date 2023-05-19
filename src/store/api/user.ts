import { Body, UpdatedPassword, User, UserData, UserRegister } from "../../types/user";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, UserRegister>({
      query: (body) => ({ url: "/user/signup", method: "POST", body }),
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),
    login: builder.mutation<User, Body>({
      query: (body) => ({ url: "/user/signin", method: "POST", body }),
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),
    updatePassword: builder.mutation<User, Omit<UpdatedPassword, "username">>({
      query: (body) => ({ url: "/user/updatePassword", method: "PUT", body }),
    }),
    getUser: builder.query<UserData, void>({
      query: () => "/user/getinfo",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useUpdatePasswordMutation, useGetUserQuery } = userApi;
