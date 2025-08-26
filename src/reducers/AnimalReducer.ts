import type { AnimalFeds } from "../models/Animals";
import { saveAnimalsToLocalStorage } from "../helpers/saveAnimalsToLocalStorage";

export enum AnimalFedActionTypes {
  FedMe,
  Tick,
  SetAnimals,
}

export type AnimalFedAction =
  | { type: AnimalFedActionTypes.FedMe; payload: number } // id som number
  | { type: AnimalFedActionTypes.Tick }
  | { type: AnimalFedActionTypes.SetAnimals; payload: AnimalFeds[] }; // direkt array

export const calculateStatus = (lastFed: string): AnimalFeds["status"] => {
  const lastFedDate = new Date(lastFed);
  const minutesSinceFed = (Date.now() - lastFedDate.getTime()) / 1000 / 60;

  if (minutesSinceFed >= 4) return "Mata mig";
  if (minutesSinceFed >= 3) return "Börjar bli hungrig";
  return "Matad";
};

export const AnimalReducer = (
  state: AnimalFeds[],
  action: AnimalFedAction
): AnimalFeds[] => {
  switch (action.type) {
    case AnimalFedActionTypes.SetAnimals: {
      // payload är redan AnimalFeds[], ingen parse behövs
      const animals: AnimalFeds[] = action.payload.map((a) => ({
        ...a,
        lastFed: new Date().toISOString(),
        status: "Matad" as AnimalFeds["status"],
      }));
      saveAnimalsToLocalStorage(JSON.stringify(animals));
      return animals;
    }

    case AnimalFedActionTypes.FedMe: {
      const animalId = action.payload;
      const updatedAnimals: AnimalFeds[] = state.map((animal) =>
        animal.id === animalId
          ? {
              ...animal,
              lastFed: new Date().toISOString(),
              status: "Matad" as AnimalFeds["status"],
            }
          : animal
      );
      saveAnimalsToLocalStorage(JSON.stringify(updatedAnimals));
      return updatedAnimals;
    }

    case AnimalFedActionTypes.Tick: {
      const updatedAnimals: AnimalFeds[] = state.map((animal) => ({
        ...animal,
        status: calculateStatus(animal.lastFed),
      }));
      saveAnimalsToLocalStorage(JSON.stringify(updatedAnimals));
      return updatedAnimals;
    }

    default:
      return state;
  }
};