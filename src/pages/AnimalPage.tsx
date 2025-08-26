import { useContext, useEffect, useState } from 'react';
import type { Animals } from '../models/Animals';
import '../sass/Animals.scss';
import { Link } from 'react-router';
import { AnimalContext } from '../context/AnimalContext';
import { AnimalFedActionTypes } from '../reducers/AnimalReducer';

export const Animal = () => {
  const [animals, setAnimals] = useState<Animals[]>([]);
  const { animalfeds, dispatch } = useContext(AnimalContext);
  
  //fetch animals from api
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

  
   const getStatus = (lastFed?: Date) => {
    if (!lastFed) return { status: 'Mata mig', color: 'red', warning: 'Behöver matas nu!', canFeed: true };

    const hours = (Date.now() - lastFed.getTime()) / (1000 * 60); // 1 minut = 1 "timme" för test
    let status: 'Matad' | 'Börjar bli hungrig' | 'Mata mig' = 'Matad';
    let color = 'green';
    let warning = '';

    if (hours >= 3 && hours < 4) {
      status = 'Börjar bli hungrig';
      color = 'orange';
      warning = 'Snart behöver matas!';
    } else if (hours >= 4) {
      status = 'Mata mig';
      color = 'red';
      warning = 'Behöver matas nu!';
    }

    return { status, color, warning, canFeed: status === 'Mata mig' };
  };

  return (
    <div className="container">
      {animals.map((a) => {
        const fed = animalfeds.find(f => f.id === a.id);
        const { status, color, warning, canFeed } = getStatus(fed?.lastFed);

        return (
          <div className="animal-frame" key={a.id}>
            <h2>{a.name}</h2>
            <img
              className="animalp"
              src={a.imageUrl}
              alt={`Bild på ${a.name}`}
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
              onClick={() => dispatch({ type: AnimalFedActionTypes.FedMe, payload: String(a.id) })}
              disabled={!canFeed}
            >
              Mata
            </button>
          </div>
        );
      })}
    </div>
  );
};