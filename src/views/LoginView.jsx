import LoginForm from '../components/Common/Login/LoginForm';

const LoginView = () => {
  return (
    <section className='card bg-white text-dark p-3'>
      <div className='row g-3'>
        {/* Parte izquierda */}
        <article className='col-12 col-md-6'>
          <h1>Bienvenido</h1>
          <hr />
          <LoginForm />
        </article>

        {/* Parte derecha */}
        <article className='col-12 col-md-6'>
          <img
            alt='Hamburguesa'
            className='rounded w-100'
            src='/img-login.png'
          />
        </article>
      </div>
    </section>
  );
};
export default LoginView;
