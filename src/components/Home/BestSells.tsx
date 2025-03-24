import { useEffect, useState, useRef } from "react";
import { useGetTopOrderedProductsQuery } from "../../redux/features/Order/orderApi";
import { Rate, Spin } from "antd";
import BookCard from "../ui/BookCard/BookCard";
import Buttons from "../ui/Button/Button";
// import background from '../../assets/images/topprobg.png';

const BestSells = () => {
    const { data: topbook, isLoading, isError } = useGetTopOrderedProductsQuery(undefined);
    const leftSectionRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(true);

    // Ensure hooks are always executed in the same order
    useEffect(() => {
        const handleScroll = () => {
            const navbarHeight = 227; // h-56 = 224px
            const rightSection = document.getElementById("right-books");
            const leftSection = leftSectionRef.current;

            if (rightSection && leftSection) {
                const rightBottom = rightSection.getBoundingClientRect().bottom;
                setIsSticky(rightBottom > navbarHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Return loading state first (avoiding hooks after conditional return)
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <Spin size="large" />
            </div>
        );
    }

    if (isError || !topbook?.data?.length) {
        return (
            <div className="text-center text-red-500">
                Failed to load top books
            </div>
        );
    }

    const books = topbook.data;
    const topBook = books[0];
    const otherBooks = books.slice(1);
    console.log(books);

    return (
        <div className="relative pt-16 pb-16 md:px-4">
        {/* Background Image with Overlay */}
        <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            // style={{ backgroundImage: `url(${background})` }}
        ></div>
    
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:gap-12 justify-center mx-auto md:items-start relative z-10">
            {/* Left: Sticky Top Book */}
            <div
                ref={leftSectionRef}
                className={`transition-all ${isSticky ? "sticky top-[224px]" : ""} order-2 md:order-1`}
            >
                <div className="border-8 border-gray-600 ">
                    <img
                        src={topBook.productCover}
                        alt={topBook.name}
                        className="md:h-[400px] md:w-[300px] h-[200px] w-[150px] object-cover rounded-lg shadow-lg"
                    />
                </div>
                <p className="text-gray-600 flex flex-col md:flex-row justify-between px-4 pt-4">
                    <span className="flex text-green-700 gap-2 align-middle md:justify-between justify-start items-center">
                        {topBook.avgRating}
                        <Rate allowHalf className="text-yellow-600 text-sm" disabled defaultValue={topBook.avgRating} />
                    </span>
                    Price: ${topBook.price}
                </p>
                <h2 className="text-lg font-bold mt-2">{topBook.name}</h2>
                <Buttons to={`/book/${topBook._id}`}
                         type="submit" className="md:px-16 px-4 items-center py-2 bg-white text-lg" label="View Details" />
            </div>
    
            {/* Right: Scrollable Books */}
            <div className="relative grid justify-center align-middle items-center z-10 md:pt-16 order-1 md:order-2">
                <h1 className="font-sans text-4xl mb-4 text-center md:text-left">Top Trending Books</h1>
                <p className="text-center md:text-left pb-10">Our Top 5 Most Selling Books. Books liked by our customers.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                 justify-center gap-4 lg:gap-16 mx-auto">
                    {otherBooks.map((book) => (
                        <BookCard key={book._id} book={book} imageHeight="200px" imgewidth="150px" textAlign="start" />
                    ))}
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default BestSells;
