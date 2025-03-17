import { Link, useLocation } from "react-router-dom";
import bgImage from "../assets/images/Screenshot 2025-03-17 143039.png";
import { NotebookPen } from "lucide-react";

interface CommontHeroProps {
  backgroundImage?: string;
  CurrentPage?: string;
  description?: string;
}

const CommontHero = ({ backgroundImage, CurrentPage, description }: CommontHeroProps) => {
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "") || "Home";

  return (
    <div
      className="h-40 md:h-[40vh] flex mb-10 shadow-lg flex-col items-start justify-center pl-5 bg-cover bg-center bg-no-repeat relative font-sans"
      style={{ backgroundImage: `url(${backgroundImage || bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      {/* Title Section */}
      <div className="relative text-white">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <NotebookPen className="text-emerald-300" />
          <span className="text-orange-200 border-b-2 border-orange-200 px-2">
            {CurrentPage || currentPage}
          </span>
        </h1>

        {/* Small Description */}
        {description && (
          <p className="text-sm md:text-base max-w-64 
          md:max-w-96 text-gray-300 mt-2 ">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommontHero;
