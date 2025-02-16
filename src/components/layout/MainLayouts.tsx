import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const {  Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
 
   <Navbar/>


      {/* Main Content */}
      <Content style={{ margin: 'auto', width: '100%' }}>
        <Outlet />
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center', background: '#333', color: 'white', padding: '10px 0' }}>
        © 2025 Chapters & Co. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default MainLayout;
