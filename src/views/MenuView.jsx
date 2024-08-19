import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getProductsFn } from "../api/products";
import ProductCard from "../components/MenuView/ProductCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import "../components/MenuView/MenuView.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export const MenuView = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsFn,
  });

  if (isLoading) {
    return <p className="mt-3 text-center">Cargando productos...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger">
        Ocurrió un error leyendo los productos
      </div>
    );
  }

  if (products && products.data.length === 0) {
    return (
      <div className="alert alert-danger">
        No se encontraron productos para mostrar
      </div>
    );
  }

  const comidas = products.data.filter(
    (product) => product.category === "comidas"
  );
  const bebidas = products.data.filter(
    (product) => product.category === "bebidas"
  );

  const renderCards = (items) => {
    return items.length > 0 ? (
      items.map((product) => (
        <div className="product-card-wrapper" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))
    ) : (
      <div className="text-center">
        <p>No hay productos disponibles</p>
      </div>
    );
  };

  return (
    <>
      <section className="h1-menu">
        <h1>MENÚ</h1>
      </section>
      <section className="container text-center mt-4 mb-4 instruction">
        <h2>ESCOGE TU PLATO Y BEBIDA</h2>
        <p>Por favor, seleccioná "Añadir" en la opción que desees.</p>
      </section>
      <section className="container mt-3 category">
        <article>
          <h2 className="mb-4 text-center">Platos</h2>
          <Carousel responsive={responsive}>
            {renderCards(comidas)}
          </Carousel>
        </article>

        <article className="mt-5">
          <h2 className="mb-4 text-center">Bebidas</h2>
          <Carousel responsive={responsive}>
            {renderCards(bebidas)}
          </Carousel>
        </article>
      </section>
    </>
  );
};

export default MenuView;
