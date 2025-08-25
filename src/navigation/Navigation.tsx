import { NavLink } from 'react-router';
import './Navigation.scss';

export const Navigation = () => {
  return (
    <nav>
      <a href="/" className='logo'>The Zoo</a>
      <ul>
        <li>
          <NavLink to={'/'}>Hem</NavLink>
        </li>
        <li>
          <NavLink to={'/Animals'}>Djuren</NavLink>
        </li>
      </ul>
    </nav>
  );
};
