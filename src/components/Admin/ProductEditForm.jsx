import PropTypes from "prop-types";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { putProductsFn } from "../../api/products";

import Input from "../ui/input/Input";
import Checkbox from "../ui/Checkbox/Checkbox";

const ProductEditForm = (props) => {
  const { product, setEdit } = props;
  const QueryClient = useQueryClient();
  const {
    register,
    setValue,
    watch,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const { mutate: putProduct } = useMutation({
    mutationFn: putProductsFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Entrada actualizada");

      QueryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const isVegetarian = watch("checkVegetarian");
  const isVegan = watch("checkVegan");

  useEffect(() => {
    if (isVegetarian) {
      setValue("checkVegan", false);
    }
  }, [isVegetarian, setValue]);

  useEffect(() => {
    if (isVegan) {
      setValue("checkVegetarian", false);
    }
  }, [isVegan, setValue]);

  const handleEdit = (data) => {
    const transformedData = {
      name: data.nombreProducto,
      price: data.precioProducto,
      stock: data.stockProducto,
      imageUrl: data.imgProducto,
      category: data.categoriaProducto,
      description: data.descripcionProducto,
      isVegetarian: data.checkVegetarian,
      isVegan: data.checkVegan,
      isGlutenFree: data.checkGlutenFree,
      isAvailable: data.checkAvailable,
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
    setValue("checkVegetarian", product.isVegetarian);
    setValue("checkVegan", product.isVegan);
    setValue("checkGlutenFree", product.isGlutenFree);
    setValue("checkAvailable", product.isAvailable);
  }, []);

  return (
    <section className="w-100 my-2">
      <form className="row row-gap-1 mx-2" onSubmit={onSubmitRHF(handleEdit)}>
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
              message: "El campo no puede tener mas de 25 caracteres",
            },
            minLength: {
              value: 3,
              message: "El campo no puede tener menos de 3 caracteres",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName="p-0"
        />
        <Input
          register={register}
          name="precioProducto"
          label="Precio"
          errors={errors.precioProducto}
          type="number"
          maxLength={6}
          options={{
            required: "El campo es requerido",
            min: {
              value: 1,
              message: "El campo debe ser positivo",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName="col-6 p-0"
        />
        <Input
          register={register}
          name="stockProducto"
          label="Stock"
          errors={errors.stockProducto}
          type="number"
          maxLength={6}
          options={{
            required: "El campo es requerido",
            min: {
              value: 1,
              message: "El campo debe ser positivo",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName="col-6 p-0 ps-1"
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
          ClassName="col-8 p-0"
        />
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
          ClassName="col-4 p-0 ps-1"
        />
        <Input
          register={register}
          name="descripcionProducto"
          label="Descripcion"
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
          ClassName="p-0"
          textarea={true}
        />
        <article className="row d-flex">
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
            label="Esta disponible"
            labelClassName="productCheckLabel"
            checkClassName="productCheckInput"
            className="col-12 col-md-4 col-lg-3"
          />
        </article>
        <article className="d-flex justify-content-center gap-1 my-1">
          <button onClick={handleCancel} className="btn btn-danger">
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
        </article>
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
    isVegan: PropTypes.bool.isRequired,
    isVegetarian: PropTypes.bool.isRequired,
    isGlutenFree: PropTypes.bool.isRequired,
    isAvailable: PropTypes.bool.isRequired,
  }),
  setEdit: PropTypes.func.isRequired,
};
