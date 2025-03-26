// import { BookOpen, FlaskConical, BrainCircuit, Feather, Book } from "lucide-react";
import { Skeleton } from "antd";
import { useGetProductsQuery } from "../../redux/features/Books/Books.api";
// import BookCard from "../BookCard"; // Adjust the import based on your folder structure
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bgImage from "../../assets/images/topprobg.png"; // Ensure correct path
import categoryOptions from "../constatnt/categoryconts";
import BookCard from "../ui/BookCard/BookCard";
import { Book } from "../../types/types.books";



const NewArrival = () => {
  const { data, isLoading } = useGetProductsQuery({
    isNewArrival: true,
    limit: 3,
  });

  const products = data?.data?.products || [];

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 flex flex-col md:flex-row gap-8">
      {/* Genres Section */}
      <div
        className="flex-1 p-6 rounded-lg text-black"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categoryOptions.map((category) => (
            <div key={category.value} className="flex text-white flex-col items-center">
              <div className="w-20 h-20 rounded-full
               bg-blue-900 flex items-center text-white
               justify-center shadow-lg">
                {category.icon}
              </div>
              <p className="mt-2 font-semibold text-black">{category.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="flex-1 grid  justify-center align-middle items-center">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">New Arrivals 📚</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Skeleton active />
          </div>
        ) : products.length > 0 ? (
          
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center
           mx-auto align-middle items-center">
            {products.map((book :Book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No new arrivals found.</p>
        )}
      </div>
    </div>
  );
};

export default NewArrival;
