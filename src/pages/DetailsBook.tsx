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
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser, TUser } from "../redux/features/auth/authSlice";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "../redux/features/cart/cartSlice";

const { TextArea } = Input;

const DetailsBook = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // Fetch book details
  const { data: book, isLoading: isBookLoading } = useGetSingleProductQuery(id || "");
  const bookData = book?.data;

  // Fetch reviews
  const { data: reviews, isLoading: isReviewsLoading, refetch } = useGetProductReviewsQuery(id || "");
  const [deleteReview] = useDeleteReviewMutation();
  const [createReview] = useCreateReviewMutation();

  const user = useAppSelector(selectCurrentUser) as TUser;

  // Cart state
  const cart = useAppSelector((state) => state.cart);
  const productInCart = bookData ? cart.items.find(item => item.product === bookData._id) : null;
  const totalOrdered = productInCart ? productInCart.quantity : 0;
  const isOutOfStock = book?.quantity === totalOrdered || bookData?.quantity===0;
  // Review state
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [visibleReviews, setVisibleReviews] = useState(2);

  if (isBookLoading) return <p>Loading...</p>;

  const handleAddToCart = () => {
    if (!bookData) return;
    dispatch(
      addToCart({
        product: bookData._id,
        name: bookData.title || bookData.name,
        price: Number(bookData.price || bookData.Price),
        quantity: 1,
        inStock: bookData.inStock,
        image: bookData.bookCover || bookData.productCover || "",
        stock: bookData.stock,
      })
    );
    toast.success("Added to cart!");
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!user) {
      toast.error("You must be logged in to delete a review.");
      return;
    }

    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully");
      refetch();
    } catch (error) {
      console.error("Delete review error:", error);
      toast.error("Failed to delete review. Please try again.");
    }
  };

  const handleReviewSubmit = async () => {
    if (!newReview.comment.trim()) {
      toast.error("Review comment cannot be empty!");
      return;
    }

    try {
      await createReview({ productId: id, ...newReview }).unwrap();
      toast.success("Review added successfully!");
      setNewReview({ rating: 5, comment: "" });
      refetch();
    } catch (err) {
      console.error("Review submission error:", err);
      toast.error("Failed to add review. Please try again.");
    }
  };


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <Row gutter={[8, 16]}>
          <Col xs={24} style={{ display: "flex", flexDirection: "column" }}>
            {/* Top Section: Image & Basic Info */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {/* Book Cover Image */}
              <div style={{ flexShrink: 0, width: "150px" }}>
                <img
                  alt={bookData?.title || "Book Cover"}
                  src={bookData?.bookCover || images}
                  style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
              {/* Book Details */}
              <div style={{ flex: 1, paddingLeft: "30px", marginTop: "20px" }}>
                <h1>{bookData?.title}</h1>
                <div style={{ display: "flex", margin: "10px 0", alignItems: "center", gap: "10px" }}>
                  <img
                    src={bookData?.authorImage || images}
                    alt={bookData?.author || "Author"}
                    style={{ width: "60px", borderRadius: "50%" }}
                  />
                  <h5>By {bookData?.author}</h5>
                </div>
                <p><strong>Category:</strong> {bookData?.category}</p>
                <p><strong>Price:</strong> ${bookData?.price}</p>
                <Rate allowHalf className="text-yellow-600 text-sm" disabled defaultValue={bookData?.avgRating} />
              
              </div>
            </div>

            {/* Bottom Section: Description & Additional Info */}
            <div style={{ marginTop: "20px" }}>
              <p><strong>Description:</strong> {bookData?.description}</p>
              <p><strong>Last Update:</strong> {bookData?.updatedAt}</p>
              {isOutOfStock?
       <span className="text-red-700 text-lg font-sans py-10">     Out of Stock!!! </span> :<Button 
            className="my-10 border-4 border-cyan-500"
              onClick={handleAddToCart} 
              disabled={!bookData?.inStock}
            
            >
              {bookData?.inStock ? "Add to Cart 🛒" : "Out of Stock"}
            </Button>
            }
              
              {/* Add Review */}
              <h3>Add a Review</h3>
              <Rate
                allowHalf
                value={newReview.rating}
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

              {/* Reviews Section */}
              <h2>Reviews</h2>
              {isReviewsLoading ? (
                <Spin />
              ) : (
                <>
                  <List
                    itemLayout="horizontal"
                    dataSource={reviews?.data?.slice(0, visibleReviews) || []}
                    renderItem={(item) => (
                      <List.Item
                        actions={
                          user?.id === item.userId || user?.role === "ADMIN"
                            ? [<Trash2 key="delete" style={{ color: "red" }} onClick={() => handleDeleteReview(item._id)} />]
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
                  {reviews?.data?.length > visibleReviews && (
                    <Button type="link" onClick={() => setVisibleReviews((prev) => prev + 3)}>
                      See More
                    </Button>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailsBook;
