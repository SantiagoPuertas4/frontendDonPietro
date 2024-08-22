import "../components/Login/Login.css";
import LoginForm from "../components/Login/LoginForm";
import LocationMap from "../components/ui/Map/LocationMap";

const LoginView = () => {
  return (
    <>
      <h1 className="login-header">Iniciar sesión</h1>
      <h2 className="login-subheader">Por favor, ingresa tus datos</h2>
      <section className="login-card">
        <div className="d-flex flex-column g-3">
          <LoginForm />
          <LocationMap />
        </div>
      </section>
    </>
  );
};

export default LoginView;
