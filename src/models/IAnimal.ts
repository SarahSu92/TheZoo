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