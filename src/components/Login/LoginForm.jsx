import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "../../stores/useSession";
import { useState } from "react";
import { useRef } from "react";

import { postLoginFn } from "../../api/auth";
import { getConfigFn } from "../../api/config";

import { generarMesas } from "../../utilities/generarMesas";

import Input from "../ui/input/Input";
import InvalidFeedback from "../ui/InvalidFeedback/InvalidFeedback";

import "./Login.css";

const CAPTCHA_KEY = import.meta.env.VITE_CAPTCHA_KEY;

const LoginForm = () => {
  const [captcha, setCaptcha] = useState(null);
  const captchaRef = useRef(null);

  const { data: config, isSuccess } = useQuery({
    queryKey: ["config"],
    queryFn: getConfigFn,
  });

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
      setTimeout(() => {
        toast.dismiss();
      }, 2000);

      reset();

      if (isSuccess) {
        const mesas = generarMesas(config.data.cantidadMesas);
        sessionStorage.setItem("mesas", JSON.stringify(mesas));
      }

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
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
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
          },
          maxLength: {
            value: 50,
          },
        }}
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
        register={register}
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
          },
          maxLength: {
            value: 100,
          },
        }}
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
        buttonShowPassword={true}
        register={register}
        type="password"
      />
      <section className="d-flex flex-column align-items-center mt-2">
        {captcha && (
          <InvalidFeedback
            noInput={true}
            divClass="text-center mb-2 d-flex justify-content-center"
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
