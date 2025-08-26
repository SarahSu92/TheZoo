import { useContext, useEffect, useState } from 'react';
import type { Animals } from '../models/Animals';
import '../sass/Animals.scss';
import { Link } from 'react-router';
import { AnimalContext } from '../context/AnimalContext';
import { AnimalFedActionTypes } from '../reducers/AnimalReducer';

export const Animal = () => {
  const [animals, setAnimals] = useState<Animals[]>([]);
  const { dispatch } = useContext(AnimalContext);

  //status to feed
  const getStatus = (lastFed: string) => {
    const now = Date.now();
    const fedTime = new Date(lastFed).getTime();
    const diffHours = (now - fedTime) / 1000 / 60 / 60; 

    if (diffHours >= 4) {
      return { status: 'Mata mig', canFeed: true };
    }
    if (diffHours >= 3) {
      return { status: 'Börjar bli hungrig', canFeed: false };
    }
    return { status: 'Matad', canFeed: false };
  };

  //fetch animals from api
  useEffect(() => {
    const getAnimals = async () => {
      const response = await fetch(
        'https://animals.azurewebsites.net/api/animals'
      );
      const animals = await response.json();
      setAnimals(
        animals.map((a: Animals) => ({
          ...a,
          lastFed: new Date().toISOString(),
        }))
      );
    };

    if (animals.length > 0) return;
    getAnimals();
  }, [animals.length]);

  return (
    <div className="container">
      {animals.map((a) => {
        const { status, canFeed } = getStatus(a.lastFed);

        return (
          <div className="animal-frame" key={a.id}>
            <h2>{a.name}</h2>
            <img
              className="animalp"
              src={a.imageUrl}
              alt={`Bild på ${a.name}`}
              onError={(e) =>
                (e.currentTarget.src = '/No-Image-Placeholder.svg')
              }
            />
            <p>{a.shortDescription}</p>
            <p>Födelseår: {a.yearOfBirth}</p>
            <Link to={`/AboutAnimal/${a.id}`} className="link">
              <h3>Besök {a.name}</h3>
            </Link>

            <p>Status: {status}</p>

            <button
              onClick={() =>
                dispatch({
                  type: AnimalFedActionTypes.FedMe,
                  payload: a.id,
                })
              }
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