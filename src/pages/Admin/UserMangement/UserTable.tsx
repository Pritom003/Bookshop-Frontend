import React, { useEffect } from "react";
import { Table, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useBlockUserMutation, useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import { setUsers } from "../../../redux/features/user/userSlice";
import { UserOutlined } from "@ant-design/icons"; // Import Lucid icon

const UserTable = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllUsersQuery({});
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data.data)); // Store fetched users in redux
    }
  }, [data, dispatch]);

  const handleBlockUser = async (userId: string) => {
    try {
      await blockUser(userId);
      message.success("User status updated successfully!");
      // Refetch or update user state after blocking/unblocking
    } catch (err) {
      message.error("Failed to block/unblock user.");
    }
  };

  // Helper function to get the first word of the name
  const getNameDisplay = (name: string) => {
    const nameParts = name.split(" ");
    return nameParts[0]; // Return only the first word
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: { role: string }) => (
        <div>
          {record.role === "ADMIN" && <UserOutlined style={{ marginRight: 8 }} />} {/* Add Lucid Icon */}
          {getNameDisplay(name)} {/* Display only the first word of the name */}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { _id: string; is_blocked: boolean }) => (
        <Button
          type="primary"
          danger
          onClick={() => handleBlockUser(record._id)}
          loading={blocking}
        >
          {record.is_blocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={data?.data || []}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default UserTable;
