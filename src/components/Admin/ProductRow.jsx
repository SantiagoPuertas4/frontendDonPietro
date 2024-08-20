import PropTypes from "prop-types";
import { useState } from "react";
import ProductEditForm from "./ProductEditForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { deleteProductsFn } from "../../api/products";

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
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const handleDelete = async () => {
    const action = await Swal.fire({
      title: "Atencion",
      icon: "info",
      html: `¿Estas seguro que deseas eliminar el producto <b>${product.name}</b>?`,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
    });

    if (action.isConfirmed) {
      toast.loading("Eliminando usuario ...");
      deleteProduct(product.id);
    }
  };

  const prepareEdit = () => {
    setEdit(true);
  };

  return (
    <article className="d-flex row cardUsuario my-2 px-3 py-4 align-items-center">
      <div className="col-12 col-md-6 col-xl-4">
        <img
          className="w-100 imgProductAdmin"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="col-8 col-md-4 col-xl-2 my-1 p-1">
        <p className="text-center">{product.name}</p>
      </div>
      <div className="col-4 col-md-2 col-xl-2 col-xxl-1 my-1">
        <p className="text-center">${product.price}</p>
      </div>
      <div className="col-12 col-xl-4 py-3 col-xxl-4 my-1 mb-2">
        <p className="text-center">{product.description}</p>
      </div>
      <div className="col-12 col-xxl-1 d-flex flex-xxl-column align-items-xxl-center justify-content-center my-1">
        <button
          onClick={prepareEdit}
          className="ms-1 btn btnCustom w-100 mb-xxl-2"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="ms-1 btn btn-danger w-100 p-1"
        >
          Eliminar
        </button>
      </div>

      {edit && <ProductEditForm product={product} setEdit={setEdit} />}
    </article>
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
  }),
};
