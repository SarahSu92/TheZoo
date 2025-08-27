import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../sass/AboutAnimal.scss';
import type { IAnimalExt } from '../models/Animals';

export const AboutAnimal = () => {
  const [animalById, setAnimalById] = useState<IAnimalExt>();
  const { id } = useParams();

  // Fetch animals from api
  useEffect(() => {
    const getAnimalById = async () => {
      const response = await fetch(
        'https://animals.azurewebsites.net/api/animals/' + id
      );
      const data: IAnimalExt = await response.json();
      setAnimalById(data);
    };

    if (!animalById) getAnimalById();
  }, [animalById, id]);

  // Calculate when was the last time been fed
  const diffHours = (() => {
    if (!animalById?.lastFed) return 999; // big value = long time ago
    return (
      (Date.now() - new Date(animalById.lastFed).getTime()) / 1000 / 60 / 60
    );
  })();

  // Rules
  const canFeed = diffHours >= 4; // 1 & 2
  const needsAttention = diffHours >= 3 && diffHours < 4; //  3

  // Status-text
  let statusText = '';
  let statusClass = '';

  if (diffHours < 3) {
    statusText = `Mätt – matades senast ${new Date(
      animalById!.lastFed
    ).toLocaleTimeString()}`;
    statusClass = 'ok';
  } else if (needsAttention) {
    statusText = '⚠️ Djuret behöver snart matas';
    statusClass = 'warning';
  } else if (diffHours >= 4) {
    statusText = '⛔ Djuret behöver matas nu!';
    statusClass = 'danger';
  }

  return (
    <div className="about-container">
      <div className="about-animal">
        <h1>{animalById?.name}</h1>
        <img
          className="animalp"
          src={animalById?.imageUrl}
          alt={`Bild på ${animalById?.name}`}
          onError={(e) => {
            e.currentTarget.src = '/No-Image-Placeholder.svg';
          }}
        />
        <p>Latinska namnet: {animalById?.latinName}</p>
        <p>Födelseår: {animalById?.yearOfBirth}</p>

        <h2>Om {animalById?.name}</h2>
        <p className="description">{animalById?.longDescription}</p>

        <p className={`animal-status ${statusClass}`}>{statusText}</p>

        <button
          disabled={!canFeed}
          className={canFeed ? 'feed-btn' : 'feed-btn disabled'}
          onClick={() => {
            if (animalById) {
              setAnimalById({
                ...animalById,
                lastFed: new Date().toISOString(), // update local
              });
            }
          }}
        >
          Mata
        </button>
      </div>
    </div>
  );
};
