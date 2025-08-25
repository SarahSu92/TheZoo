import { useEffect, useState } from 'react';
import type { Animals } from '../models/Animals';
import '../sass/Animals.scss';


export const Animal = () => {
  const [animals, setAnimals] = useState<Animals[]>([]);

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
              e.currentTarget.src = 'public/No-Image-Placeholder.svg'; 
            }}
          />
          <p>{a.shortDescription}</p>
          <p>{a.latinName}</p>
          <p>{a.yearOfBirth}</p>
          <h3>{a.longDescription}</h3>
          <button>Mata</button>
        </div>
      ))}
    </div>
  );
};
