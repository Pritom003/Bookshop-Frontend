/* eslint-disable @typescript-eslint/no-explicit-any */ 
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import {
  useBlockUserMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/user/userApi";
import { setUsers } from "../../../redux/features/user/userSlice";
import { UserOutlined } from "@ant-design/icons";
import { DeleteIcon, Edit, GraduationCapIcon, Lock, Trash2, Unlock } from "lucide-react";

const UserTable = () => {
  const dispatch = useDispatch();
  const { data,  isLoading } = useGetAllUsersQuery({});
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const [makeAdmin, { isLoading: makingAdmin }] = useMakeAdminMutation();
  const [removeAdmin, { isLoading: removingAdmin }] = useRemoveAdminMutation();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data.data));
    }
  }, [data, dispatch]);

  const handleBlockUser = async (userId: string) => {
    try {
      await blockUser(userId);
      message.success("User status updated successfully!");
    } catch (err) {
      message.error("Failed to block/unblock user.");
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    try {
      await makeAdmin(userId);
      message.success("User is now an admin!");
    } catch (err) {
      message.error("Failed to make admin.");
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    try {
      await removeAdmin(userId);
      message.success("Admin role removed!");
    } catch (err) {
      message.error("Failed to remove admin role.");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      message.success("User deleted successfully!");
    } catch (err) {
      message.error("Failed to delete user.");
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <span style={{ color: role === "ADMIN" ? "red" : "blue" }}>
          {role === "ADMIN" ? <GraduationCapIcon size={20} /> : <UserOutlined style={{ marginRight: 8 }} />}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: { _id: string; is_blocked: boolean; role: string }) => (
        <div className="flex flex-wrap gap-2">
          <Button
            danger={record.is_blocked}
            onClick={() => handleBlockUser(record._id)}
            loading={blocking}
          >
            {record.is_blocked ? <Lock style={{ color: "red" }} /> : <Unlock style={{ color: "green" }} />}
          </Button>

          {record.role === "USER" && (
            <Button type="dashed" onClick={() => handleMakeAdmin(record._id)} loading={makingAdmin}>
              <Edit style={{ color: "blue" }} />
            </Button>
          )}

          {record.role === "ADMIN" && (
            <Button danger onClick={() => handleRemoveAdmin(record._id)} loading={removingAdmin}>
              <DeleteIcon />
            </Button>
          )}

          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger loading={deleting}>
              <Trash2 />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="overflow-auto">
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data?.data || []}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* Action Guide Section */}
      <h2 className="text-lg font-semibold mt-4">Action Guideline</h2>
      <div className="flex flex-wrap justify-between gap-4 text-xs mt-2">
        <div className="flex gap-4 flex-wrap">
          <span><Lock style={{ color: "red" }} /> Block User</span>
          <span><Unlock style={{ color: "green" }} /> Unblock User</span>
          <span><Trash2 style={{ color: "red" }} /> Delete User</span>
          <span><Edit style={{ color: "blue" }} /> Make Admin</span>
          <span><DeleteIcon style={{ color: "red" }} /> Remove Admin</span>
        </div>

        <div className="flex gap-2 items-center">
          <GraduationCapIcon style={{ color: "goldenrod" }} size={20} />
          <span>Admin</span>
          <UserOutlined style={{ color: "#1890ff" }} size={20} />
          <span>User</span>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
