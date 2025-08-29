import { FaPhone, FaFacebookF, FaInstagram } from 'react-icons/fa';
import './footer.scss';

export const Footer = () => {
  return (
    <footer>
      <div className="footer-info">
        <span>
          <FaPhone className="phone" />
          00-000 00 00
        </span>
        <span>Adress: Zoostigen 25, 111 11 Borås</span>
      </div>

      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginRight: '16px' }}
      >
        <FaFacebookF size={24} color="white" />
      </a>

      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={24} color="white" />
      </a>
    </footer>
  );
};
