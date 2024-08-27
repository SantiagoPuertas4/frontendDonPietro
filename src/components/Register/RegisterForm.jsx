import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../../stores/useSession";
import { useState } from "react";
import { useRef } from "react";

import { postRegisterFn } from "../../api/auth";

import Input from "../ui/input/Input";
import InvalidFeedback from "../ui/InvalidFeedback/InvalidFeedback";

import "./Register.css";

const CAPTCHA_KEY = import.meta.env.VITE_CAPTCHA_KEY;
const SERVICE_ID = import.meta.env.VITE_MAIL_SERVICE_ID;
const TEMPLATE_ID_REGISTER = import.meta.env.VITE_MAIL_TEMPLATE_REGISTER_ID;
const PUBLIC_KEY = import.meta.env.VITE_MAIL_PUBLIC_KEY;

const RegisterForm = () => {
  const [captcha, setCaptcha] = useState(null);
  const captchaRef = useRef(null);

  const { login } = useSession();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const { mutate: postRegister } = useMutation({
    mutationFn: postRegisterFn,
    onSuccess: (userData) => {
      toast.dismiss();
      toast.success(`Registrado. Bienvenido, ${userData.fullname}`);

      let dataMail = {
        address: userData.email,
        user_name: userData.fullname,
      };

      emailjs
        .send(SERVICE_ID, TEMPLATE_ID_REGISTER, dataMail, {
          publicKey: PUBLIC_KEY,
        })
        .then(
          () => {
            toast.dismiss();
            toast.success("Se envio un correo a tu mail!");
            reset();
          },
          (error) => {
            toast.dismiss();
            toast.error(error || "El correo no pudo ser enviado correctamente");
          }
        );

      reset();

      login(userData);

      setTimeout(() => {
        navigate("/menu");
      }, 2000);
    },
    onError: (e) => {
      toast.dismiss();
      toast.warning(e.message);
    },
  });

  const handleSubmit = (data) => {
    if (!captchaRef.current.getValue()) {
      setCaptcha(true);
      return;
    }

    setCaptcha(false);

    let pass1 = getValues("password");
    let pass2 = getValues("repeatPassword");
    if (pass1 !== pass2 || pass2 !== pass1) {
      toast.error("Las contraseñas no coinciden");
      setTimeout(toast.dismiss(), 2000);
      return;
    }

    const transformedData = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    toast.loading("Guardando nuevo usuario");
    postRegister(transformedData);
  };

  const handleCaptchaChange = () => {
    if (!captchaRef.current.getValue()) {
      setCaptcha(true);
      return;
    }

    setCaptcha(false);
  };

  return (
    <form
      className="custom-form container px-4 d-flex flex-column gap-2 mb-4"
      onSubmit={onSubmitRHF(handleSubmit)}
    >
      <Input
        errors={errors.fullname}
        label="Nombre"
        name="fullname"
        maxLength={30}
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 3,
            message: "El campo no puede tener menos de 3 caracteres",
          },
          maxLength: {
            value: 30,
            message: "El campo no puede tener más de 30 caracteres",
          },
          pattern: {
            value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/,
            message: "El campo solo permite letras y espacios",
          },
        }}
        register={register}
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
      />
      <Input
        errors={errors.email}
        label="Correo electrónico"
        name="email"
        maxLength={50}
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 3,
            message: "El campo no puede tener menos de 3 caracteres",
          },
          maxLength: {
            value: 50,
            message: "El campo no puede tener más de 50 caracteres",
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "El campo solo permite correos electronicos",
          },
        }}
        register={register}
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
      />
      <Input
        errors={errors.password}
        label="Contraseña"
        name="password"
        maxLength={100}
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 8,
            message: "Revisa tu contraseña",
          },
          maxLength: {
            value: 100,
            message: "Revisa tu contraseña",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,100}$/,
            message:
              "La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un caracter especial",
          },
        }}
        register={register}
        type="password"
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
      />
      <Input
        errors={errors.repeatPassword}
        label="Repetir contraseña"
        name="repeatPassword"
        maxLength={100}
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 8,
            message: "Revisa tu contraseña",
          },
          maxLength: {
            value: 100,
            message: "Revisa tu contraseña",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,100}$/,
            message: "Las contraseñas deben coincidir",
          },
        }}
        register={register}
        type="password"
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
      />
      <section className="d-flex flex-column align-items-center mt-2">
        {captcha && (
          <InvalidFeedback
            noInput={true}
            divClass="text-center mb-2 d-flex justify-content-center"
            msg="El Captcha debe ser resuelto para poder registrarte"
          />
        )}
        <ReCAPTCHA
          ref={captchaRef}
          onChange={handleCaptchaChange}
          sitekey={CAPTCHA_KEY}
        />
      </section>
      <div className="text-center mt-2">
        <button className="custom-btn" type="submit">
          Registrar
        </button>
        <p className="account-question mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="register-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
