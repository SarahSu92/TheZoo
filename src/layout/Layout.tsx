import { Outlet } from 'react-router';
import './Layout.scss';
import { Navigation } from '../navigation/Navigation';
import { Footer } from '../footer/Footer';
import { AnimalContext } from '../context/AnimalContext';
import { useReducer } from 'react';
import { AnimalReducer } from '../reducers/AnimalReducer';

export const Layout = () => {
    const [animalfeds, dispatch] = useReducer(AnimalReducer, []);

    return (
    <AnimalContext.Provider value={{animalfeds, dispatch}}>
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
    )
}