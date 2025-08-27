import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../sass/AboutAnimal.scss";
import type { IAnimalExt } from "../models/Animals";

export const AboutAnimal = () => {
  const [animalById, setAnimalById] = useState<IAnimalExt>();
  const { id } = useParams();

  // HFetch animal from api -> localstorage
  useEffect(() => {
    const getAnimalById = async () => {
      const response = await fetch(
        "https://animals.azurewebsites.net/api/animals/" + id
      );
      const data: IAnimalExt = await response.json();

      const stored = JSON.parse(localStorage.getItem("fedAnimals") || "{}");
      if (stored[data.id]) data.lastFed = stored[data.id];

      setAnimalById(data);
    };

    if (!animalById) getAnimalById();
  }, [animalById, id]);

  // Calculate hours when feed
  const diffHours = animalById?.lastFed
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
      animalById!.lastFed
    ).toLocaleTimeString()}`;
    statusClass = "ok";
  } else if (needsAttention) {
    statusText = "⚠️ Djuret behöver snart matas";
    statusClass = "warning";
  } else if (diffHours >= 4) {
    statusText = "⛔ Djuret behöver matas nu!";
    statusClass = "danger";
  }

  // Feed animal -> update localstorage
  const feedAnimal = () => {
    if (!animalById) return;
    const now = new Date().toISOString();
    setAnimalById({ ...animalById, lastFed: now });

    const stored = JSON.parse(localStorage.getItem("fedAnimals") || "{}");
    localStorage.setItem(
      "fedAnimals",
      JSON.stringify({ ...stored, [animalById.id]: now })
    );
  };

  return (
    <div className="about-container">
      <div className="about-animal">
        <h1>{animalById?.name}</h1>
        <img
          className="animalp"
          src={animalById?.imageUrl}
          alt={`Bild på ${animalById?.name}`}
          onError={(e) => {
            e.currentTarget.src = "/No-Image-Placeholder.svg";
          }}
        />
        <p>Latinska namnet: {animalById?.latinName}</p>
        <p>Födelseår: {animalById?.yearOfBirth}</p>

        <h2>Om {animalById?.name}</h2>
        <p className="description">{animalById?.longDescription}</p>

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