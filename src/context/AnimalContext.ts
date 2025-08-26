import { type Dispatch, createContext } from "react";
import { type AnimalFedAction, type AnimalFeds } from "../reducers/AnimalReducer";


const saved = localStorage.getItem('animalFeds');
const initialState: AnimalFeds[] = saved
  ? JSON.parse(saved).map((a: any) => ({
      ...a,
      lastFed: new Date(a.lastFed),
    }))
  : [];

export type AnimalContextType = {
    animalfeds: AnimalFeds[];
    dispatch: Dispatch<AnimalFedAction>;
}

export const AnimalContext = createContext<AnimalContextType>({
    animalfeds: [],
    dispatch: () => {},
});