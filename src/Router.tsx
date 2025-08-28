import { createBrowserRouter } from 'react-router';
import { Layout } from './layout/Layout';
import { Error } from './pages/ErrorPage';
import { Home } from './pages/HomePage';
import { Animal } from './pages/AnimalPage';
import {AboutAnimal} from './pages/AboutAnimal';


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/Animals',
        element: <Animal />,
      },
      {
        path: '/AboutAnimal/:id',
        element: <AboutAnimal />,
      },
      {
        path: '/Animals',
        element: <Animal />,
      },
    ],
  },
]);
