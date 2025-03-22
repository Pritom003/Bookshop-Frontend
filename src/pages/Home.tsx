import AboutUs from "../components/Home/AoutUs";
import BestSells from "../components/Home/BestSells";
import CnCProgramming from "../components/Home/CnCProgramming";
import DisplayBook from "../components/Home/DisplayBooks";
import Hero from "../components/Home/Hero";


const Home = () => {
    return (
        <div>
            <Hero></Hero>

            <AboutUs></AboutUs>
            <BestSells></BestSells>
            <CnCProgramming/>
            <DisplayBook/>
        </div>
    );
};

export default Home;