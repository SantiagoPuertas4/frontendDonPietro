import LoginForm from "../components/Common/Login/LoginForm";

const LoginView = () => {
  return (
    <>
      <h1 className="text-center text-white" style={{ padding: "20px 0", backgroundColor: "#ef8a3a" }}>Iniciar sesión</h1>
      <h2 className="text-center text-white">Por favor ingresa tus datos</h2>
      <section
        className="card bg-white text-dark p-3 container-sm mx-auto"
        style={{ maxWidth: "500px" }}
      >
        
        <div className="row g-3">
          {/* Parte izquierda */}
          <article className="col-12">
            <hr />
            <LoginForm />
          </article>

          {/* Parte derecha */}
          <article className="col-12">
            <img
              alt="Hamburguesa"
              className="rounded w-100"
              src="/img-login.png"
            />
          </article>
        </div>
      </section>
    </>
  );
};
export default LoginView;
