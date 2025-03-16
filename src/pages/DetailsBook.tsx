import React from 'react';
import { Rate, Input, Button, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import images from '../assets/images/Banner3.jpg';
import { useGetSingleProductQuery } from '../redux/features/Books/Books.api';

const { TextArea } = Input;

const DetailsBook = () => {
    const { id } = useParams();
    const { data: book, isLoading } = useGetSingleProductQuery(id || '');

    if (isLoading) return <p>Loading...</p>;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '800px' }}> {/* Restrict width for better layout */}
                <Row gutter={[8, 16]}>
                    <Col xs={24} style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Top Section: Image & Basic Info */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Book Cover Image */}
                            <div style={{ flexShrink: 0, width: '150px' }}>
                                <img 
                                    alt={book?.data.title}
                                    src={book?.data.bookCover || images} 
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }} 
                                />
                            </div>
                            {/* Book Details */}
                            <div style={{ flex: 1, paddingLeft: '30px', marginTop: '20px' }}>
                                <h1>{book?.data.title}</h1>
                                <div style={{ display: 'flex', margin: '10px 0', alignItems: 'center', gap: '10px' }}>
                                    <img 
                                        src={book?.data.authorImage || images} 
                                        alt={book?.data.author} 
                                        style={{ width: '60px', borderRadius: '50%' }} 
                                    />
                                    <h5>By {book?.data.author}</h5>
                                </div>
                                <p><strong>Category:</strong> {book?.data.category}</p>
                                <p><strong>Price:</strong> ${book?.data.price}</p>
                            </div>
                        </div>

                        {/* Bottom Section: Description & Additional Info */}
                        <div style={{ marginTop: '20px' }}>
                            <p><strong>Description:</strong> {book?.data.description}</p>
                            <p><strong>Last Update:</strong> {book?.data.updatedAt}</p>
                            <Rate allowHalf defaultValue={book?.data.rating} />
                            <TextArea rows={4} placeholder="Write a review..." style={{ marginTop: '10px' }} />
                            <Button type="primary" style={{ marginTop: '10px' }}>Submit Review</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DetailsBook;
