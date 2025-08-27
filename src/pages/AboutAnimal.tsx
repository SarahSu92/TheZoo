import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import "../sass/AboutAnimal.scss";
import type { Animals } from "../models/Animals";
import { AnimalContext } from "../context/AnimalContext";
import { AnimalFedActionTypes } from "../reducers/AnimalReducer";

export const AboutAnimal = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useContext(AnimalContext);
  const [animalById, setAnimalById] = useState<Animals | null>(null);

  // Fetch animal from api if context dosent exist
  useEffect(() => {
    const found = state.animals.find((a) => a.id === Number(id));
    if (found) {
      setAnimalById(found);
    } else {
      const getAnimal = async () => {
        const response = await fetch(
          `https://animals.azurewebsites.net/api/animals/${id}`
        );
        const data: Animals = await response.json();
        setAnimalById(data);
        dispatch({
          type: AnimalFedActionTypes.SetAnimals,
          payload: [...state.animals, data],
        });
      };
      getAnimal();
    }
  }, [id, state.animals, dispatch]);

  if (!animalById) return <p>Laddar...</p>;

  // Calculate hours since been fed
  const diffHours = animalById.lastFed
    ? (Date.now() - new Date(animalById.lastFed).getTime()) / 1000 / 60 / 60
    : 999;

  // Rules
  const canFeed = diffHours >= 4;
  const needsAttention = diffHours >= 3 && diffHours < 4;

  // Status-text
  let statusText = "";
  let statusClass = "";

  if (diffHours < 3) {
    statusText = `✅ Mätt – matades senast ${new Date(
      animalById.lastFed
    ).toLocaleTimeString()}`;
    statusClass = "ok";
  } else if (needsAttention) {
    statusText = "⚠️ Djuret behöver snart matas";
    statusClass = "warning";
  } else if (diffHours >= 4) {
    statusText = "⛔ Djuret behöver matas nu!";
    statusClass = "danger";
  }

  // Feed animal -> update localstate
  const feedAnimal = () => {
    if (!animalById) return;
    const now = new Date().toISOString();
    dispatch({
      type: AnimalFedActionTypes.FedMe,
      payload: animalById.id,
    });
    
    setAnimalById({ ...animalById, lastFed: now });
  };

  return (
    <div className="about-container">
      <div className="about-animal">
        <h1>{animalById.name}</h1>
        <img
          className="animalp"
          src={animalById.imageUrl}
          alt={`Bild på ${animalById.name}`}
          onError={(e) => {
            e.currentTarget.src = "/No-Image-Placeholder.svg";
          }}
        />
        <p>Latinska namnet: {animalById.latinName}</p>
        <p>Födelseår: {animalById.yearOfBirth}</p>

        <h2>Om {animalById.name}</h2>
        <p className="description">{animalById.longDescription}</p>

        {/* Status-text */}
        <p className={`animal-status ${statusClass}`}>{statusText}</p>

        {/* Btn */}
        <button
          onClick={feedAnimal}
          disabled={!canFeed}
          className={canFeed ? "feed-btn" : "feed-btn disabled"}
        >
          Mata
        </button>
      </div>
    </div>
  );
};