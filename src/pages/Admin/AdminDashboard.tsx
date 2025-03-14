import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/add-book">Add New Book</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/admin/manage-books">Manage Books</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Content Area */}
      <Layout>
        <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
          <h1>Admin Dashboard</h1>
          <Outlet /> {/* Renders the nested admin routes */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
