import React, { useState, useEffect } from "react";
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
  DollarSign,
} from "lucide-react";
import { TUser } from "../../redux/features/auth/authSlice";
import Navbar from "../../components/common/Navbar";

const { Sider, Content } = Layout;

const menuItems = {
  ADMIN: [
    { key: "profile", label: "Profile", path: "/dashboard", icon: <User /> },
    { key: "manage-users", label: "Manage Users", path: "/dashboard/manage-users", icon: <Users /> },
    { key: "revenue", label: "Revenue", path: "/dashboard/stats", icon: <BarChart2 /> },
    { key: "orders", label: "Orders", path: "/dashboard/order-history", icon: <ShoppingCart /> },
    { key: "add-book", label: "Add Book", path: "/dashboard/add-book", icon: <BookOpen /> },

    { key: "allproducts", label: "Manage Products", path: "/dashboard/manage-products", icon: <LibraryBigIcon /> },
  ],
  USER: [
    { key: "profile", label: "Profile", path: "/dashboard", icon: <User /> },
    { key: "add-book", label: "Add Book", path: "/dashboard/add-book", icon: <BookOpen /> },
    { key: "Order", label: "Order history", path: "/dashboard/myorder", icon: <DollarSign /> },
  ],
};

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user) as TUser;
  const role = user?.role || "USER";

  // Always collapse sidebar on mobile
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Navbar />
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
                <Menu.Item className="mb-2" key={item.key}>
                  {collapsed ? <Link to={item.path}>{item.icon}</Link> : <Link to={item.path}>{item.label}</Link>}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>

          {/* Content Area */}
          <Layout className="flex-1">
            <Content className="lg:m-12 lg:p-12 p-2">
              <Outlet />
            </Content>
          </Layout>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
