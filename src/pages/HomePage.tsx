import { Link } from 'react-router';
import '../sass/HeroSection.scss';
import '../sass/HeroSection.scss';

export const Home = () => {
  return (
    <>
      <div className="herosection">
        <img
          className="heroimage"
          src={`${import.meta.env.BASE_URL}zoo-animals.jpg`}
          alt="Djurpark med apor, giraffer och lejon."
        />
        <h1 className="heroh1">Välkommen till Zoo sidan</h1>
      </div>
      <div className="heroinfo">
        <Link to={`/Animals`} className="herolink">
        <h2 className='herolink'>Besök vår djursida för att se alla djur!</h2>
        </Link>
      </div>
    </>
  );
};
