import { Outlet } from 'react-router';
import './Layout.scss';
import { Navigation } from '../navigation/Navigation';
import { Footer } from '../footer/Footer';
import { useReducer } from 'react';
import { animalReducer } from '../reducers/AnimalReducer';
import { AnimalContext } from '../context/AnimalContext';

export const Layout = () => {
  const [state, dispatch] = useReducer(animalReducer, { animals: []});

  return (
    <AnimalContext.Provider value={{state, dispatch}}>
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
