/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Alert, Pagination, Slider } from "antd";
import { useGetProductsQuery } from "../redux/features/Books/Books.api";
import categoryOptions from "../components/constatnt/categoryconts";
import { Book } from "../types/types.books";
import Container from "../utils/container";
import CommontHero from "../utils/CommontHero";
import BookCard from "../components/ui/BookCard/BookCard";

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(""); // Track selected category
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);


  const [priceRange, setPriceRange] = useState<[number, number]>([0, 900000000000]); // Default range 0 - 100

  const { data: productsData, isLoading, isError ,refetch} = useGetProductsQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    category,
    minPrice: priceRange[0],
    maxPrice: priceRange[1], // ✅ Ensure these are numbers
  });
  

  useEffect(() => {
    console.log("Filters Updated:", searchTerm, category, priceRange);
    refetch()
  }, [searchTerm, category, priceRange]);
  
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
            <h2 className="mt-6 mb-3 font-semibold text-lg">Price Range</h2>
            <Slider
  range
  min={0}
  max={500} // Adjust as needed
  step={10}
  value={priceRange}
  onChange={(value) => setPriceRange([value[0], value[1]])}
  // Correctly update the priceRange
/>

<span className="text-sm font-medium">
  ${priceRange[0]} - ${priceRange[1]}
</span>
          </div>

          {/* Books List */}
          <div className="md:col-span-2 flex  max-w-5xl gap-4 flex-wrap">
            {products.length === 0 ? (
              <div className="col-span-2 text-center">
                <Alert message="No books found" type="warning" showIcon />
                <button
  onClick={() => {
    setSearchTerm(""); // Reset search
    setCategory(""); // Reset category
    setPriceRange([0, 100]); // Reset price range
    setCurrentPage(1); // Reset to first page
    refetch(); // Fetch all books again
  }}
  className="mt-5 px-4 py-2 bg-gray-800 text-white rounded-md"
>
  Show All Books
</button>

              </div>
            ) : (
              products.map((book: Book) => (
                <BookCard key={book._id} book={book} />
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
