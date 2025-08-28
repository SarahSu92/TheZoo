import { useContext, useEffect } from 'react';
import type { Animals } from '../models/Animals';
import '../sass/Animals.scss';
import { Link } from 'react-router';
import { AnimalContext } from '../context/AnimalContext';
import { AnimalFedActionTypes } from '../reducers/AnimalReducer';

export const Animal = () => {
  const { state, dispatch } = useContext(AnimalContext);

  // Status & rules
  const getStatus = (lastFed: string) => {
    const now = Date.now();
    const fedTime = new Date(lastFed).getTime();
    const diffHours = (now - fedTime) / 1000 / 60 / 60;

    // Formatera datum + tid
    const fedDate = new Date(lastFed);
    const formattedDateTime =
      fedDate.toLocaleDateString('sv-SE', { dateStyle: 'medium' }) +
      ' kl. ' +
      fedDate.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
      });

    if (diffHours >= 5) {
      return {
        status: `⛔ Nu behöver djuret matas! - senast matad ${formattedDateTime}`,
        canFeed: true,
        className: 'danger',
      };
    }
    if (diffHours >= 3) {
      return {
        status: `⚠️ Djuret behöver snart matas – senast matad ${formattedDateTime}`,
        canFeed: false,
        className: 'warning',
      };
    }
    return {
      status: `✅ Mätt – matades senast ${formattedDateTime}`,
      canFeed: false,
      className: 'ok',
    };
  };

  // Fetch animals if context dosent exist
  useEffect(() => {
    const getAnimals = async () => {
      const response = await fetch(
        'https://animals.azurewebsites.net/api/animals'
      );
      const animals: Animals[] = await response.json();
      dispatch({ type: AnimalFedActionTypes.SetAnimals, payload: animals });
    };

    if (state.animals.length === 0) getAnimals();
  }, [state.animals.length, dispatch]);

  return (
    <div className="container">
      {state.animals.map((a) => {
        const { status, className } = getStatus(a.lastFed);

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

            {/* Status-text */}
            <p className={`animal-status ${className}`}>{status}</p>
          </div>
        );
      })}
    </div>
  );
};
