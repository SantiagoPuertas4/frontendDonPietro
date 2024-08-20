import PropTypes from "prop-types";
import Input from "../ui/input/Input";
import { useForm } from "react-hook-form";
import { useRef } from "react";

const ProductEditForm = () => {
  const {
    register,
    reset,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const nameRef = useRef();

  const handleSubmit = () => {};

  return (
    <section className="w-100">
      <form onSubmit={onSubmitRHF(handleSubmit)}>
        <Input
          register={register}
          name="nombreProducto"
          label="Nombre del producto"
          errors={errors.nombreProducto}
          options={{
            required: "El campo es requerido",
            maxLength: {
              value: 25,
              message: "El campo no puede tener mas de 25 caracteres",
            },
            minLength: {
              value: 3,
              message: "El campo no puede tener menos de 3 caracteres",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ref={nameRef}
        />
        <div className=" text-end">
          <button className="btn btn-danger">Cancelar</button>
          <button className="btn btn-success">Guardar</button>
        </div>
      </form>
    </section>
  );
};
export default ProductEditForm;

ProductEditForm.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
};
