import { Outlet } from 'react-router';
import './Layout.scss';
import { Navigation } from '../navigation/Navigation';
import { Footer } from '../footer/Footer';
import { useEffect, useReducer } from 'react';
import { animalReducer, type AnimalState } from '../reducers/AnimalReducer';
import { AnimalContext } from '../context/AnimalContext';

export const Layout = () => {
  const [state, dispatch] = useReducer(
    animalReducer, JSON.parse(localStorage.getItem("animals") || '{"animals": []}') as AnimalState
  );

  useEffect(() => {
    localStorage.setItem("animals", JSON.stringify(state))
  }, [state]);
  
  
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
