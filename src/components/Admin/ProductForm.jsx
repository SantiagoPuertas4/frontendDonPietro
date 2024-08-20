import { useForm } from "react-hook-form";
import Input from "../ui/input/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProductsFn } from "../../api/products";
import { toast } from "sonner";

const ProductForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    reset,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const { mutate: postProduct } = useMutation({
    mutationFn: postProductsFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Entrada guardada");

      reset();

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const handleSubmit = (data) => {
    const transformedData = {
      name: data.nombreProducto,
      price: data.precioProducto,
      stock: data.stockProducto,
      imageUrl: data.imgUrlProducto,
      category: data.categoriaProducto,
      description: data.descripcionProducto,
    };
    toast.loading("Guardando... Aguarde");
    postProduct(transformedData);
  };

  const handleClean = () => {
    reset();
  };

  return (
    <div>
      <h1 className="titulo my-2 text-center">Ingreso de productos</h1>
      <div className="cardUsuario p-2">
        <form
          className="row row-gap-1 m-2"
          onSubmit={onSubmitRHF(handleSubmit)}
        >
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
            ClassName="col-4 p-0 pe-1"
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
            ClassName="col-4 p-0 pe-1"
          />
          <Input
            register={register}
            name="categoriaProducto"
            label="Categoria"
            errors={errors.categoriaProducto}
            options={{
              required: "El campo es requerido",
              pattern: {
                value: /^(comidas|bebidas)$/,
                message:
                  "El campos solo acepta los valores 'comidas' o 'bebidas'",
              },
            }}
            labelClassName="productEditLabel"
            inputClassName="productEditInput"
            ClassName="col-4 p-0"
          />
          <Input
            register={register}
            name="imgUrlProducto"
            label="Imagen"
            errors={errors.imgUrlProducto}
            options={{
              required: "El campo es requerido",
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
            ClassName="col-12 p-0"
            textarea={true}
          />
          <div className="d-flex justify-content-center justify-content-sm-end  gap-2 p-0 my-1">
            <button onClick={handleClean} className="btn btn-danger">
              Limpiar formulario
            </button>
            <button type="submit" className="btn btnCustom">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProductForm;
