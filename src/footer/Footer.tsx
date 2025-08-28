import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer>
      <p className="pfooter">Kontakta oss: 00-000 00 00</p>
      <p className="pfooter">Adress: Zoostigen 25 111 11 Borås</p>

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
