import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import '../../styles/HeroBanner.css';
import HeroBg from '../../assets/images/Banner3.jpg';

const { Title, Paragraph } = Typography;

const Hero = () => {
  return (
    <div id="hero-section" className="hero-container" style={{ backgroundImage: `url(${HeroBg})` }}>
      {/* Black Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <Title className="hero-title">Chapters & Co.</Title>
        <Paragraph className="hero-subtitle">Unravel Stories, One Page at a Time</Paragraph>
        <Link to="/books">
          <Button type="primary" className="hero-button">
            Explore Books
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
