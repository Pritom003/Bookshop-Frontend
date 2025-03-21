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
        method: "GET",
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
deleteOrder: builder.mutation({
  query: (orderId) => ({
    url: `/order/${orderId}`,
    method: "DELETE",
  }),
}),
getRevenue: builder.query({
  query: () => ({
    url: "/order/revenue",
    method: "GET",
  }),
}),
getTopOrderedProducts: builder.query({
  query: () => ({
    url: "/order/top-book",
    method: "GET",
  }),
}),
  }),
});



export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useGetMultipleProductsQuery,
  useDeleteOrderMutation, 
  useGetRevenueQuery, 
  useGetTopOrderedProductsQuery 
} = orderApi;
