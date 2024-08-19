import { Link } from "react-router-dom";
import "../components/Error404/error404.css";

const Error404View = () => {
  return (
    <div className="d-flex flex-column align-items-center py-3">
      <section className="d-flex flex-column align-items-center">
        <div>
          <img className="w-100" src="/404.png" alt="" />
        </div>
        <div>
          <p className="error">ERROR</p>
        </div>
        <div className="text-center my-1 ">
          <p className="p-white">
            Parece que no encontramos lo que estabas buscando.
          </p>
        </div>
      </section>
      <section>
        <Link to={"/"}>
          <button className="btn btn-404 rounded-1 px-4 p-white">
            Ir a inicio
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Error404View;
