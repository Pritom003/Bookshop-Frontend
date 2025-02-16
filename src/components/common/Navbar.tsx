import { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/C&C.svg'; // Update with your actual logo

const { Header } = Layout;

const navLinks = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'about', label: 'About', path: '/' },
  { key: 'books', label: 'All Books', path: '/' },
  { key: 'profile', label: 'Profile', path: '/' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section'); 
      if (!heroSection) return;

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      setScrolled(window.scrollY >= heroBottom - 70); // Adjusted for smooth transition
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: scrolled ? 'black' : 'transparent', // Change background based on scroll
        transition: 'background 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
      }}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="Chapters & Co."
          style={{
            height: '50px',
            background: 'white',
            margin: '30px 0 5px',
            padding: '5px',
          }}
        />
      </Link>

      {/* Desktop Navigation */}
      {!isMobile && (
        <Menu
          mode="horizontal"
          theme="dark"
          selectable={false}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            minWidth: '300px',
            justifyContent: 'space-around',
            background: 'transparent',
          }}
        >
          {navLinks.map((link) => (
            <Menu.Item key={link.key}>
              <Link to={link.path}>{link.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      )}

      {/* Mobile Menu Icon */}
      {isMobile && (
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
          style={{
            marginLeft: 'auto',
            fontSize: '20px',
            color: 'white',
          }}
        />
      )}

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)} title="Menu" placement="right">
        <Menu mode="vertical" onClick={() => setOpen(false)}>
          {navLinks.map((link) => (
            <Menu.Item key={link.key}>
              <Link to={link.path}>{link.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </Header>
  );
};

export default Navbar;
