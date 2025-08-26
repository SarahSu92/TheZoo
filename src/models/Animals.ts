export type Animals = {
    status: string;
    id: number;
    name: string;
    latinName: string;
    yearOfBirth: number;
    shortDescription: string;
    longDescription: string;
    imageUrl: string;
    lastFed: string;
    isFed: string;
}


export type AnimalFeds = {
  id: number;
  name: string;
  lastFed: string; // ISO-date as string
  status: 'Matad' | 'Börjar bli hungrig' | 'Mata mig';
  imageUrl: string;
  shortDescription: string;
  yearOfBirth: number;

};

export interface IAnimal {
    id: number;
    name: string;
    latinName: string;
    yearOfBirth: number;
    shortDescription: string;
    longDescription: string;
    imageUrl: string;
}

export interface IAnimalExt extends IAnimal {
    medicine: string;
    isFed: boolean;
    lastFed: string;
    beenFed: string;
}