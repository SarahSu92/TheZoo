import { NavLink } from 'react-router';
import './Navigation.scss';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/Animals'}>Animals</NavLink>
        </li>
      </ul>
    </nav>
  );
};
