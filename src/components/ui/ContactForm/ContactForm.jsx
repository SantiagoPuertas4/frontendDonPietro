import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Input from "../input/Input";

import "./ContactForm.css";

const ContactForm = () => {
  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {};
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
          <div className="d-flex justify-content-center p-0 my-4">
            <button className="btn btnContactanos px-5">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
