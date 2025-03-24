import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "../../../redux/hooks";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { Book } from "../../../types/types.books";

interface BookCardProps {
  book: Book;
  className?: string;
  style?: React.CSSProperties;
  imageHeight?: string; // Allows setting custom image height
  imgewidth?: string; // Allows setting custom image height
  textAlign?: "center" | "start"; // Allows text alignment customization
}

const BookCard = ({
  book,
  className = "",
  style,
  imageHeight = "260px",
  imgewidth="150px", // Default height, but customizable
  textAlign = "center", // Default is center, but can be set to start
}: BookCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    console.log("Clicked Add to Cart:", book._id);
    dispatch(
      addToCart({
        product: book._id,
        name: book.title || book.name,
        price: Number(book.price || book.Price),
        quantity: 1,
        inStock: book.inStock,
        image: book.bookCover || book.productCover || "",
        stock: book.stock,
      })
    );
  };

  // Function to limit the title to a maximum of three words
  const formatTitle = (title: string = "") => {
    const words = title.split(" ");
    return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : title;
  };

  return (
    <div className={`flex flex-col align-middle justify-center w-44 pt-2 items-center ${className}`} style={style}>
      {/* Book Cover with Flexible Height */}
      <Link
        to={`/book/${book._id}`}
        className="relative shadow-lg rounded-md overflow-hidden"
        style={{ height: imageHeight ,width:imgewidth}} // Dynamically sets height
      >
        <img
          src={book.bookCover || book.productCover || "/default-book-cover.jpg"}
          alt={book.title || book.name}
          className="w-full h-full object-cover shadow-black shadow-inner"
        />
      </Link>

      {/* Book Info with Flexible Text Alignment */}
      <div className={` pt-4 text-${textAlign}`}>
        <p className="text-gray-500 text-sm font-medium">
          Price: ${book.price || book.Price}
        </p>
        <h3 className="text-base font-semibold max-w-44 leading-tight">
          {formatTitle(book.title || book.name)}
        </h3>

        {/* Add to Cart Button */}
        <div className={`flex items-${textAlign} `}>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1 px-2 py-1 border-b border-black 
            hover:text-blue-600 transition hover:border-blue-600 text-sm"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
