import { useGetTopOrderedProductsQuery } from "../../redux/features/Order/orderApi";
import { Spin } from "antd";
import BookCard from "../ui/BookCard/BookCard";

const BestSells = () => {
    const { data: topbook, isLoading, isError } = useGetTopOrderedProductsQuery(undefined);

    if (isLoading) return <div className="flex justify-center items-center h-60"><Spin size="large" /></div>;
    if (isError || !topbook?.data?.length) return <div className="text-center text-red-500">Failed to load top books</div>;

    const books = topbook.data;
    const topBook = books[0];
    const otherBooks = books.slice(1);
console.log(topBook);
    return (
        <div className="flex gap-4 justify-center items-center ">
            {/* Left: Top book (big size) */}
            <div className="col-span-1 row-span-2">
                <img src={topBook.productCover} alt={topBook.name} className="w-full h-full object-cover rounded-lg shadow-lg" />
                <h2 className="text-lg font-bold mt-2">{topBook.name}</h2>
                <p className="text-gray-600">Price: ${topBook.Price}</p>
            </div>
            
            {/* Right: Other books (2x2 grid) */}
            <div>
            <h1 className="font-sans text-4xl ">Top Trending Book 2022</h1>
            <div className="col-span-2 grid grid-cols-2 ">
             
                {otherBooks.map((book) => (
                    <BookCard key={book._id} book={book} imageHeight={'190px'} imgewidth={'120px'} textAlign={'start'} />
                ))}
            </div>
            </div>
        </div>
    );
};

export default BestSells;