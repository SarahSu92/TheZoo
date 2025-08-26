import { type Dispatch, createContext } from "react";
import { type AnimalFedAction, type AnimalFeds } from "../reducers/AnimalReducer";




export type AnimalContextType = {
    animalfeds: AnimalFeds[];
    dispatch: Dispatch<AnimalFedAction>;
}

export const AnimalContext = createContext<AnimalContextType>({
    animalfeds: [],
    dispatch: () => {},
});