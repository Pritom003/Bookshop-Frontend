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
    getMyProfile: build.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
    }),
    updateMyProfile: build.mutation({
      query: (formData) => ({
        url: `profile`,
        method: "POST",
        body: formData,
      }),
    }),
    
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation,useGetMyProfileQuery,useUpdateMyProfileMutation } = userApi;
