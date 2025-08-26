import { useContext, useEffect, useState } from 'react';
import type { Animals } from '../models/Animals';
import '../sass/Animals.scss';
import { Link } from 'react-router';
import { AnimalContext } from '../context/AnimalContext';
import { AnimalFedActionTypes } from '../reducers/AnimalReducer';


export const Animal = () => {
  const [animals, setAnimals] = useState<Animals[]>([]);
  const { animalfeds, dispatch } = useContext(AnimalContext);
  const [, setTick] = useState(0);

  useEffect(() => {
    const getAnimals = async () => {
      const response = await fetch(
        'https://animals.azurewebsites.net/api/animals'
      );
      const animals = await response.json();
      setAnimals(animals);
    };

    if (animals.length > 0) return;
    getAnimals();
  });

  //Update tick every minute
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60 * 1000); // 1 minut
    return () => clearInterval(interval);
  }, []);

  //function to count status
  const getStatus = (animalId: number) => {
    const a = animalfeds.find(f => f.id === animalId);
    if (!a) return { status: 'Senast matad', canFeed: false };

    const hoursSinceFed = (Date.now() - new Date(a.lastFed).getTime()) / (1000 * 60 * 60);
    let status: typeof a.status = 'Matad';
    if (hoursSinceFed >= 3 && hoursSinceFed < 4) status = 'Börjar bli hungrig';
    if (hoursSinceFed >= 4) status = 'Mata mig';
    const canFeed = status === 'Mata mig';

    return { status, canFeed };
  };



  return (
    <div className="container">
      {animals.map((a) => {
        const { status, canFeed } = getStatus(a.id);

         let color = 'green';
        let warning = '';
        if (status === 'Börjar bli hungrig') {
          color = 'orange';
          warning = 'Snart behöver matas!';
        } else if (status === 'Mata mig') {
          color = 'red';
          warning = 'Behöver matas nu!';
        }

        return (
          <div className="animal-frame" key={a.id}>
            <h2>{a.name}</h2>
            <img
              className="animalp"
              src={a.imageUrl}
              alt={`Bild på ${a.name}, som heter ${a.latinName} på latin. ${a.shortDescription}`}
              onError={(e) => (e.currentTarget.src = '/No-Image-Placeholder.svg')}
            />
            <p>{a.shortDescription}</p>
            <p>Födelseår: {a.yearOfBirth}</p>
            <Link to={`/AboutAnimal/${a.id}`} className="link">
              <h3>Besök {a.name}</h3>
            </Link>

            Status: <strong style={{ color }}>{status}</strong>
            {warning && <p style={{ color, fontWeight: 'bold' }}>{warning}</p>}
            <button
              onClick={() =>
                dispatch({ type: AnimalFedActionTypes.FedMe, payload: String(a.id) })
              }
              disabled={!canFeed} //button is active when canfeed is true
            >
              Mata
            </button>
          </div>
        );
      })}
    </div>
  );
};
