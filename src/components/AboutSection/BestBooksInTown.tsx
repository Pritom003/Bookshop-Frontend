import { Circle } from 'lucide-react';
import React from 'react';
// import { FaCheckCircle } from 'react-icons/fa'; // Example icon, you can replace it with any icon
import book1 from '../../assets/images/about image.jpg';
import book2 from '../../assets/images/about-image2.jpg';
import book3 from '../../assets/images/Banner3.jpg';
const BestBooksInTown = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-20 px-5">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 text-center align-top lg:text-left mb-10 lg:mb-0">
        <h2 className="text-3xl font-bold mb-4 font-sans">Best Books in Town</h2>
        <p className="text-lg text-gray-600 mb-6">
          Discover the most popular and best-selling books that everyone is talking about. Whether you’re into thrillers, romance, or non-fiction, our curated selection has something for every reader. Dive in and explore the stories waiting for you!
        </p>
        
        <ul className="space-y-4">
          <li className="flex items-center">
            <Circle className="text-blue-500 mr-3" />
            <span className="text-gray-700 font-sans font-sans">Curated collection of top-rated books</span>
          </li>
          <li className="flex items-center">
            <Circle className="text-blue-500 mr-3" />
            <span className="text-gray-700 font-sans">Expert recommendations from our staff</span>
          </li>
          <li className="flex items-center">
            <Circle className="text-blue-500 mr-3" />
            <span className="text-gray-700 font-sans">Books for every genre and age group</span>
          </li>
          <li className="flex items-center">
            <Circle className="text-blue-500 mr-3" />
            <span className="text-gray-700 font-sans">Exclusive offers and new arrivals</span>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="w-full grid grid-cols-2 lg:w-1/2 ">
        <div className="flex justify-between mb-6 gap-2">
          <img src={book1} alt="Book 1" className="col-span-1  h-auto" />
          <img src={book2}alt="Book 2" className="col-span-1   h-auto" />
        </div>
        <img src={book3} alt="Book 3" className="col-span-2 w-full h-[200px]" />
      </div>
    </div>
  );
};

export default BestBooksInTown;
