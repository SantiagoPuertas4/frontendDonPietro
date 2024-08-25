import { useQuery } from "@tanstack/react-query";
import { getProductsFn } from "../../api/products.js";
import ProductRow from "./ProductRow.jsx";

const ProductList = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsFn(),
  });

  if (isLoading) {
    return <p className="mt-2">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger mt-3">
        <p className="text-black">
          Ocurrió un error cargando la lista de productos.
        </p>
      </div>
    );
  }

  if (products && products.data.length === 0) {
    return (
      <div className="text-white text-center mt-5">
        <p>No se encontraron productos para listar.</p>
      </div>
    );
  }

  return (
    <section>
      <h1 className="titulo my-2 text-center">Productos ingresados</h1>
      <article className="d-none d-md-flex row justify-content-between">
        <div className="col-4 col-md-6 col-xl-4 p-0">
          <p className="userListTitle text-center">Foto</p>
        </div>
        <div className="col-4 col-xl-2">
          <p className="userListTitle text-center ">Nombre</p>
        </div>
        <div className="col-2 col-xxl-1 padding0">
          <p className="userListTitle text-center padding0">Precio</p>
        </div>
        <div className="col-2 d-none d-xl-block col-xl-4 col-xxl-4">
          <p className="userListTitle text-center">Descripción</p>
        </div>
        <div className="col-1 d-none d-xxl-block">
          <p className="userListTitle text-center">Acciones</p>
        </div>
      </article>
      <article>
        {products.data.map((product) => {
          return <ProductRow key={product.id} product={product} />;
        })}
      </article>
    </section>
  );
};
export default ProductList;
