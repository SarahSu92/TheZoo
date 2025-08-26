import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
    return(
    <footer>
     <ul>
        <li>
            Kontakta oss: 00-000 00 00 <br />
            Adress: Zoostigen 25
            111 11 Borås
        </li>
         <li>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={24} />
          </a>
        </li>
         <li>
           <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </li>
     </ul>
    </footer>
    );
};