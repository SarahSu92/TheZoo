import { Outlet } from 'react-router';
import './Layout.scss';
import { Navigation } from '../navigation/Navigation';
import { Footer } from '../footer/Footer';
import { AnimalContext } from '../context/AnimalContext';
import { useReducer } from 'react';
import { AnimalReducer } from '../reducers/AnimalReducer';
import type { AnimalFeds } from '../models/Animals';
import { loadAnimalsFromLocalStorage } from '../helpers/saveAnimalsToLocalStorage';

export const Layout = () => {
  const initialAnimals: AnimalFeds[] = loadAnimalsFromLocalStorage() || [];
  const [animalfeds, dispatch] = useReducer(AnimalReducer, initialAnimals);

  return (
    <AnimalContext.Provider value={{ animalfeds, dispatch }}>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </AnimalContext.Provider>
  );
};
