import { useState} from "react";
import { Input, Select, Slider, Card, Row, Col, Pagination, Spin, Alert } from "antd";
import { useGetProductsQuery } from "../redux/features/Books/Books.api"; // Assuming useGetProductsQuery is set up to interact with backend
import { Book } from "../types/types.books";

const { Option } = Select;

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Query to fetch products with backend filters, pagination, etc.
  const { data: productsData, isLoading, isError, error } = useGetProductsQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    category,
    sortBy,
    priceRange
  });

  // Show loading spinner
  if (isLoading) {
    return (
      <div style={{ padding: "20px", marginTop: "20px", textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div style={{ padding: "20px", marginTop: "20px" }}>
        <Alert message="Error loading products" description={error?.message || 'An error occurred'} type="error" showIcon />
      </div>
    );
  }

  // Log the API response for debugging
  console.log("API Response:", productsData);

  // Check if productsData exists and if products array exists within data
  const products = Array.isArray(productsData?.data?.products) ? productsData.data.products : [];

  // Ensure products exist
  if (!products.length) {
    return (
      <div style={{ padding: "20px", marginTop: "20px", textAlign: "center" }}>
        <Alert message="No books found" description="Try adjusting your search or filters." type="warning" showIcon />
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
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Category"
            value={category}
            onChange={(value) => setCategory(value)}
            style={{ width: "100%" }}
          >
            <Option value="">All Categories</Option>
            <Option value="Fiction">Fiction</Option>
            <Option value="Non-Fiction">Non-Fiction</Option>
            <Option value="Fantasy">Fantasy</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Availability"
            value={availability}
            onChange={(value) => setAvailability(value)}
            style={{ width: "100%" }}
          >
            <Option value="">All</Option>
            <Option value="InStock">In Stock</Option>
            <Option value="OutStock">Out of Stock</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Select
            placeholder="Sort by"
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            style={{ width: "100%" }}
          >
            <Option value="title">Title</Option>
            <Option value="author">Author</Option>
            <Option value="price">Price</Option>
          </Select>
        </Col>
      </Row>

      {/* Price Range */}
      <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
        <Col span={24}>
          <Slider
            range
            min={0}
            max={100}
            defaultValue={priceRange}
            onChange={setPriceRange}
          />
        </Col>
      </Row>

      {/* Book List */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {products.map((book: Book) => (
          <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
            <Card title={book.title} bordered>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              <p>Category: {book.category}</p>
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
