import { useEffect, useState } from "react"
import type { IAnimalExt } from "../models/IAnimal";
import { useParams } from "react-router";
import '../sass/AboutAnimal.scss';

export const AboutAnimal = () => {
    const [animalById, setAnimalById] = useState<IAnimalExt>();
    const { id } = useParams();

    useEffect(() => {
        const getAnimalById = async () => {
            const response = await fetch(
                "https://animals.azurewebsites.net/api/animals/" + id,
            );
            const data: IAnimalExt = await response.json();

            setAnimalById(data);
        };

        if (animalById) return;

        getAnimalById();
    });


    return(
  <div className="about-container">
    <div className="about-animal">
    <h1>{animalById?.name}</h1>
    <img
            src={animalById?.imageUrl}
            alt={`Bild på ${animalById?.name}, som heter ${animalById?.latinName} på latin. ${animalById?.shortDescription}`}
            onError={(e) => {
              e.currentTarget.src = '/No-Image-Placeholder.svg'; 
            }}
          />
    <p>Latinska namnet: {animalById?.latinName}</p>
    <p>Födelseår {animalById?.yearOfBirth}</p>
    <h2>Om {animalById?.name}</h2>
    <p>{animalById?.longDescription}</p>
     </div>
  </div>
 
  );
}