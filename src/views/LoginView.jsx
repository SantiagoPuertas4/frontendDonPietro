import LoginForm from "../components/Common/Login/LoginForm"
import LocationMap from "../components/Common/Map/LocationMap";
import '../components/Common/Login/Login.css';

const LoginView = () => {
  return (
    <>
      <h1 className="login-header">Iniciar sesión</h1>
      <h2 className="login-subheader">Por favor, ingresa tus datos</h2>
      <section className="login-card">
        <div className="row g-3">
          <article className="col-12">
            <LoginForm />
          </article>
          <article className="col-12">
            <LocationMap/>
          </article>
        </div>
      </section>
    </>
  );
};

export default LoginView;
