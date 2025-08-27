import { createContext, type Dispatch } from "react";

import { type AnimalState, type AnimalAction } from "../reducers/AnimalReducer";

export type AnimalContextType = {
  state: AnimalState;
  dispatch: Dispatch<AnimalAction>;
};

export const AnimalContext = createContext<AnimalContextType>({
  state: { animals: [] },
  dispatch: (() => {}) as Dispatch<AnimalAction>,
});