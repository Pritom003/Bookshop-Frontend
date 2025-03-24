/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Rate, Input, Button, Row, Col, List, Avatar, Spin } from "antd";
import { useParams } from "react-router-dom";
import images from "../assets/images/Banner3.jpg";
import {
  useGetSingleProductQuery,
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} from "../redux/features/Books/Books.api";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser, TUser } from "../redux/features/auth/authSlice";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";

const { TextArea } = Input;

const DetailsBook = () => {
  const { id } = useParams();

  
    const user = useAppSelector(selectCurrentUser) as TUser;
    console.log(user);
  const { data: book, isLoading: isBookLoading } = useGetSingleProductQuery(id || "");
  const { data: reviews, isLoading: isReviewsLoading, refetch } = useGetProductReviewsQuery(id || "");
  const [deleteReview] = useDeleteReviewMutation();
  const [createReview, { isError: reviewErr ,error}] = useCreateReviewMutation();
  const [visibleReviews, setVisibleReviews] = useState(2);
console.log(error);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  if (isBookLoading) return <p>Loading...</p>;
  const handleDeleteReview = async (id: string) => {
    if (!user) {
      toast.error("You must be logged in to delete a review.");
      return;
    }
  
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted successfully");
      refetch();
    } catch (error) {
      console.error("Delete review error:", error);
      toast.error("Failed to delete review. Please try again.");
    }
  };
  
  
  const handleReviewSubmit = async () => {
    await createReview({ productId: id, ...newReview });
    setNewReview({ rating: 5, comment: "" });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
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
                <Rate  allowHalf   className="text-yellow-600 text-sm" disabled defaultValue={book?.data.avgRating} />
                            </div>
                        </div>

                        {/* Bottom Section: Description & Additional Info */}
                        <div style={{ marginTop: '20px' }}>
                            <p><strong>Description:</strong> {book?.data.description}</p>
                            <p><strong>Last Update:</strong> {book?.data.updatedAt}</p>
                            <div style={{ marginTop: "20px" }}>
                                 {/* Add Review */}
              <h3>Add a Review</h3>
              <Rate
                allowHalf
                defaultValue={newReview.rating}
                onChange={(value) => setNewReview({ ...newReview, rating: value })}
              />
              <TextArea
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Write a review..."
                style={{ marginTop: "10px" }}
              />
              <Button type="primary" onClick={handleReviewSubmit} style={{ marginTop: "10px" }}>
                Submit Review
              </Button>
  <h2>Reviews</h2>
  {isReviewsLoading ? (
    <Spin />
  ) : (
    <>
    <List
  itemLayout="horizontal"
  dataSource={reviews?.data?.slice(0, visibleReviews) || []} // Show only visible reviews
  renderItem={(item: { user: string; userId: string; rating: number; comment: string; _id: string }) => (
    <List.Item
      actions={
        user?.id === item.userId || user?.role=== "ADMIN"
          ? [<DeleteIcon key="delete" style={{ color: "red" }} onClick={() => handleDeleteReview(item._id)} />]
          : []
      }
    >
      <List.Item.Meta
        avatar={<Avatar>{item?.user?.charAt(0)}</Avatar>}
        title={<span>{item.user}</span>}
        description={
          <>
            <Rate value={item.rating} disabled />
            <p>{item.comment}</p>
          </>
        }
      />
    </List.Item>
  )}
/>
      
      {/* "See More" Button - Placed Outside the List */}
      {reviews?.data?.length > visibleReviews && (
        <Button type="link" onClick={() => setVisibleReviews((prev) => prev + 3)}>
          See More
        </Button>
      )}
    </>
  )}
       
            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
     
    </div>
  );
};

export default DetailsBook;
