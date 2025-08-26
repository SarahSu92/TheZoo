export enum AnimalFedActionTypes {
  Hungry,
  FedMe,
  BeenFed,
}

export type AnimalFeds = {
  id: number;
  name: string;
  lastFed: Date;
  status: 'Matad' | 'Börjar bli hungrig' | 'Mata mig';
};

export type AnimalFedAction =
  | { type: AnimalFedActionTypes.Hungry; payload: string }
  | { type: AnimalFedActionTypes.FedMe; payload: string }
  | { type: AnimalFedActionTypes.BeenFed; payload: string };

  
//Calculate status fed or not
const calculateStatus = (
  lastFed: Date
): 'Matad' | 'Börjar bli hungrig' | 'Mata mig' => {
  const hoursSinceFed =
    (Date.now() - new Date(lastFed).getTime()) / (1000 * 60 * 60);
  if (hoursSinceFed < 3) return 'Matad';
  if (hoursSinceFed < 4) return 'Börjar bli hungrig';
  return 'Mata mig';
};

//Fed actions
export const AnimalReducer = (
  state: AnimalFeds[],
  action: AnimalFedAction
): AnimalFeds[] => {
  switch (action.type) {
    case AnimalFedActionTypes.FedMe:
      return state.map(
        (animal) =>
          animal.id === +action.payload
            ? {
                ...animal,
                lastFed: new Date(),
                status: calculateStatus(new Date()),
              }
            : { ...animal, status: calculateStatus(animal.lastFed) } // uppdatera status för alla djur
      );
    case AnimalFedActionTypes.Hungry:
    case AnimalFedActionTypes.BeenFed:
      return state.map((animal) => ({
        ...animal,
        status: calculateStatus(animal.lastFed),
      }));

    default:
      return state;
  }
};
