// reducers/AnimalReducer.ts
import type { Animals } from '../models/Animals';

export enum AnimalFedActionTypes {
  FedMe = 'FedMe',
  SetAnimals = 'SetAnimals',
}

export type AnimalAction =
  | { type: AnimalFedActionTypes.FedMe; payload: number }
  | { type: AnimalFedActionTypes.SetAnimals; payload: Animals[] };

export type AnimalState = {
  animals: Animals[];
};

export const animalReducer = (
  state: AnimalState,
  action: AnimalAction
): AnimalState => {
  switch (action.type) {
    
    // Update the lastFed timestamp of a specific animal
    case AnimalFedActionTypes.FedMe: {
      const now = new Date().toISOString();
      return {
        ...state,
        animals: state.animals.map((a) =>
          a.id === action.payload
            ? {
                ...a,
                lastFed: now, // only update this animal
              }
            : a
        ),
      };
    }

    case AnimalFedActionTypes.SetAnimals:
      return { ...state, animals: action.payload };

    default:
      return state;
  }
};
