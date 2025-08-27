import { Outlet } from 'react-router';
import './Layout.scss';
import { Navigation } from '../navigation/Navigation';
import { Footer } from '../footer/Footer';

export const Layout = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
