
import React, { useEffect } from "react";
import { Table, Button, message } from "antd";
// import { useGetAllUsersQuery, useBlockUserMutation } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { useBlockUserMutation, useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import { setUsers } from "../../../redux/features/user/userSlice";
// import { setUsers } from "../../redux/features/usersSlice";

const UserTable = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllUsersQuery({});
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
console.log(error);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
