import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "../../stores/useSession";
import { postLoginFn } from "../../api/auth";
import { useState } from "react";
import { useRef } from "react";

import Input from "../ui/input/Input";
import InvalidFeedback from "../ui/InvalidFeedback/InvalidFeedback";

import "./Login.css";

const CAPTCHA_KEY = import.meta.env.VITE_CAPTCHA_KEY;

const LoginForm = () => {
  const [captcha, setCaptcha] = useState(null);
  const captchaRef = useRef(null);

  const { login } = useSession();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: postLogin } = useMutation({
    mutationFn: postLoginFn,
    onSuccess: (userData) => {
      toast.dismiss();
      toast.success(`Bienvenido, ${userData.fullname}`);

      reset();

      login(userData);

      if (userData.isAdmin === true) {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      }
      setTimeout(() => {
        toast.dismiss();
      }, 1500);
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

    toast.loading("Cargando...");
    postLogin(data);
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
      onSubmit={onSubmitRHF(handleSubmit)}
      className="custom-form container px-4 d-flex flex-column gap-2 mb-4"
    >
      <Input
        className="mb-3"
        error={errors.email}
        label="Correo electrónico"
        name="email"
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: 3,
          maxLength: 50,
        }}
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
        register={register}
      />
      <Input
        error={errors.password}
        label="Contraseña"
        name="password"
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
        }}
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
        register={register}
        type="password"
      />
      <section className="d-flex flex-column align-items-center mt-2">
        {captcha && (
          <InvalidFeedback
            noInput={true}
            divClass="text-center mb-2"
            msg="El Captcha debe ser resuelto para poder ingresar"
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
          Ingresar
        </button>
      </div>
      <p className="account-question mt-4">
        ¿Aún no tienes cuenta?{" "}
        <Link to="/register" className="register-link">
          Ingresá aquí
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
