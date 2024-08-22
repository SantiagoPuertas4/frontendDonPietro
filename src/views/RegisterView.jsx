import RegisterForm from "../components/Register/RegisterForm";

const RegisterView = () => {
  return (
    <>
      <h1 className="bg-register text-white text-center p-2">Registro</h1>
      <section className="container">
        <div className="bg-black text-white py-2">
          <h2 className="text-center color-register pt-3">Creá tu cuenta</h2>
          <p className="text-center pt-1">Por favor, completá el formulario.</p>
        </div>
        <RegisterForm />
      </section>
    </>
  );
};
export default RegisterView;
