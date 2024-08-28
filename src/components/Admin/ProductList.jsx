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
    return (
      <section>
        <h1 className="titulo my-2 text-center">Productos ingresados</h1>
        <article className="d-none d-md-flex row justify-content-between">
          <div className="col-4 col-md-5 col-xl-4 col-xxl-3 p-0">
            <p className="userListTitle text-center">Foto</p>
          </div>
          <div className="col-4 col-md-3 col-xxl-2 p-0">
            <p className="userListTitle text-center ">Nombre</p>
          </div>
          <div className="col-2 col-xl-1 padding0  p-0">
            <p className="userListTitle text-center padding0">Precio</p>
          </div>
          <div className="col-2 d-none d-md-block col-xl-1 p-0">
            <p className="userListTitle text-center">Stock</p>
          </div>
          <div className="col-2 d-none d-xl-block col-xl-3 col-xxl-1 p-0">
            <p className="userListTitle text-center">Propiedades</p>
          </div>
          <div className="col-2 d-none d-xxl-block col-xl-3 p-0">
            <p className="userListTitle text-center">Descripción</p>
          </div>
          <div className="col-1 d-none d-xxl-block p-0">
            <p className="userListTitle text-center">Acciones</p>
          </div>
        </article>
        <article>
          <section className="d-flex row cardUsuario my-2 px-3 py-4 align-items-center">
            <article className="col-12 col-md-5 col-xl-4 col-xxl-3">
              <p className="text-center placeholder imgPlaceholder w-100"></p>
            </article>
            <article className="col-8 col-md-3 col-xl-3 col-xxl-2 my-1">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-4 col-md-2 col-xl-1 my-1">
              <p className="text-center placeholder textPlaceholder w-100 "></p>
            </article>
            <article className="col-6 col-md-2 col-xl-1 py-3 my-1 mb-2">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-6 py-3 col-xl-3 col-xxl-1 my-1 mb-2 d-flex flex-column">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-12 col-md-6 col-xl-4 py-3 col-xxl-3 my-1 mb-2">
              <p className="text-center placeholder  textPlaceholder w-100">
                sdfgsdfgsdfg
              </p>
            </article>
            <article className="col-12 col-xxl-1 d-flex flex-xxl-column align-items-xxl-center justify-content-center my-1">
              <button className="ms-1  placeholder  confirm-button-class w-100 mb-xxl-2"></button>
              <button className="ms-1  placeholder  cancel-button-class w-100 p-1"></button>
            </article>
          </section>
        </article>
        <article>
          <section className="d-flex row cardUsuario my-2 px-3 py-4 align-items-center">
            <article className="col-12 col-md-5 col-xl-4 col-xxl-3">
              <p className="text-center placeholder imgPlaceholder w-100"></p>
            </article>
            <article className="col-8 col-md-3 col-xl-3 col-xxl-2 my-1">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-4 col-md-2 col-xl-1 my-1">
              <p className="text-center placeholder textPlaceholder w-100 "></p>
            </article>
            <article className="col-6 col-md-2 col-xl-1 py-3 my-1 mb-2">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-6 py-3 col-xl-3 col-xxl-1 my-1 mb-2 d-flex flex-column">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-12 col-md-6 col-xl-4 py-3 col-xxl-3 my-1 mb-2">
              <p className="text-center placeholder  textPlaceholder w-100">
                sdfgsdfgsdfg
              </p>
            </article>
            <article className="col-12 col-xxl-1 d-flex flex-xxl-column align-items-xxl-center justify-content-center my-1">
              <button className="ms-1  placeholder  confirm-button-class w-100 mb-xxl-2"></button>
              <button className="ms-1  placeholder  cancel-button-class w-100 p-1"></button>
            </article>
          </section>
        </article>
        <article>
          <section className="d-flex row cardUsuario my-2 px-3 py-4 align-items-center">
            <article className="col-12 col-md-5 col-xl-4 col-xxl-3">
              <p className="text-center placeholder imgPlaceholder w-100"></p>
            </article>
            <article className="col-8 col-md-3 col-xl-3 col-xxl-2 my-1">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-4 col-md-2 col-xl-1 my-1">
              <p className="text-center placeholder textPlaceholder w-100 "></p>
            </article>
            <article className="col-6 col-md-2 col-xl-1 py-3 my-1 mb-2">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-6 py-3 col-xl-3 col-xxl-1 my-1 mb-2 d-flex flex-column">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-12 col-md-6 col-xl-4 py-3 col-xxl-3 my-1 mb-2">
              <p className="text-center placeholder  textPlaceholder w-100">
                sdfgsdfgsdfg
              </p>
            </article>
            <article className="col-12 col-xxl-1 d-flex flex-xxl-column align-items-xxl-center justify-content-center my-1">
              <button className="ms-1  placeholder  confirm-button-class w-100 mb-xxl-2"></button>
              <button className="ms-1  placeholder  cancel-button-class w-100 p-1"></button>
            </article>
          </section>
        </article>
      </section>
    );
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
        <div className="col-4 col-md-5 col-xl-4 col-xxl-3 p-0">
          <p className="userListTitle text-center">Foto</p>
        </div>
        <div className="col-4 col-md-3 col-xxl-2 p-0">
          <p className="userListTitle text-center ">Nombre</p>
        </div>
        <div className="col-2 col-xl-1 padding0  p-0">
          <p className="userListTitle text-center padding0">Precio</p>
        </div>
        <div className="col-2 d-none d-md-block col-xl-1 p-0">
          <p className="userListTitle text-center">Stock</p>
        </div>
        <div className="col-2 d-none d-xl-block col-xl-3 col-xxl-1 p-0">
          <p className="userListTitle text-center">Propiedades</p>
        </div>
        <div className="col-2 d-none d-xxl-block col-xl-3 p-0">
          <p className="userListTitle text-center">Descripción</p>
        </div>
        <div className="col-1 d-none d-xxl-block p-0">
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
