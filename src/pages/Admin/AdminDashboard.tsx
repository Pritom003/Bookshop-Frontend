import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  BookOpen,
  Users,
  BarChart2,
  User,
  ShoppingCart,
  Bookmark,
 
  LibraryBigIcon,
} from "lucide-react";
import { TUser } from "../../redux/features/auth/authSlice";
import Navbar from "../../components/common/Navbar";

const { Sider, Content } = Layout;

const menuItems = {
  ADMIN: [
   
    { key: "manage-users", label: "Manage Users", path: "/dashboard/manage-users", icon: <Users /> },
    { key: "revenue", label: "Revenue", path: "/dashboard/stats", icon: <BarChart2 /> },
    { key: "orders", label: "Orders", path: "/dashboard/order-history", icon: <ShoppingCart /> },
    { key: "add-book", label: "Add Book", path: "/dashboard/add-book", icon: <BookOpen /> },
    { key: "profile", label: "Profile", path: "/dashboard/profile", icon: <User /> },
    { key: "allprodcts", label: "Manage Products", path: "/dashboard/manage-products", icon: < LibraryBigIcon/> },
  ],
  USER: [
    { key: "profile", label: "Profile", path: "/dashboard", icon:  <User /> },
    { key: "add-book", label: "Add Book", path: "/dashboard/add-book", icon: <BookOpen /> },
    { key: "mybooks", label: "mybooks", path: "/dashboard/mybooks", icon: <Bookmark /> },
  ],
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useAppSelector((state) => state.auth.user) as TUser;
  const role = user?.role || "user";

  return (
  <div>
    <Navbar></Navbar>
      <Layout className="min-h-screen flex flex-col">
      {/* Main Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sider
          className="pt-20 h-full"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          width={220}
        >
          <Menu mode="inline" theme="light" defaultSelectedKeys={["dashboard"]}>
            {menuItems[role]?.map((item) => (
              <Menu.Item className="mb-20" key={item.key} >
                {!collapsed && <Link to={item.path}>{item.label}</Link>}
                {collapsed && <Link to={item.path}>{item.icon}</Link>}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        {/* Content Area */}
        <Layout className="flex-1">
          <Content className="m-12 p-12">
            <Outlet />
          </Content>
        </Layout>
      </div>

      {/* Footer */}
     
    </Layout>
  </div>
  );
};

export default Dashboard;
