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
            alt='Empanadas tucumanas'
            className='rounded w-100'
            src='https://www.infotuc.com.ar/wp-content/uploads/2022/02/empanadas-tucumanas-1024x683.jpg'
          />
        </article>
      </div>
    </section>
  );
};
export default LoginView;
