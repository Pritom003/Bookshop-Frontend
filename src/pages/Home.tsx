import AboutUs from "../components/Home/AoutUs";
import CnCProgramming from "../components/Home/CnCProgramming";
import DisplayBook from "../components/Home/DisplayBooks";
// import CnCProgramming from "../components/Home/CnCProgramming ";
import Hero from "../components/Home/Hero";


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <AboutUs></AboutUs>
            <CnCProgramming/>
            <DisplayBook/>
        </div>
    );
};

export default Home;