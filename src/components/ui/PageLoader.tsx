import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/loading.json"; // Path to your Lottie file

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
      <Lottie animationData={loadingAnimation} loop className="w-96 h-96" />
    </div>
  );
};

export default PageLoader;
