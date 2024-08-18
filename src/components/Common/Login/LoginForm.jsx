import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';


import { useSession } from '../../../stores/useSession';
import Input from '../../ui/input/Input';
import { postLoginFn } from '../../../api/auth';
import '../Login/Login.css'

const LoginForm = () => {
  // ---------------------------------------------
  // Zustand
  // ---------------------------------------------

  const { login } = useSession();

  // ---------------------------------------------
  // RRD
  // ---------------------------------------------

  const navigate = useNavigate();

  // ---------------------------------------------
  // RHF
  // ---------------------------------------------

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
  } = useForm();

  // ---------------------------------------------
  // RQ
  // ---------------------------------------------

  const { mutate: postLogin } = useMutation({
    mutationFn: postLoginFn,
    onSuccess: (userData) => {
      console.log(userData)
      toast.dismiss();
      toast.success(`Bienvenido, ${userData.fullname}`);

      reset();

      // Hacer el login en el cliente
      login(userData);

      setTimeout(() => {
        navigate('/');
      }, 1500);
    },
    onError: (e) => {
      toast.dismiss();
      toast.warning(e.message);
    },
  });

  // ---------------------------------------------
  // HANDLERS
  // ---------------------------------------------

  const handleSubmit = (data) => {
    toast.loading('Cargando...');
    postLogin(data);
  };

  // ---------------------------------------------
  // RENDERIZADO
  // ---------------------------------------------

  return (
    <form onSubmit={onSubmitRHF(handleSubmit)}>
      <Input
        className='mb-3'
        error={errors.usernameOrEmail}
        label='Nombre de usuario o Email'
        name='usernameOrEmail'
        options={{
          required: {
            value: true,
            message: 'Este campo es requerido',
          },
          minLength: 3,
          maxLength: 50,
        }}
        labelClassName='custom-label'
        register={register}
      />
      <Input
        error={errors.password}
        label='Contraseña'
        name='password'
        options={{
          required: {
            value: true,
            message: 'Este campo es requerido',
          },
          minLength: 3,
          maxLength: 20,
        }}
        register={register}
        type='password'
      />
      <div className='text-center mt-3'>
        <button className='custom-btn' type='submit'>
          Ingresar
        </button>
      </div>
      <p className='account-question'>
        ¿Aun no tienes cuenta? <Link to='/register' className='register-link'>Ingresá aqui</Link>
      </p>
    </form>
  );
};

export default LoginForm;