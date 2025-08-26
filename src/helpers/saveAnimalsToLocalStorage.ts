import type { AnimalFeds } from "../models/Animals";

export const saveAnimalsToLocalStorage = (value: string): void => {
  localStorage.setItem("animalfeds", value);
};

export const loadAnimalsFromLocalStorage = (): AnimalFeds[] | null => {
  const data = localStorage.getItem("animalfeds");
  if (!data) return null;

  try {
    const animals: AnimalFeds[] = JSON.parse(data);
    return animals;
  } catch {
    return null;
  }
};