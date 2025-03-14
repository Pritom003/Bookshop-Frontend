import { useState } from "react";
import { Input, Select, Slider, Card, Row, Col, Pagination, Spin, Alert, Tag, Button } from "antd";
import { useGetProductsQuery } from "../redux/features/Books/Books.api";
import { Book } from "../types/types.books";
const { Option } = Select;
import images from '../assets/images/Banner3.jpg';
import { Link } from "react-router-dom";
const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: productsData, isLoading, isError, error } = useGetProductsQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    category,
    sortBy,
    priceRange
  });
console.log(productsData);
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

  if (!products.length) {
    return (
      <div style={{ padding: "20px", marginTop: "20px", textAlign: "center" }}>
        <Alert message="No books found" description="Try adjusting your search or filters." type="warning" showIcon />
      </div>
    );
  }

  // Group books by category
  const groupedBooks = products.reduce((acc, book) => {
    if (!acc[book.category]) {
      acc[book.category] = [];
    }
    acc[book.category].push(book);
    return acc;
  }, {});

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

      {/* Display Books by Category */}
      {Object.keys(groupedBooks).map((category) => (
      <div key={category} style={{ marginTop: "80px" }}>
      <h2 style={{ fontSize: "60px", fontWeight: "bold",
         marginBottom: "50px" }}>{category}</h2>
      <Row gutter={[50, 80]}>
        {groupedBooks[category].map((book: Book) => (
          <Col xs={24} sm={24} md={24} lg={12} xl={8} key={book.id}>
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
                  src={book.coverImage || images}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                
              </div> {book.inStock ? <Tag color="green"   
               style={{ top:'120px'}}>In Stock</Tag> : <Tag color="red">Out of Stock</Tag>}
              <div style={{ marginLeft: "150px", flex: 1 }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{book.title}</h3>
                <p style={{ fontSize: "16px", color: "#555" }}><strong>By {book.author}</strong> </p>
                <p style={{ fontSize: "16px", color: "#555" }}><strong>Price:</strong> ${book.price}</p>
                <Link to={`/book/${book._id}`}>
    <Button type="default" style={{ alignSelf: "flex-end", justifySelf: "end" }}>View Details</Button>
  </Link>

                
                {/* <Button type="link" style={{textAlign:"end"}}>View Details</Button> */}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
      ))}

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
