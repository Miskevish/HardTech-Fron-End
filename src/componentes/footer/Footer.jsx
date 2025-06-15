import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from "react-icons/fa";
import "./Footer.css";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content row">
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
            <NavLink to="/">
              <img
                src={logo}
                alt="Logo HardTech"
                className="logo-footer"
              />
            </NavLink>
          </div>

          <div className="col-12 col-md-4">
            <ul className="footer-links">
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <a href="https://x.com/" target="_blank" rel="noreferrer">
                  <FaTwitter /> X
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTiktok /> TikTok
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <ul className="footer-links">
              <li>
                <a href="/hard-tech/ruta-que-no-existe">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="/hard-tech/ruta-que-no-existe">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/hard-tech/ruta-que-no-existe">Cookies y Publicidad</a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="footer-bottom text-center">
        © 2025 HardTech. Todos los derechos reservados.
      </div>
    </footer>
  );
}
