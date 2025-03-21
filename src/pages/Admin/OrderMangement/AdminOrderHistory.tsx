import { useEffect, useState } from "react";
import { Table, Tag, Button, Popconfirm, Space } from "antd";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../../redux/features/Order/orderApi";
import { toast } from "sonner";

const AdminOrderHistory = () => {
  const { data: orders, isLoading, isError ,refetch} = useGetOrdersQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation();  // Get the deleteOrder mutation hook
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (Array.isArray(orders?.data)) {
      const formattedOrders = orders.data?.map((order) => ({
        key: order._id,
        orderId: order._id,
        user: order?.user?.email,
        status: order.status,
        totalPrice: order.totalPrice,
        date: new Date(order.createdAt).toLocaleDateString(),
        transactionStatus: order?.transaction?.bank_status,
      }));
      setOrderData(formattedOrders);
    } else {
      console.error("Expected 'orders' to be an array, but it was", orders);
    }
  }, [orders]);

  const handleDelete = (orderId: string) => {
    deleteOrder(orderId)
      .unwrap()
      .then(() => {
        // Handle successful deletion, e.g., remove the deleted order from the state
        setOrderData(orderData.filter((order) => order.key !== orderId));

        toast.success("Order deleted successfully");
        refetch(); 
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order. Please try again.");
      });
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text: number) => <span>৳ {text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        switch (status) {
          case "Paid":
            color = "green";
            break;
          case "Cancelled":
            color = "red";
            break;
          case "Shipped":
            color = "blue";
            break;
          case "Completed":
            color = "cyan";
            break;
          default:
            color = "orange";
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Transaction Status",
      dataIndex: "transactionStatus",
      key: "transactionStatus",
      render: (text: string) => <Tag color={text === "Success" ? "green" : "red"}>{text}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
     
        <Space>
   
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => handleDelete(record.orderId)}
          okText="Yes"
          cancelText="No"
        >
          
        <Button
          type="danger"
          
        >
          Delete
        </Button>
        </Popconfirm>
      </Space>
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders.</p>;

  return (
    <Table
      columns={columns}
      dataSource={orderData}
      pagination={{ pageSize: 10 }}
      bordered
    />
  );
};

export default AdminOrderHistory;
