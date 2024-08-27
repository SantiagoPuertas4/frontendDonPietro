import { Link } from "react-router-dom";

export const WordsAbout = () => {
  return (
    <section className="container mt-4 presentation">
      <h2 className="title-pietro">Don Pietro es familia</h2>
      <p className="m-4 mb-4">
        En Don Pietro, cada comida es una celebración de la tradición y el
        cariño familiar.
        <br />
        Fundado con el espíritu de reunir a las familias alrededor de una mesa,
        nuestro restaurante combina recetas auténticas italianas con un ambiente
        cálido y acogedor.
        <br />
        Creemos que los momentos compartidos con seres queridos son los más
        valiosos, y nos esforzamos por crear una experiencia culinaria que haga
        que cada visita se sienta como un reencuentro familiar.
        <br />
        Bienvenidos a Don Pietro, donde cada plato se sirve con amor y cada
        cliente es parte de nuestra gran familia.
      </p>
      <Link to="/about">
        <button className="btn-order">Conocé más...</button>
      </Link>
    </section>
  );
};

export default WordsAbout;
