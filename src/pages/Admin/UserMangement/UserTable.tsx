/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
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
import { DeleteIcon, Edit, GraduationCapIcon, Lock, Trash2, Trash2Icon, Unlock } from "lucide-react";

const UserTable = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllUsersQuery({});
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const [makeAdmin, { isLoading: makingAdmin }] = useMakeAdminMutation();
  const [removeAdmin, { isLoading: removingAdmin }] = useRemoveAdminMutation();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
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
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   key: "name",
    //   render: (name: string, record: { role: string }) => (
    //     <div>
    //       {record.role === "ADMIN" &&  />}
    //       {name.split(" ")[0]}
    //     </div>
    //   ),
    // },
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
        <span style={{ color: role === "ADMIN" ? "red" : 
        "blue" }}>
          {role === "ADMIN" ? <GraduationCapIcon size={20} /> :<UserOutlined style={{ marginRight: 8 }}/>}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: { _id: string; is_blocked: boolean; role: string }) => (
        <>
          <Button
      
            danger={record.is_blocked}
            onClick={() => handleBlockUser(record._id)}
            loading={blocking}
            style={{ marginRight: 8 }}
          >
{
  record.is_blocked ? (
    <Lock style={{ color: "red", cursor: "pointer" }} />
  ) : (

    <Unlock style={{ color: "green", cursor: "pointer" }} />
  )
}
          </Button>
          
          {record.role === "USER" && (
            <Button
              type="dashed"
              onClick={() => handleMakeAdmin(record._id)}
              loading={makingAdmin}
              style={{ marginRight: 8 }}
            >
        <Edit style={{ color: "blue" }} /> 
            </Button>
          )}

          {record.role === "ADMIN" && (
            <Button
              className="bg-white text-xs "
              danger
              onClick={() => handleRemoveAdmin(record._id)}
              loading={removingAdmin}
              style={{ marginRight: 8 }}
            >
              <DeleteIcon></DeleteIcon>
            </Button>
          )}

          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="text-red-700 " danger loading={deleting}>
              <Trash2Icon></Trash2Icon>
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>


    <Table
      rowKey="_id"
      columns={columns}
      dataSource={data?.data || []}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
    />
    
    <h2> Action Guideline </h2>
<div className="flex  flex-wrap justify-between  gap-6">

 
 <div className="flex gap-4 text-xs">
 <span><Lock style={{ color: "red" }} /> Block User</span>
  <span><Unlock style={{ color: "green" }} /> Unblock User</span>
  <span><Trash2 style={{ color: "red" }} /> Delete User</span>
  <span><Edit style={{ color: "blue" }} /> Make Admin</span>
  <span>  <DeleteIcon style={{ color: "red" }}></DeleteIcon> Remove Admin</span>
 </div>
<div className="flex gap-2 " > 
  <hr className="block md:hidden"/>
   <span><GraduationCapIcon style={{ color: "goldenrod" }} size={20} /> Admin</span>
   <span className="grid"><UserOutlined style={{ color: "#1890ff" }} size={20} />  User</span></div>

</div>
    </div>
  );
};

export default UserTable;
