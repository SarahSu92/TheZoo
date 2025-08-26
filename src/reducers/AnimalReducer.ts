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

//Fed actions
export const AnimalReducer = (
  state: AnimalFeds[],
  action: AnimalFedAction
): AnimalFeds[] => {
  switch (action.type) {
    case AnimalFedActionTypes.FedMe:
      return state.map(animal =>
        animal.id === +action.payload
          ? {
              ...animal,
              lastFed: new Date(), // update lastfed
            }
          : animal 
      );

    case AnimalFedActionTypes.Hungry:
    case AnimalFedActionTypes.BeenFed:
      return state; 

    default:
      return state;
  }
};