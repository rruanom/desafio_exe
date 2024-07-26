import React from "react";
import logo from '../../assets/logo_exe.png'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://www.facebook.com/empiezaporeducar" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com/empiezaporeducar" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/empiezaporeducar" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/company/empiezaporeducar" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
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
