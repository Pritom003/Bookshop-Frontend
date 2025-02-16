import { Card, Row, Col, Typography, Rate } from 'antd';
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

const DisplayBook
 = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '50px auto', padding: '20px' }}>
 
      <Title level={2} style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' ,textAlign:"center" , padding:"20px"}}>
      What Booksellers Recommend
      </Title>
      {/* Book List */}
      <Row gutter={[32, 32]} justify="center">
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
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}
            >
              <Title level={4} style={{ marginBottom: '10px', color: '#333' }}>
                {book.title}
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#555' }}>
                {book.description}
              </Paragraph>
              <Rate allowHalf disabled defaultValue={book.rating} style={{ fontSize: '18px' }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DisplayBook
;
