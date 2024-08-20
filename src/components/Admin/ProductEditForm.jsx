import PropTypes from "prop-types";
import Input from "../ui/input/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putProductsFn } from "../../api/products";

const ProductEditForm = (props) => {
  const { product, setEdit } = props;
  const QueryClient = useQueryClient();
  const {
    register,
    setValue,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const { mutate: putProduct } = useMutation({
    mutationFn: putProductsFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Entrada actualizada");

      //Avisarle a la tabla que se debe actualizar
      QueryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const handleEdit = (data) => {
    const transformedData = {
      name: data.nombreProducto,
      price: data.precioProducto,
      stock: data.stockProducto,
      imageUrl: data.imgProducto,
      category: data.categoriaProducto,
      description: data.descripcionProducto,
    };
    toast.loading("Guardando... Aguarde");
    putProduct({ productId: product.id, data: transformedData });
  };

  const handleCancel = () => {
    setEdit(false);
  };

  useEffect(() => {
    setValue("nombreProducto", product.name);
    setValue("precioProducto", product.price);
    setValue("stockProducto", product.stock);
    setValue("imgProducto", product.imageUrl);
    setValue("categoriaProducto", product.category);
    setValue("descripcionProducto", product.description);
  });

  return (
    <section className="w-100 my-2">
      <form className="row row-gap-1 mx-2" onSubmit={onSubmitRHF(handleEdit)}>
        <Input
          register={register}
          name="nombreProducto"
          label="Nombre"
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
          ClassName="col-12 p-0"
        />
        <Input
          register={register}
          name="precioProducto"
          label="Precio"
          errors={errors.precioProducto}
          type="number"
          options={{
            required: "El campo es requerido",
            min: {
              value: 0,
              message: "El campo debe ser mayor o igual a 0",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName="col-6 p-0 px-1"
        />
        <Input
          register={register}
          name="stockProducto"
          label="Stock"
          errors={errors.stockProducto}
          type="number"
          options={{
            required: "El campo es requerido",
            min: {
              value: 0,
              message: "El campo debe ser mayor o igual a 0",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName="col-6 p-0 px-1"
        />
        <Input
          register={register}
          name="imgProducto"
          label="Imagen"
          errors={errors.imgProducto}
          options={{
            required: "El campo es requerido",
            minLength: {
              value: 3,
              message: "El campo no puede tener menos de 3 caracteres",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName="col-8 p-0 px-1"
        />
        <Input
          register={register}
          name="categoriaProducto"
          label="Categoria"
          errors={errors.categoriaProducto}
          options={{
            required: "El campo es requerido",
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName="col-4 p-0 px-1"
        />
        <Input
          register={register}
          name="descripcionProducto"
          label="Descripcion"
          errors={errors.descripcionProducto}
          options={{
            required: "El campo es requerido",
            maxLength: {
              value: 50,
              message: "El campo no puede tener mas de 50 caracteres",
            },
            minLength: {
              value: 10,
              message: "El campo no puede tener menos de 10 caracteres",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName="g-col-12 p-0 px-1"
          textarea={true}
        />
        <div className="d-flex justify-content-center gap-1 my-1">
          <button onClick={handleCancel} className="btn btn-danger">
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
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
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
  setEdit: PropTypes.func.isRequired,
};
