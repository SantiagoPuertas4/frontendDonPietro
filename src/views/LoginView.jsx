import LoginForm from "../components/Login/LoginForm";
import LocationMap from "../components/ui/Map/LocationMap";

import "../components/Login/Login.css";

const LoginView = () => {
  return (
    <>
      <h1 className="login-header">Iniciar sesión</h1>
      <h2 className="login-subheader">Por favor, ingresa tus datos</h2>
      <section className="login-card">
        <article className="d-flex flex-column g-3">
          <LoginForm />
        </article>
      </section>
      <section className="container d-flex flex-column g-3 mt-5">
        <LocationMap />
      </section>
    </>
  );
};

export default LoginView;
