import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import Lottie from "lottie-react";
import logoAnimation from "../../assets/animation/logo.json";

const navLinks = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About", path: "/about" },
  { key: "books", label: "All Books", path: "/all-books" },
  { key: "contacts", label: "Contact Us", path: "/contact" },
  { key: "register", label: "Register", path: "/regi" },
];

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white  py-4 px-20 lg:px-2  top-0 z-50 fixed">
      <div className="container mx-auto flex items-center  justify-between">
        {/* Lottie Logo */}
        <div className="w-64 flex items-center justify-center 
        h-10 ">
          <Lottie animationData={logoAnimation}
           loop className="w-28 h-20" />
          <span className="whitespace-nowrap text-lg font-sans
           text-primary font-semibold  md:block">
            Chapters & Co.
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex flex-wrap justify-center gap-4 text-lg ">
          {navLinks.map((link, index) => (
            <li key={link.key} className="flex font-sans 
             items-center hover:text-[#2972b6]">
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
        </ul>

        {/* Mobile Menu Button (md) */}
        <button
          className="md:hidden flex items-center text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 z-50 left-0 w-full bg-white shadow-md p-4">
          <ul className="flex font-sans  
           flex-col items-center gap-4 text-lg ">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.path}
                  className={`block ${
                    location.pathname === link.path ? "text-[#2972b6] un" : "text-black"
                  } hover:text-[#2972b6] transition-all`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
