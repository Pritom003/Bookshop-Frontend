import React from 'react';
import { Card, Rate, Input, Button, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
// import { useGetBookDetailsQuery, useGetRecommendedBooksQuery } from '../redux/features/Books/Books.api';
import images from '../assets/images/Banner3.jpg';
import { useGetSingleProductQuery } from '../redux/features/Books/Books.api';

const { TextArea } = Input;

const DetailsBook = () => {
    const { id } = useParams();
    const { data: book, isLoading } =useGetSingleProductQuery(id);
    // const { data: recommendedBooks } = useGetRecommendedBooksQuery(book?.author);

    if (isLoading) return <p>Loading...</p>;
console.log(book);
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card cover={<img alt={book?.title} src={book?.coverImage || images} style={{ width: '100%', objectFit: 'cover' }} />} />
                </Col>
                <Col xs={24} md={12}>
                    <h1>{book?.data.title}</h1>
                    <h3>By {book?.data.author}</h3>
                    <img src={book?.authorImage || images} alt={book?.data.author} style={{ width: '100px', borderRadius: '50%' }} />
                    <p><strong>Price:</strong> ${book?.data.price}</p>                 
                    <p><strong>category:</strong> ${book?.data.category}</p>                 
                    <p><strong>Description:</strong> {book?.data.description}</p>
                    <p><strong>last Update:</strong> {book?.data.updatedAt}</p>
                    <Rate allowHalf defaultValue={book?.data.rating} />
                    <TextArea rows={4} placeholder="Write a review..." style={{ marginTop: '10px' }} />
                    <Button type="primary" style={{ marginTop: '10px' }}>Submit Review</Button>
                </Col>
            </Row>

            {/* <div style={{ marginTop: '40px' }}>
                <h2>Recommended Books by {book?.author}</h2>
                <Row gutter={[16, 16]}>
                    {recommendedBooks?.map((recBook) => (
                        <Col key={recBook.id} xs={24} sm={12} md={8} lg={6}>
                            <Card cover={<img alt={recBook.title} src={recBook.coverImage || images} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}>
                                <h3>{recBook.title}</h3>
                                <p>Price: ${recBook.price}</p>
                                <Button type="link">View Details</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div> */}
        </div>
    );
};

export default DetailsBook;
