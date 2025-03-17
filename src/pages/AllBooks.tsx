import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Pagination } from "antd";
import { useGetProductsQuery } from "../redux/features/Books/Books.api";
import categoryOptions from "../components/constatnt/categoryconts";
import { Book } from "../types/types.books";

import { ShoppingCart } from "lucide-react";
import Container from "../utils/container";
import CommontHero from "../utils/CommontHero";

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(""); // Track selected category
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const navigate = useNavigate();

  const { data: productsData, isLoading, isError } = useGetProductsQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    category, // Pass category in the request
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-32">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="p-5 text-center">
        <Alert message="Error loading products" type="error" showIcon />
      </div>
    );
  }

  const products = Array.isArray(productsData?.data?.products) ? productsData.data.products : [];

  return (
    <Container>
      <div className="min-h-screen bg-gray-50">
        <CommontHero 
          CurrentPage="All Books"
          description="Explore our extensive collection of books across various genres."
        />

        {/* Main Content */}
        <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Sidebar (Categories & Search) */}
          <div className="md:col-span-1 bg-primary shadow-md rounded-lg p-5">
            
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            {/* Category Selection */}
            <h2 className="mt-6 mb-3 font-semibold text-lg">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categoryOptions.map((cat) => (
                <button 
                  key={cat.value}
                  className={`flex flex-col items-center justify-center w-20 h-20 rounded-full shadow-md 
                    transition ${
                      category === cat.value ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  onClick={() => setCategory(cat.value)} // Update selected category
                >
                  {cat.icon}
                  <span className="text-xs font-medium mt-1">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Books List */}
          <div className="md:col-span-2 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <div className="col-span-2 text-center">
                <Alert message="No books found" type="warning" showIcon />
                <button onClick={() => navigate(-1)} className="mt-5 px-4 py-2 bg-gray-800 text-white rounded-md">
                  Go Back
                </button>
              </div>
            ) : (
              products.map((book: Book) => (
                <div key={book._id} className="flex flex-col items-center">
                  <Link to={`/book/${book._id}`} className="relative w-[150px] h-[200px] shadow-lg rounded-md overflow-hidden">
                    <img
                      src={book.bookCover}
                      alt={book.title}
                      className="w-full h-full object-cover shadow-black shadow-inner"
                    />
                  </Link>
                  <div className="text-center space-y-1">
                    <h3 className="text-base font-semibold leading-tight">{book.title}</h3>
                    <p className="text-gray-500 text-sm font-medium">Price: ${book.price}</p>
                    <button className="flex items-center justify-center gap-1 px-2 py-1 border-b border-black 
                      hover:text-blue-600 transition hover:border-blue-600 text-sm">
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={productsData?.data?.total || 0}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>

      </div>
    </Container>
  );
};

export default AllBooks;
