import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="text-secondary">
      <hr />
      <section className="container text-center pt-5">
        <p>
          Copyrigth 2024 | DonPietro | Gral. Paz 576 | Camino del Perú esq.
          Esquiú
        </p>
        <p>(381) 155-555-555</p>
        <article className="d-flex justify-content-center pb-4 icon-link ">
          <Link to="/404" className="icon">
            <i className="bi bi-facebook"></i>
          </Link>
          <Link to="/404" className="icon">
            <i className="bi bi-instagram "></i>
          </Link>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
