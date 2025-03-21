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
      query: (id: string) => ({
        url: `/products/${id}`, // Fetch product by ID
        method: "GET",
      }),
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
    
    getProductReviews: builder.query({
      query: (productId: string) => ({
        url: `/review/${productId}`,
        method: "GET",
      }),
    }),
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      //   invalidatesTags: [tagTypes.product],
    }),
    
    createReview: builder.mutation({
      query: (body) => ({
        url: "/review",
        method: "POST",
        body,
      }),
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
  useGetProductReviewsQuery, // <-- Newly added
  useCreateReviewMutation,  
  useDeleteReviewMutation,

} = productApi;