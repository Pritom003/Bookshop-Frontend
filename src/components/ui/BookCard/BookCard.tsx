import { Link } from "react-router-dom"; 
import { ShoppingCart } from "lucide-react"; 
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"; 
import { addToCart } from "../../../redux/features/cart/cartSlice"; 
import { toast } from "sonner";


interface BookCardProps {
  book: any;
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
  
  // Assuming there's a selector to get the cart contents and calculate the total order quantity for the product
  const cart = useAppSelector((state) => state.cart);
  const productInCart = cart.items.find(item => item.product === book._id);
  const totalOrdered = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = () => {
    console.log("Clicked Add to Cart:", book._id);
    dispatch(
      addToCart({
        product: book._id,
        name: book.title || book.name,
        price: Number(book.price || book.price),
        quantity: 1,
        inStock: book.quantity ||book.totalQuantity,
        image: book.bookCover || book.productCover || "",
    
      })
    );
    toast.success("Added to cart!");
  };

  // Function to limit the title to a maximum of three words
  const formatTitle = (title: string = "") => {
    const words = title.split(" ");
    return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : title;
  };
const bookQuantity= book.quantity ||book.totalQuantity
  const isOutOfStock = bookQuantity === totalOrdered;

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
            className={`flex items-center justify-center gap-1 px-2 py-1 border-b border-black 
              hover:text-blue-600 transition hover:border-blue-600 text-sm ${isOutOfStock ?
               "bg-gray-300 cursor-not-allowed" : ""}`}
            disabled={isOutOfStock}
          >
           {isOutOfStock ? (
  "Out of Stock"
) : (
  <>
    Add to Cart <ShoppingCart size={16} />
  </>
)}

          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
