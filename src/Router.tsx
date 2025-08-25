import { createBrowserRouter } from "react-router";
import { Layout } from "./layout/Layout";
import { Error } from "./pages/ErrorPage";
import { Home } from "./pages/HomePage";
import { Animals } from "./pages/AnimalPage";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/Animals',
                element: <Animals />
            },
        ],
    },
]);