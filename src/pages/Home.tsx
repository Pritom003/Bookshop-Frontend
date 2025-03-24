
import BestSells from "../components/Home/BestSells";
import CnCProgramming from "../components/Home/CnCProgramming";
import Discount from "../components/Home/Discount";

import Hero from "../components/Home/Hero";
import NewArrival from "../components/Home/NewArival";
// import NewArrival from "../components/Home/NewArival";
import SpecialPoints from "../components/Home/SpecialPoints";


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <BestSells></BestSells>
            <SpecialPoints></SpecialPoints>
            {/* <AboutUs></AboutUs> */}
         
      
            <Discount></Discount>
            <NewArrival/>
            <CnCProgramming/>
            {/* <DisplayBook/> */}
        </div>
    );
};

export default Home;