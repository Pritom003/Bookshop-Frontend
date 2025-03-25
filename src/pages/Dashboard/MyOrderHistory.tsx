import { Table } from "antd";
import { useSelector } from "react-redux";
import { useGetOrderByuserQuery } from "../../redux/features/Order/orderApi";

const MyOrderHistory = () => {
  const { user } = useSelector((state: any) => state.auth); // Get logged-in user
  const { data: orders, isLoading, error } = useGetOrderByuserQuery(user?.id); // Pass user ID
console.log('userorder ',orders);

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders. </p>;
  if (!orders || orders?.data?.length === 0) {
    return <p>No orders found.</p>;
}

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `৳${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <span className="font-semibold">{status}</span>,
    },
    {
      title: "Ordered Products",
      dataIndex: "products",
      key: "products",
      render: (products: any[]) =>
        products.map((p) => (
          <p key={p.product._id}>
            {p.product.title} - {p.quantity} pcs
          </p>
        )),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Order History</h2>
      <Table dataSource={orders?.data} columns={columns} rowKey="_id" />
    </div>
  );
};

export default MyOrderHistory;
