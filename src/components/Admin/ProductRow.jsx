import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { toast } from "sonner";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProductsFn } from "../../api/products";

import ProductEditForm from "./ProductEditForm";

const ProductRow = (props) => {
  const { product } = props;
  const QueryClient = useQueryClient();
  const [edit, setEdit] = useState(false);

  const { mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductsFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Producto eliminado");

      QueryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    },
  });

  const handleDelete = async () => {
    const action = await Swal.fire({
      title: "Atencion",
      icon: "info",
      html: `¿Estás seguro que deseas eliminar el producto <b>${product.name}</b>?`,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
      customClass: {
        confirmButton: "swal-danger",
        cancelButton: "swal-button-cancel",
      },
    });

    if (action.isConfirmed) {
      toast.loading("Eliminando usuario ...");
      deleteProduct(product.id);
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    }
  };

  const prepareEdit = () => {
    setEdit(true);
  };

  return (
    <section className="d-flex row cardUsuario my-2 px-3 py-4 align-items-center">
      <article className="col-12 col-md-5 col-xl-4 col-xxl-3  imgProductAdmin">
        <img
          className="w-100 imgProductAdmin"
          src={product.imageUrl}
          alt={product.name}
        />
      </article>
      <article className="col-8 col-md-3 col-xl-3 col-xxl-2 my-1 p-1">
        <p className="text-center">{product.name}</p>
      </article>
      <article className="col-4 col-md-2 col-xl-1 my-1">
        <p className="text-center">${product.price}</p>
      </article>
      <article className="col-6 col-md-2 col-xl-1 py-3 my-1 mb-2">
        <p className="text-center">{product.stock} unidades</p>
      </article>
      <article className="col-6 py-3 col-xl-3 col-xxl-1 my-1 mb-2 d-flex flex-column">
        {product.isVegan && <p className="text-center">Vegetariano</p>}
        {product.isVegetarian && <p className="text-center">Vegano</p>}
        {product.isGlutenFree && <p className="text-center">Libre de Gluten</p>}
        {product.isAvailable && <p className="text-center">Disponible</p>}
      </article>
      <article className="col-12 col-md-6 col-xl-4 py-3 col-xxl-3 my-1 mb-2">
        <p className="text-center">{product.description}</p>
      </article>
      <article className="col-12 col-xxl-1 d-flex flex-xxl-column align-items-xxl-center justify-content-center my-1">
        <button
          onClick={prepareEdit}
          className="ms-1 confirm-button-class w-100 mb-xxl-2"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="ms-1 cancel-button-class w-100 p-1"
        >
          Eliminar
        </button>
      </article>

      {edit && <ProductEditForm product={product} setEdit={setEdit} />}
    </section>
  );
};
export default ProductRow;
ProductRow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    isVegan: PropTypes.bool.isRequired,
    isVegetarian: PropTypes.bool.isRequired,
    isGlutenFree: PropTypes.bool.isRequired,
    isAvailable: PropTypes.bool.isRequired,
  }),
};
