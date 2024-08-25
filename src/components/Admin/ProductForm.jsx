import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postProductsFn } from "../../api/products";

import Input from "../ui/input/Input";
import Checkbox from "../ui/Checkbox/Checkbox";
import InvalidFeedback from "../ui/InvalidFeedback/InvalidFeedback";

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
        <form className="row row-gap-1 m-2" onSubmit={onSubmitRHF(handleSubmit)}>
          <div className="p-0">
            <Input
              register={register}
              name="nombreProducto"
              label="Nombre"
              errors={errors.nombreProducto}
              options={{
                required: "El campo es requerido",
                maxLength: { value: 25, message: "El campo no puede tener más de 25 caracteres" },
                minLength: { value: 3, message: "El campo no puede tener menos de 3 caracteres" },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
            />
            <InvalidFeedback msg={errors.nombreProducto?.message} />
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
                min: { value: 0, message: "El campo debe ser mayor o igual a 0" },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
            />
            <InvalidFeedback msg={errors.precioProducto?.message} />
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
                min: { value: 0, message: "El campo debe ser mayor o igual a 0" },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
            />
            <InvalidFeedback msg={errors.stockProducto?.message} />
          </div>
          <div className="col-4 p-0 productEditInput">
          <label className="productEditLabel ms-3 mt-1" htmlFor="categoriaProducto">Categoría</label>
          <select
            id="categoriaProducto"
            {...register("categoriaProducto", {
              required: "El campo es requerido",
            })}
            className="productEditInput options d-flex ms-3 mt-1"
          >
            <option value="">Seleccionar</option>
            <option value="comidas">Comidas</option>
            <option value="bebidas">Bebidas</option>
          </select>
          <InvalidFeedback msg={errors.categoriaProducto?.message} />
        </div>
          <div className="p-0">
            <Input
              register={register}
              name="imgUrlProducto"
              label="Imagen"
              errors={errors.imgUrlProducto}
              options={{
                required: "El campo es requerido",
                minLength: { value: 3, message: "El campo no puede tener menos de 3 caracteres" },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
            />
            <InvalidFeedback msg={errors.imgUrlProducto?.message} />
          </div>
          <div className="p-0">
            <Input
              register={register}
              name="descripcionProducto"
              label="Descripción"
              errors={errors.descripcionProducto}
              options={{
                required: "El campo es requerido",
                maxLength: { value: 300, message: "El campo no puede tener más de 300 caracteres" },
                minLength: { value: 15, message: "El campo no puede tener menos de 15 caracteres" },
              }}
              labelClassName="productEditLabel"
              inputClassName="productEditInput"
              textarea
            />
            <InvalidFeedback msg={errors.descripcionProducto?.message} />
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
