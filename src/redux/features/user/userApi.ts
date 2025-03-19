import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (params) => ({
        url: "users",
        method: "GET",
        params: params, // Pass query params for pagination, sorting, etc.
      }),
    }),
    blockUser: build.mutation({
      query: (userId) => ({
        url: `users/${userId}/block`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation } = userApi;
