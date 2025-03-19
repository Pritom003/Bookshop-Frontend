import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import { useEffect, useState } from "react";
import PageLoader from "../ui/PageLoader";

const { Content, Footer } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // Delay to show animation
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {/* Show PageLoader on Navigation */}
      {loading && <PageLoader />}

      <Layout style={{ minHeight: "100vh" }}>
        {/* Navbar */}
        <div className="mb-16">
          <Navbar />
        </div>

        {/* Main Content */}
        <Content style={{ margin: "auto", width: "100%" }}>
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center", background: "#333", color: "white", padding: "10px 0" }}>
          © 2025 Chapters & Co. All rights reserved.
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
