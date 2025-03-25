// import { Button } from 'antd';
import { Link } from 'react-router-dom';
import HeroBg from '../../assets/images/rm222batch3-mind-12.jpg';
import floatimg from '../../assets/images/image for banner.png';
import '../../Styles/HeroBanner.css';
import Buttons from '../ui/Button/Button';
// import Button from '../ui/Button/Button';

const Hero = () => {
  return (
    <div 
      className="relative w-full h-[80vh] min-h-[580px] flex pt-40 lg:pt-14 items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black
      bg-opacity-10"></div>


      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-10/12 mx-auto">
        {/* Left Side Text Content */}
        <div className="text-black max-w-lg font-sans">
          <h1 className="lg:text-4xl text-2xl  font-bold leading-tight">
            Discover <br />
       
          </h1>
          <span className="bg-gradient-to-r lg:text-4xl text-2xl mt-4s
             from-[#2972b6] to-[#4ebcff] text-transparent bg-clip-text">
              The Best Books
            </span>
          {/* Animated Curved Underline */}
          <div className="relative w-40 h-4 mt-2">
  <svg
    className="absolute w-full h-full animate-fade"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 20"
    fill="none"
  >
    <path
      d="M1 2 Q 100 -9, 300 2"  // Flipped curve
      stroke="#2972b6"
      strokeWidth="4"  // Thicker line
      strokeLinecap="round"
      strokeDasharray="250"
      strokeDashoffset="250"
      className="animate-dash"
    />
  </svg>
</div>


          <h1 className="lg:text-4xl text-2xl font-bold leading-tight mt-2">Of All Day</h1>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua tenim.
          </p>

 
<Buttons  label="Get Started" 
                to='/all-books'
                className="rounded-full py-8  p-4 text-xs font-extralight "  />


        </div>

        {/* Right-Side Floating Image */}
        <Link to="/all-books" className="w-1/2  relative mt-10 md:mt-0">
        <div className="flex justify-center align-middle ">
         {/* <img 
            src={currentBook || floatimg}  // Use productCover here
            alt="Floating Book" 
         
          /> */}
          <p   className="  min-w-64 lg:text-xl text-xs  absolute
           lg:right-96 right-44    top-2  mt-10 w-[80px] ">
          “Some books leave us free and some  books make us free.”
          </p>
          <img src={floatimg} alt="Floating Book" className="w-full object-contain animate-float" />
         </div>
         
          
        </Link>
      </div>
    </div>
  );
};

export default Hero;
