import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import { useEffect, useState } from "react";
import PageLoader from "../ui/PageLoader";
import Footers from "../common/Footers";
import { ArrowUpCircle } from "lucide-react";

const { Content } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Show PageLoader on Navigation */}
      {loading && <PageLoader />}

      <Layout style={{ minHeight: "100vh" }}>
        {/* Navbar */}
        <div className="">
          <Navbar />
        </div>

        {/* Main Content */}
        <Content style={{ margin: "auto", width: "100%" }}>
          <Outlet />
        </Content>

        {/* Footer */}
        <Footers />

        {/* Scroll to Top Button */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-[#2972b6] text-white p-3 rounded-full shadow-lg hover:bg-[#1d5b8f] transition"
          >
            <ArrowUpCircle size={32} />
          </button>
        )}
      </Layout>
    </>
  );
};

export default MainLayout;
