import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import Lottie from "lottie-react";
import logoAnimation from "../../assets/animation/logo.json";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, selectCurrentUser} from "../../redux/features/auth/authSlice";
import { Button } from "antd";

const navLinks = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About", path: "/about" },
  { key: "books", label: "All Books", path: "/all-books" },
  { key: "contacts", label: "Contact Us", path: "/contact" },
  { key: "dash", label: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  const cartData = useAppSelector((state) => state.cart);
  const cartQuantity =
    cartData?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="w-full bg-white py-4 px-20 lg:px-2 top-0 z-50 fixed">
      <div className="container mx-auto flex items-center justify-between">
        {/* Lottie Logo */}
        <div className="w-64 flex items-center justify-center h-10">
          <Lottie animationData={logoAnimation} loop className="w-28 h-20" />
          <span className="whitespace-nowrap text-lg font-sans text-primary font-semibold md:block">
            Chapters & Co.
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex flex-wrap justify-center gap-4 text-lg">
          {navLinks.map((link, index) => (
            <li key={link.key} className="flex font-sans items-center hover:text-[#2972b6]">
              <Link
                to={link.path}
                className={`${
                  location.pathname === link.path ? "text-[#2972b6] underline" : "text-black"
                } hover:text-[#2972b6] transition-all`}
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 && <span className="mx-2 text-black">|</span>}
            </li>
          ))}
|
          {/* Conditional Authentication Buttons */}
          {user ? (
            <Link
            
              className="text-black font-sans hover:text-[#2972b6] transition-all"
              onClick={() => dispatch(logOut())} to={""}            >
              Logout
            </Link>
          ) : (
            <Link to="/regi" className="text-black font-sans hover:text-[#2972b6] transition-all">
           
                Register 
       
            </Link>
          )}
        </ul>

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCart size={24} className="text-black hover:text-[#2972b6] transition" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartQuantity}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 z-50 left-0 w-full bg-white shadow-md p-4">
          <ul className="flex font-sans flex-col items-center gap-4 text-lg">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.path}
                  className={`block ${
                    location.pathname === link.path ? "text-[#2972b6] underline" : "text-black"
                  } hover:text-[#2972b6] transition-all`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Conditional Authentication for Mobile */}
            {user ? (
              <Button
              
                
                onClick={() => dispatch(logOut())}
              >
                Logout
              </Button>
            ) : (
              <Link to="/regi" className="text-black hover:text-[#2972b6] transition-all" onClick={() => setIsMobileMenuOpen(false)}>
       
                  Register 
         
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
