import "./Footer.css";

const Footer = () => {
  return (
    <footer className="text-secondary">
      <hr />
      <section className="container text-center pt-5">
        <p>Copyrigth 2024 | DonPietro | Via Chiri 3017</p>
        <p>(381) 155-555-555</p>
        <div className="d-flex justify-content-evenly py-4 icon-link ">
          <a href="https://www.facebook.com/" className="icon" target="_blank">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/" className="icon" target="_blank">
            <i className="bi bi-instagram "></i>
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
