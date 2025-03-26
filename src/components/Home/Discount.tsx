
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import banner images
import banner1 from "../../assets/images/slik2.jpg";
import banner2 from "../../assets/images/6795882.jpg";
import banner3 from "../../assets/images/slic3.jpg";
import banner4 from "../../assets/images/slick5.jpg";

const Discount = () => {
  const banners = [banner1, banner2, banner3, banner4];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Remove arrows for a cleaner look
  };

  return (
    <div className="mx-auto my-20">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Special Discounts 🎉
      </h2>

      {/* Wrap the Slider component outside the map */}
     <div className="max-w-6xl max-h-[900px] my-auto mx-auto">
     <Slider {...settings}>
        {banners.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="h-[300px] w-full"
          
            />
          </div>
        ))}
      </Slider>
     </div>
    </div>
  );
};

export default Discount;
