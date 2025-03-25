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
    
    makeAdmin: build.mutation({
      query: (userId) => ({
        url: `users/${userId}/make-admin`,
        method: "PATCH",
      }),
    }),
    removeAdmin: build.mutation({
      query: (userId) => ({
        url: `users/${userId}/remove-admin`,
        method: "PATCH",
      }),
    }),
    deleteUser: build.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
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

export const { useGetAllUsersQuery, useBlockUserMutation,useGetMyProfileQuery,useUpdateMyProfileMutation ,  useMakeAdminMutation,
  useRemoveAdminMutation,
  useDeleteUserMutation,} = userApi;
