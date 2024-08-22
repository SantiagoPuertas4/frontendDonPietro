import RegisterForm from "../components/Register/RegisterForm";
import LocationMap from "../components/ui/Map/LocationMap";

const RegisterView = () => {
  return (
    <>
      <h1 className="login-header">Registro</h1>
      <section className="login-card">
        <div className=" text-white py-2">
          <h2 className="text-center color-register pt-3 mt-3">
            Creá tu cuenta
          </h2>
          <p className="text-center pt-1 my-2 mt-3">
            Por favor, completá el formulario.
          </p>
        </div>
        <div className="d-flex flex-column">
          <RegisterForm />
          <LocationMap />
        </div>
      </section>
    </>
  );
};
export default RegisterView;
