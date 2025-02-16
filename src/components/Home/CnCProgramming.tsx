import { Row, Col, Typography } from 'antd';
import cncImage from '../../assets/images/Banner3.jpg'; // Update with actual image path
import { useRef} from 'react';

const { Title, Paragraph } = Typography;

const CnCProgramming = () => {
  const textRef = useRef<HTMLDivElement>(null);


  return (
    <div style={{ maxWidth: '1000px', margin: '50px auto', padding: '20px' }}>
      <Row gutter={[32, 32]} align="middle" justify="center">
        {/* Text Section */}
        <Col xs={24} md={12} 
        style={{ textAlign: 'left',height:"500px" }}>
    
          <Title level={2} style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
          C & C Programming
      </Title>
          <div ref={textRef}>
            <Paragraph style={{ fontSize: '18px', lineHeight: '1.6', color: '#333' }}>
              To further community engagement, we host an array of literary and cultural events, 
              including monthly book clubs for children and adults, an annual book fair, and an annual 
              holiday gift bazaar.
            </Paragraph>
            <Paragraph style={{ fontSize: '18px', lineHeight: '1.6', color: '#333' }}>
              Inspired by London’s Gresham College — an institution providing free public lectures since 
              1597 — our mission is to foster the advancement of culture and knowledge. Bloom Programming 
              events seek to entertain our sense of curiosity, inspire new areas of interest, and ultimately 
              contribute to Tampa’s emergence as a cultural destination.
            </Paragraph>
          </div>
        </Col>

        {/* Image Section */}
        <Col xs={24} md={12}
         style={{ display: 'flex', 
         justifyContent: 'center' }}>
          <img
            src={cncImage}
            alt="C & C Programming"
            style={{
              width: '100%',
              maxWidth: '220px',
              height: '400px', // Set image height equal to text height
              borderRadius: '150px',
              objectFit: 'cover',
              padding: '10px 0',
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CnCProgramming;
