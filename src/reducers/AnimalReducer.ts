import type { AnimalFeds } from "../models/Animals";
import { saveAnimalsToLocalStorage } from "../helpers/saveAnimalsToLocalStorage";

export enum AnimalFedActionTypes {
  FedMe,
  SetAnimals,
}

export type AnimalFedAction =
  | { type: AnimalFedActionTypes.FedMe; payload: number }
  | { type: AnimalFedActionTypes.SetAnimals; payload: AnimalFeds[] };

export const calculateStatus = (lastFed: string): AnimalFeds["status"] => {
  const diffHours = (Date.now() - new Date(lastFed).getTime()) / 1000 / 60 / 60;

  if (diffHours >= 4) return "Mata mig";
  if (diffHours >= 3) return "Börjar bli hungrig";
  return "Matad";
};

export const AnimalReducer = (
  state: AnimalFeds[],
  action: AnimalFedAction
): AnimalFeds[] => {
  switch (action.type) {
    case AnimalFedActionTypes.SetAnimals:
      saveAnimalsToLocalStorage(JSON.stringify(action.payload));
      return action.payload;

    case AnimalFedActionTypes.FedMe: {
  const updated = state.map((animal) =>
    animal.id === action.payload
      ? {
          ...animal,
          lastFed: new Date().toISOString(),
          status: "Matad" as AnimalFeds["status"],
        }
      : { ...animal, status: calculateStatus(animal.lastFed) }
  );
  saveAnimalsToLocalStorage(JSON.stringify(updated));
  return updated;
}

    default:
      return state;
  }
};