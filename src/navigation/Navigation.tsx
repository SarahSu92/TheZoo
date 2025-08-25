import { NavLink } from 'react-router';
import './Navigation.scss';

export const Navigation = () => {
  return (
    <nav>
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
