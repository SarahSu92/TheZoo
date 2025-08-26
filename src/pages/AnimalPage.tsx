import { useContext, useEffect, useState } from 'react';
import type { Animals } from '../models/Animals';
import '../sass/Animals.scss';
import { Link } from 'react-router';
import { AnimalContext } from '../context/AnimalContext';
import { AnimalFedActionTypes } from '../reducers/AnimalReducer';


export const Animal = () => {
  const [animals, setAnimals] = useState<Animals[]>([]);
  const { animalfeds, dispatch } = useContext(AnimalContext);

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



  return (
    <div className="container">
      {animals.map((a) => (
        <div className="animal-frame" key={a.id}>
          <h2>{a.name}</h2>

          <img
            src={a.imageUrl}
            alt={`Bild på ${a.name}, som heter ${a.latinName} på latin. ${a.shortDescription}`}
            onError={(e) => {
              e.currentTarget.src = '/No-Image-Placeholder.svg'; 
            }}
          />
          <p>{a.shortDescription}</p>
          <p>Födelseår: {a.yearOfBirth}</p>
          <Link to={`/AboutAnimal/${a.id}`} className='link'>
            <h3>Besök {a.name}</h3>
          </Link>
           <p>
          Status: {animalfeds.find((f) => f.id === a.id)?.status || 'Okänt'}
        </p>
          <button
          onClick={() =>
            dispatch({ type: AnimalFedActionTypes.FedMe, payload: String(a.id) })
          }
          disabled={animalfeds.find((f) => f.id === a.id)?.status !== 'Mata mig'}
        >
        Mata 
        </button>
        </div>
      ))}
    </div>
  );
};
