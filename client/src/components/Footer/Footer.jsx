// src/components/Footer.jsx
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://www.facebook.com/empiezaporeducar" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.twitter.com/empiezaporeducar" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/empiezaporeducar" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com/company/empiezaporeducar" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
        <div className="footer-info">
          <p>&copy; 2024 Empieza Por Educar. Todos los derechos reservados.
            <a href="#politica-de-privacidad">Política de Privacidad</a> |
            <a href="#aviso-legal">Aviso Legal</a> |
            <a href="#politica-de-cookies">Política de Cookies</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
