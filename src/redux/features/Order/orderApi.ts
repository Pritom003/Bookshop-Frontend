import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/order",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/order/verify/${order_id}`,
        method: "GET",
      }),
    }),
    getMultipleProducts: builder.query({
  query: (productIds) => ({
    url: `/products?ids=${productIds.join(",")}`, // Send multiple IDs
    method: "GET",
  }),
}),
  }),
});



export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useGetMultipleProductsQuery
} = orderApi;
