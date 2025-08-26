import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../sass/AboutAnimal.scss';
import { AnimalContext } from '../context/AnimalContext';
import { AnimalFedActionTypes } from '../reducers/AnimalReducer';
import type { IAnimalExt } from '../models/Animals';

export const AboutAnimal = () => {
  const { dispatch } = useContext(AnimalContext);
  const [animalById, setAnimalById] = useState<IAnimalExt>();
  const { id } = useParams();

  // Hjälpfunktion för status på översiktssidan
  const getOverviewStatus = (lastFed?: string) => {
    if (!lastFed) return { status: 'Okänt', className: '' };
    const diffHours = (Date.now() - new Date(lastFed).getTime()) / 1000 / 60 / 60;

    if (diffHours >= 5) return { status: 'Behöver matas nu', className: 'danger' };
    if (diffHours >= 3) return { status: 'Snart behöver mat', className: 'warning' };
    return { status: 'Mätt', className: 'ok' };
  };

  // Fetch djuret från API om det inte redan finns i context
  useEffect(() => {
    const getAnimalById = async () => {
      const response = await fetch('https://animals.azurewebsites.net/api/animals/' + id);
      const data: IAnimalExt = await response.json();
      setAnimalById(data);
    };

    if (!animalById) getAnimalById();
  }, [animalById, id]);

  // Räkna om knappen ska vara klickbar (kan matas)
  const canFeed = (() => {
    if (!animalById?.lastFed) return true;
    const diffHours = (Date.now() - new Date(animalById.lastFed).getTime()) / 1000 / 60 / 60;
    return diffHours >= 5; // Klickbar om ≥5 timmar
  })();

  const { status, className } = getOverviewStatus(animalById?.lastFed);

  return (
    <div className="about-container">
      <div className="about-animal">
        <h1>{animalById?.name}</h1>
        <img
          className="animalp"
          src={animalById?.imageUrl}
          alt={`Bild på ${animalById?.name}`}
          onError={(e) => { e.currentTarget.src = '/No-Image-Placeholder.svg'; }}
        />
        <p>Latinska namnet: {animalById?.latinName}</p>
        <p>Födelseår: {animalById?.yearOfBirth}</p>

        <h2>Om {animalById?.name}</h2>
        <p className="description">{animalById?.longDescription}</p>

        <p className={`animal-status ${className}`}>Status: {status}</p>

        <button
          onClick={() => {
            if (!animalById) return;
            dispatch({
              type: AnimalFedActionTypes.FedMe,
              payload: animalById.id, // save in reducer/context
            });
          }}
          disabled={!canFeed}
        >
          Mata
        </button>
      </div>
    </div>
  );
};