import { Link } from "react-router-dom";

import "../styles/error404.css";

const Error404View = () => {
  return (
    <section className="d-flex flex-column align-items-center py-3">
      <article className="d-flex flex-column align-items-center">
        <div>
          <img className="w-100" src="/404.png" alt="" />
        </div>
        <div>
          <p className="error mt-5">ERROR</p>
        </div>
        <div className="text-center my-1 ">
          <p className="p-white">
            Parece que no encontramos lo que estabas buscando.
          </p>
        </div>
      </article>
      <article>
        <Link to={"/"}>
          <button className="btn btn-404 rounded-1 px-4 p-white">
            Ir a inicio
          </button>
        </Link>
      </article>
    </section>
  );
};

export default Error404View;
