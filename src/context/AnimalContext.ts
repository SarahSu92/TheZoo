import { type Dispatch, createContext } from "react";
import { type AnimalFedAction } from "../reducers/AnimalReducer";
import type { AnimalFeds } from "../models/Animals";

export type AnimalContextTypes = {
    animalfeds: AnimalFeds[];
    dispatch: Dispatch<AnimalFedAction>;
}

export const AnimalContext = createContext<AnimalContextTypes>({
    animalfeds: [],
    dispatch: () => {},
});


