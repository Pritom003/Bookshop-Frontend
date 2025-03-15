import { useForm } from 'react-hook-form'; // Import useForm
import Selectfield from "../components/Form/Selectfield"; // Import Selectfield
import categoryOptions from "../components/constatnt/categoryconts";
import { Alert, Button, Card, Col, Input, Pagination, Row, Spin, Tag } from 'antd';
import { Book } from '../types/types.books';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/features/Books/Books.api';
import { useState } from 'react';
import images from '../assets/images/Banner3.jpg';
const AllBooks = () => {
  const { control, handleSubmit } = useForm(); // Initialize form control here
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  // const [priceRange, setPriceRange] = useState([0, 100]);
  // const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Fixed page size to 6 books per page
  const navigate = useNavigate();

  const { data: productsData, isLoading, isError, error } = useGetProductsQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    category,
  });

  if (isLoading) {
    return (
      <div style={{ padding: "20px", marginTop: "20px", textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }
  
  if (isError) {
    return (
      <div style={{ padding: "20px", marginTop: "20px" }}>
        <Alert message="Error loading products" description={'An error occurred'} type="error" showIcon />
      </div>
    );
  }
  
  const products = Array.isArray(productsData?.data?.products) ? productsData.data.products : [];
  
  if (products.length === 0) {
    return (
      <div style={{ padding: "20px", marginTop: "20px", textAlign: "center" }}>
        <Alert message="No books found" description="Try adjusting your search or filters." type="warning" showIcon />
        <Button
          style={{ marginTop: "20px" }} 
          onClick={() => navigate(-1)} // navigate back to previous page
          type="default"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", marginTop: "20px" }}>
      <h1>All Books</h1>

      {/* Filters */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Selectfield
            label="Category"
            name="category"
            control={control} 
            options={categoryOptions} 
            disabled={false} 
            value={category} 
            width={'200px'}
            onChange={(value) => setCategory(value)} // Update the selected category
          />
        </Col>
      </Row>

      {/* Display All Books */}
      <Row gutter={[50, 80]} style={{ margin: "80px 20px" }}>
        {products.map((book: Book) => (
          <Col xs={24} sm={24} md={24} lg={8} xl={8} key={book.id}>
            <Card
              bordered
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "5px 20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "140px",
                  height: "160px",
                  overflow: "hidden",
                  position: "absolute",
                  top: "-20px",
                  left: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  alt={book.title}
                  src={book.bookCover || images}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {book.inStock ? (
                <Tag color="green" style={{ top: '120px' }}>In Stock</Tag>
              ) : (
                <Tag color="red">Out of Stock</Tag>
              )}
              <div style={{ marginLeft: "150px", flex: 1 }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{book.title}</h3>
                <p style={{ fontSize: "16px", color: "#555" }}><strong>By {book.author}</strong></p>
                <p style={{ fontSize: "16px", color: "#555" }}><strong>Price:</strong> ${book.price}</p>
                <Link to={`/book/${book._id}`}>
                  <Button type="default" style={{ alignSelf: "flex-end", justifySelf: "end" }}>
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={productsData?.data?.total || 0}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default AllBooks;
