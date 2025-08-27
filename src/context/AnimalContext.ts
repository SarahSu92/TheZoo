import { createContext } from "react";

import { type AnimalState, type AnimalAction } from "../reducers/AnimalReducer";

export type AnimalContextType = {
  state: AnimalState;
  dispatch: React.Dispatch<AnimalAction>;
};

export const AnimalContext = createContext<AnimalContextType>({
  state: { animals: [] },
  dispatch: () => null,
});
