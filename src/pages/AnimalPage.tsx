import { useEffect, useState } from "react";
import type { Animals } from "../models/Animals";
import "../sass/Animals.scss";
import { Link } from "react-router";

export const Animal = () => {
  const [animals, setAnimals] = useState<Animals[]>([]);

  // Status & rules
  const getStatus = (lastFed: string) => {
    const now = Date.now();
    const fedTime = new Date(lastFed).getTime();
    const diffHours = (now - fedTime) / 1000 / 60 / 60;

    if (diffHours >= 5) {
      return {
        status: "⛔ Nu behöver djuret matas!",
        canFeed: true,
        className: "danger",
      };
    }
    if (diffHours >= 3) {
      return {
        status: "⚠️ Djuret behöver snart matas",
        canFeed: false,
        className: "warning",
      };
    }
    return {
      status: `✅ Mätt – matades senast ${new Date(lastFed).toLocaleTimeString()}`,
      canFeed: false,
      className: "ok",
    };
  };

  // Feed animal check localstorage
  useEffect(() => {
    const getAnimals = async () => {
      const response = await fetch(
        "https://animals.azurewebsites.net/api/animals"
      );
      let animals = await response.json();

      const stored = JSON.parse(localStorage.getItem("fedAnimals") || "{}");
      animals = animals.map((a: Animals) => ({
        ...a,
        lastFed: stored[a.id] || a.lastFed,
      }));

      setAnimals(animals);
    };

    if (animals.length === 0) getAnimals();
  }, [animals.length]);

  // Feed animal -> update localstorage
  const feedAnimal = (id: number) => {
    const now = new Date().toISOString();
    setAnimals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, lastFed: now } : a))
    );

    const stored = JSON.parse(localStorage.getItem("fedAnimals") || "{}");
    localStorage.setItem(
      "fedAnimals",
      JSON.stringify({ ...stored, [id]: now })
    );
  };

  return (
    <div className="container">
      {animals.map((a) => {
        const { status, canFeed, className } = getStatus(a.lastFed);

        return (
          <div className="animal-frame" key={a.id}>
            <h2>{a.name}</h2>
            <img
              className="animalp"
              src={a.imageUrl}
              alt={`Bild på ${a.name}`}
              onError={(e) =>
                (e.currentTarget.src = "/No-Image-Placeholder.svg")
              }
            />
            <p>{a.shortDescription}</p>
            <p>Födelseår: {a.yearOfBirth}</p>
            <Link to={`/AboutAnimal/${a.id}`} className="link">
              <h3>Besök {a.name}</h3>
            </Link>

            {/* Status-text */}
            <p className={`animal-status ${className}`}>{status}</p>

            {/* Btn */}
            <button
              onClick={() => feedAnimal(a.id)}
              disabled={!canFeed}
              className={canFeed ? "feed-btn" : "feed-btn disabled"}
            >
              Mata
            </button>
          </div>
        );
      })}
    </div>
  );
};