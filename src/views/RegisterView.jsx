import RegisterForm from "../components/Register/RegisterForm";
import LocationMap from "../components/ui/Map/LocationMap";

const RegisterView = () => {
  return (
    <>
      <h1 className="login-header">Registro</h1>
      <section className="login-card">
        <article className=" text-white py-2">
          <h2 className="text-center color-register pt-3 mt-3">
            Creá tu cuenta
          </h2>
          <p className="text-center pt-1 my-2 mt-3">
            Por favor, completá el formulario.
          </p>
        </article>
        <article className="d-flex flex-column">
          <RegisterForm />
        </article>
      </section>
      <section className="container d-flex flex-column g-3 mt-5">
        <LocationMap />
      </section>
    </>
  );
};
export default RegisterView;
