import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../stores/useSession";
import Input from "../../ui/Input/Input";
import "./Register.css";
import { postRegisterFn } from "../../../api/auth";

const RegisterForm = () => {
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
    getValues,
  } = useForm();

  // ---------------------------------------------
  // RQ
  // ---------------------------------------------

  const { mutate: postRegister } = useMutation({
    mutationFn: postRegisterFn,
    onSuccess: (userData) => {
      toast.dismiss();
      toast.success(`Registrado. Bienvenido, ${userData.username}`);

      reset();

      // Hacer el login en el cliente
      login(userData);

      setTimeout(() => {
        navigate("/");
      }, 2000);
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
    const transformedData = {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    let pass1 = getValues("password");
    let pass2 = getValues("repeatPassword");
    if (pass1!== pass2) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    toast.loading("Guardando nuevo usuario");
    postRegister(transformedData);
  };

  // ---------------------------------------------
  // RENDERIZADO
  // ---------------------------------------------

  return (
    <form className="row g-2" onSubmit={onSubmitRHF(handleSubmit)}>
      <div className="col-12 col-md-4">
        <Input
          error={errors.fullname}
          label="Nombre"
          name="fullname"
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: 3,
            maxLength: 30,
          }}
          register={register}
        />
      </div>
      <div className="col-12 col-md-4">
        <Input
          error={errors.username}
          label="Nombre de usuario"
          name="username"
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: 3,
            maxLength: 20,
          }}
          register={register}
        />
      </div>
      <div className="col-12 col-md-4">
        <Input
          error={errors.email}
          label="Correo electronico"
          name="email"
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          }}
          register={register}
        />
      </div>
      <div className="col-12 col-md-6 relative">
        <Input
          error={errors.password}
          label="Contraseña"
          name="password"
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
            maxLength: 15,
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message:
                "La contraseña debe tener al menos 8 caracteres, una minúscula y una mayúscula",
            },
          }}
          register={register}
          type="password"
        />
      </div>
      <div className="col-12 col-md-6 relative">
        <Input
          error={errors.password}
          label="Repetir Contraseña"
          name="repeatPassword"
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 8,
              message: "Revisar",
            },
            maxLength: 15,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
              message: "Revisar",
            },
          }}
          register={register}
          type="password"
        />
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-outline-light" type="submit">
          Registrar
        </button>
        <p className="mt-3">
          ¿Ya tienes una cuenta? <a href="/login" className="color-register">Inicia sesión</a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
