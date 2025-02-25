import { baseApi } from "../../api/baseApi";




/* eslint-disable @typescript-eslint/no-explicit-any */
const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => ({
        url: "/products",
        method: "GET",
        params: query,
      }),
      //   providesTags: [tagTypes.product],
    }),
    getSingleProduct: builder.query({
      query: (query?: Record<string, any>) => ({
        url: "/products",
        method: "GET",
        params: query || {}, // Ensure it doesn't break if `query` is undefined
      }),
      
      //   providesTags: [tagTypes.product],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      //   invalidatesTags: [tagTypes.product],
    }),
    editProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
      //   invalidatesTags: [tagTypes.product],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      //   invalidatesTags: [tagTypes.product],
    }),
    getPriceRange: builder.query({
      query: () => ({
        url: "/products/price-range",
        method: "GET",
      }),
      //   providesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetPriceRangeQuery,
} = productApi;