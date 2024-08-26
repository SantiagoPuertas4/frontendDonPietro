import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postProductsFn } from "../../api/products";

import Input from "../ui/input/Input";
import Checkbox from "../ui/Checkbox/Checkbox";

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
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const handleSubmit = (data) => {
    const transformedData = {
      name: data.nombreProducto,
      description: data.descripcionProducto,
      imageUrl: data.imgUrlProducto,
      category: data.categoriaProducto,
      price: data.precioProducto,
      stock: data.stockProducto,
      isVegan: data.checkVegan,
      isVegetarian: data.checkVegetarian,
      isGlutenFree: data.checkGlutenFree,
      isAvailable: data.checkAvailable,
    };
    toast.loading("Guardando... Aguarde");
    postProduct(transformedData);
  };

  const handleClean = () => {
    reset();
  };

  return (
    <section>
      <h1 className="titulo my-2 text-center">Ingreso de productos</h1>
      <article className="cardUsuario p-2">
        <form
          className="row row-gap-1 m-2"
          onSubmit={onSubmitRHF(handleSubmit)}
        >
          <div className="p-0">
            <Input
              register={register}
              name="nombreProducto"
              label="Nombre"
              errors={errors.nombreProducto}
              maxLength={25}
              options={{
                required: "El campo es requerido",
                maxLength: {
                  value: 25,
                  message: "El campo no puede tener más de 25 caracteres",
                },
                minLength: {
                  value: 3,
                  message: "El campo no puede tener menos de 3 caracteres",
                },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
            />
          </div>
          <div className="col-4 p-0 pe-1">
            <Input
              register={register}
              name="precioProducto"
              label="Precio"
              errors={errors.precioProducto}
              type="number"
              options={{
                required: "El campo es requerido",
                min: {
                  value: 1,
                  message: "El campo debe ser positivo",
                },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
            />
          </div>
          <div className="col-4 p-0 pe-1">
            <Input
              register={register}
              name="stockProducto"
              label="Stock"
              errors={errors.stockProducto}
              type="number"
              options={{
                required: "El campo es requerido",
                min: {
                  value: 1,
                  message: "El campo debe ser positivo",
                },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
            />
          </div>
          <div className="col-4 p-0">
            <Input
              register={register}
              name="categoriaProducto"
              label="Categoría"
              errors={errors.categoriaProducto}
              type="text"
              select={true}
              options={{
                required: "El campo es requerido",
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
            />
          </div>
          <div className="p-0">
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
            />
          </div>
          <div className="p-0">
            <Input
              register={register}
              name="descripcionProducto"
              label="Descripción"
              errors={errors.descripcionProducto}
              maxLength={50}
              options={{
                required: "El campo es requerido",
                maxLength: {
                  value: 50,
                  message: "El campo no puede tener más de 50 caracteres",
                },
                minLength: {
                  value: 15,
                  message: "El campo no puede tener menos de 15 caracteres",
                },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
              textarea
            />
          </div>
          <section className="row d-flex">
            <Checkbox
              register={register}
              name="checkVegetarian"
              label="Es vegetariano"
              labelClassName="productCheckLabel"
              checkClassName="productCheckInput"
              className="col-12 col-md-4 col-lg-3"
            />
            <Checkbox
              register={register}
              name="checkVegan"
              label="Es vegano"
              labelClassName="productCheckLabel"
              checkClassName="productCheckInput"
              className="col-12 col-md-4 col-lg-3"
            />
            <Checkbox
              register={register}
              name="checkGlutenFree"
              label="Es libre de gluten"
              labelClassName="productCheckLabel"
              checkClassName="productCheckInput"
              className="col-12 col-md-4 col-lg-3"
            />
            <Checkbox
              register={register}
              name="checkAvailable"
              label="Está disponible"
              labelClassName="productCheckLabel"
              checkClassName="productCheckInput"
              className="col-12 col-md-4 col-lg-3"
            />
          </section>
          <div className="d-flex justify-content-center justify-content-sm-end gap-2 p-0 my-1">
            <button onClick={handleClean} className="cancel-button-class">
              Limpiar formulario
            </button>
            <button type="submit" className="confirm-button-class">
              Guardar
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};
export default ProductForm;
