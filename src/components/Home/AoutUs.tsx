import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '50px auto',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Title level={2} style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        Who We Are
      </Title>

      <Paragraph style={{ fontSize: '18px', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
        Chapters & Co. is more than just a bookstore; it’s a haven for book lovers, a community of
        passionate readers, and a space where stories come to life. Our mission is to bring the
        finest collection of books to everyone who cherishes the magic of words.
      </Paragraph>

      <Paragraph style={{ fontSize: '18px', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
        Whether you're looking for timeless classics, modern bestsellers, or hidden literary gems,
        we curate our collection with a deep love for books and the readers who appreciate them.
      </Paragraph>

      {/* Divider Line */}
      <div style={{ fontSize: '24px', color: '#1D7B84', fontWeight: 'bold', margin: '20px 0' }}>
        ----------“------------
      </div>

      <Paragraph style={{ fontSize: '18px', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
        Beyond selling books, we aim to create an experience. Our bookshop hosts events, book
        readings, and discussions that bring together book enthusiasts from all walks of life.
      </Paragraph>

      {/* Divider Line */}
      
      <div style={{ fontSize: '24px', color: '#1D7B84', fontWeight: 'bold', margin: '20px 0' }}>
        ----------“------------
      </div>
    </div>
  );
};

export default AboutUs;
