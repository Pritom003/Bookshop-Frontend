import CommontHero from "../utils/CommontHero";
import Container from "../utils/container";
import bgHero from '../assets/images/classmate-classroom-sharing-international-friend-concept.jpg'
import BestBooksInTown from "../components/AboutSection/BestBooksInTown";
import HowToBuyBook from "../components/AboutSection/HowTobuyBook";

const About = () => {
    return (
   <Container>
    <CommontHero
      backgroundImage={bgHero}
      CurrentPage='About'
      description= 'Know more about Chapter and Co '
    />
<div className="mt-20">
    <BestBooksInTown></BestBooksInTown>
</div>
   <div className="">
    <HowToBuyBook></HowToBuyBook>
   </div>
   </Container>
    );
};

export default About;