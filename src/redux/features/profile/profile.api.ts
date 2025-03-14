import { baseApi } from "../../api/baseApi";



const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;