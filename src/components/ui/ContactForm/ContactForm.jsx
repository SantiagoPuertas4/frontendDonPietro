import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

import Input from "../input/Input";
import InvalidFeedback from "../InvalidFeedback/InvalidFeedback";

import "./ContactForm.css";

const CAPTCHA_KEY = import.meta.env.VITE_CAPTCHA_KEY;
const SERVICE_ID = import.meta.env.VITE_MAIL_SERVICE_ID;
const TEMPLATE_ID_CONTACT = import.meta.env.VITE_MAIL_TEMPLATE_CONTACT_ID;
const PUBLIC_KEY = import.meta.env.VITE_MAIL_PUBLIC_KEY;

const ContactForm = () => {
  const [captcha, setCaptcha] = useState(null);
  const {
    register,
    reset,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const captchaRef = useRef(null);

  const handleSubmit = (data) => {
    const { nombreContacto, mailContacto, mensajeContacto } = data;
    toast.loading("Registrando mensaje");

    if (!captchaRef.current.getValue()) {
      setCaptcha(true);
      return;
    }

    setCaptcha(false);

    let dataContactoUsuario = {
      title: `¡Gracias por contactarnos, ${nombreContacto}!`,
      address: mailContacto,
      msg: `Gracias por ponerte en contacto con nosotros a través de nuestro sitio web. Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible. Tu opinión y preguntas son muy importantes para nosotros, y estamos aquí para asegurarnos de que tengas la mejor experiencia posible en Don Pietro.

En breve, uno de nuestros representantes se comunicará contigo para atender tu consulta.

¡Gracias por elegirnos!

Saludos cordiales,
Equipo de Don Pietro`,
    };

    let dataContactoAdmin = {
      title: `Nuevo mensaje recibido a través del formulario de contacto`,
      address: `donpietro.grupo2@gmail.com`,
      msg: `Hola Admin,

Se ha recibido un nuevo mensaje a través del formulario de contacto en el sitio web de Don Pietro.

Detalles del mensaje:

Nombre del Cliente: ${nombreContacto}
Correo Electrónico: ${mailContacto}
Mensaje:
${mensajeContacto}
Por favor, revisa el mensaje y ponte en contacto con el cliente a la mayor brevedad posible.

Saludos,
Diosito`,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID_CONTACT, dataContactoUsuario, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          emailjs
            .send(SERVICE_ID, TEMPLATE_ID_CONTACT, dataContactoAdmin, {
              publicKey: PUBLIC_KEY,
            })
            .then(
              () => {
                toast.dismiss();
                toast.success("El mensaje fue registrado correctamente");
                reset();
              },
              (error) => {
                toast.dismiss();
                toast.error(
                  error || "El mensaje no pudo ser registrado correctamente"
                );
              }
            );
        },
        (error) => {
          toast.dismiss();
          toast.error(
            error || "El mensaje no pudo ser registrado correctamente"
          );
        }
      );
  };

  const handleCaptchaChange = () => {
    if (!captchaRef.current.getValue()) {
      setCaptcha(true);
      return;
    }

    setCaptcha(false);
  };

  return (
    <section className="container mt-5">
      <div>
        <h1 className="titulo text-center">Contactanos</h1>
        <form className="p-3 row gap-2" onSubmit={onSubmitRHF(handleSubmit)}>
          <Input
            register={register}
            name="nombreContacto"
            label="NOMBRE"
            errors={errors.nombreContacto}
            options={{
              required: "El campo es requerido",
              maxLength: {
                value: 40,
                message: "El campo no puede tener mas de 40 caracteres",
              },
              minLength: {
                value: 3,
                message: "El campo no puede tener menos de 3 caracteres",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "El campo solo acepta letras y espacios",
              },
            }}
            labelClassName="mainContactLabel"
            inputClassName="mainContactInput"
            ClassName="col-12 p-0"
          />
          <Input
            register={register}
            name="mailContacto"
            label="CORREO ELECTRONICO"
            errors={errors.mailContacto}
            options={{
              required: "El campo es requerido",
              maxLength: {
                value: 50,
                message: "El campo no puede tener mas de 50 caracteres",
              },
              minLength: {
                value: 3,
                message: "El campo no puede tener menos de 3 caracteres",
              },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "El campo solo acepta correos electronicos",
              },
            }}
            labelClassName="mainContactLabel"
            inputClassName="mainContactInput"
            ClassName="col-12 p-0"
          />
          <Input
            register={register}
            name="mensajeContacto"
            label="MENSAJE"
            errors={errors.mensajeContacto}
            options={{
              required: "El campo es requerido",
              maxLength: {
                value: 500,
                message: "El campo no puede tener mas de 500 caracteres",
              },
              minLength: {
                value: 3,
                message: "El campo no puede tener menos de 3 caracteres",
              },
              pattern: {
                value: /^[A-Za-z0-9\s(),.]+$/,
                message:
                  "El campo solo acepta letras, numeros, punto, coma y parentesis",
              },
            }}
            labelClassName="mainContactLabel"
            inputClassName="mainContactInput textAreaContact"
            ClassName="col-12 p-0"
            textarea={true}
          />

          <section className="d-flex flex-column align-items-center mt-2">
            {captcha && (
              <InvalidFeedback
                noInput={true}
                divClass="text-center mb-2"
                msg="El Captcha debe ser resuelto para poder enviar un mail"
              />
            )}
            <ReCAPTCHA
              ref={captchaRef}
              onChange={handleCaptchaChange}
              sitekey={CAPTCHA_KEY}
            />
          </section>

          <div className="d-flex justify-content-center p-0 my-4">
            <button className="btn btnContactanos px-5">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
