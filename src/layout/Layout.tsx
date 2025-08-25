import { Outlet } from 'react-router';
import './Layout.scss';
import { Navigation } from '../navigation/Navigation';

export const Layout = () => {
    return<>
    <header>
        <Navigation />
    </header>
    <main>
        <Outlet />
    </main>
    <footer>
        
    </footer>
    </>
}