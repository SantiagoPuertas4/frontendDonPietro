import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../stores/useSession";
import { useState } from "react";
import { useRef } from "react";

import { postRegisterFn } from "../../../api/auth";
import Input from "../../ui/input/Input";
import InvalidFeedback from "../../ui/InvalidFeedback/InvalidFeedback";

import "./Register.css";

const CAPTCHA_KEY = import.meta.env.VITE_CAPTCHA_KEY;
const SERVICE_ID = import.meta.env.VITE_MAIL_SERVICE_ID;
const TEMPLATE_ID_REGISTER = import.meta.env.VITE_MAIL_TEMPLATE_REGISTER_ID;
const PUBLIC_KEY = import.meta.env.VITE_MAIL_PUBLIC_KEY;

const RegisterForm = () => {
  const [captcha, setCaptcha] = useState(null);
  const captchaRef = useRef(null);
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

  // ---------------------------------------------
  // RENDERIZADO
  // ---------------------------------------------

  return (
    <form className="row g-2" onSubmit={onSubmitRHF(handleSubmit)}>
      <div className="col-12 col-md-6">
        <Input
          errors={errors.fullname}
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
      <div className="col-12 col-md-6">
        <Input
          errors={errors.email}
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
          errors={errors.password}
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[.,@()]).{8,}$/,
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
          errors={errors.passwordRepeat}
          label="Repetir contraseña"
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[.,@()]).{8,}$/,
              message:
                "La contraseña debe tener al menos 8 caracteres, una minúscula y una mayúscula",
            },
          }}
          register={register}
          type="password"
        />
      </div>
      <section className="d-flex flex-column align-items-center mt-2">
        {captcha && (
          <InvalidFeedback
            noInput={true}
            divClass="text-center mb-2"
            msg="El Captcha debe ser resuelto para poder registrarte"
          />
        )}
        <ReCAPTCHA
          ref={captchaRef}
          onChange={handleCaptchaChange}
          sitekey={CAPTCHA_KEY}
        />
      </section>
      <div className="text-center mt-3">
        <button className="btn btn-outline-light" type="submit">
          Registrar
        </button>
        <p className="mt-3">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="color-register">
            Inicia sesión
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;