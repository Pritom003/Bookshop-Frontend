import { Card, Row, Col, Typography, Rate, Button } from 'antd';
import bookImage from '../../assets/images/BookHeroBg.png'; // Replace with actual book images

const { Title, Paragraph } = Typography;

const books = [
  {
    id: 1,
    title: "The Shadow of the Wind",
    description: "A mesmerizing novel set in Barcelona, filled with mystery, love, and books.",
    rating: 4.8,
    image: bookImage,
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    description: "A timeless classic that explores love, class, and social expectations.",
    rating: 4.7,
    image: bookImage,
  },
  {
    id: 3,
    title: "The Night Circus",
    description: "A magical and enchanting story of a mysterious traveling circus.",
    rating: 4.6,
    image: bookImage,
  },
];

const DisplayBook = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '50px auto', padding: '20px', background: '#fdfaf6', borderRadius: '8px' }}>
      <Title level={2} style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', textAlign: "center" }}>
        What Booksellers Recommend
      </Title>
      {/* Book List */}
      <Row gutter={[24, 24]} justify="center">
        {books.map((book) => (
          <Col xs={24} sm={12} md={8} key={book.id}>
           <Card
  hoverable
  cover={
    <img
      alt={book.title}
      src={book.image}
      style={{ height: '250px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
    />
  }
  style={{
    borderRadius: '8px',
    border: '1px solid #ddd',
    transition: 'all 0.3s ease-in-out', // Smooth effect
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Default shadow
  }}
  bodyStyle={{ padding: '15px' }} // Adjust body padding for spacing
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)'; // Stronger shadow on hover
    e.currentTarget.style.transform = 'scale(1.02)'; // Slight scaling effect
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; // Back to normal
    e.currentTarget.style.transform = 'scale(1)'; // Reset scale
  }}
>

              <Title level={4} style={{ marginBottom: '8px', color: '#3e2723', fontFamily: 'Merriweather, serif' }}>
                {book.title}
              </Title>
              <Paragraph style={{ fontSize: '15px', color: '#555', minHeight: '60px' }}>
                {book.description}
              </Paragraph>
              <Rate allowHalf disabled defaultValue={book.rating} style={{ fontSize: '18px', color: '#ffb400' }} />
            </Card>
          </Col>
        ))}
      </Row>
      <Button type="primary" className="hero-button" >
            Explore Books
          </Button>
 
    </div>
  );
};

export default DisplayBook;
