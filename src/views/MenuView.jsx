import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Carousel from "react-multi-carousel";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "../stores/useSession";

import { getProductsFn } from "../api/products";

import ProductCard from "../components/MenuView/ProductCard";
import LocationMap from "../components/ui/Map/LocationMap";

import "../components/MenuView/MenuView.css";
import "react-multi-carousel/lib/styles.css";
import { useCart } from "../stores/useCart";

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
  const mesas = JSON.parse(sessionStorage.getItem("mesas"));
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsFn,
  });

  const { tableNumber, setTableNumber, logout } = useSession();
  const { updateItemStock } = useCart();
  const [showTableNumberPrompt, setShowTableNumberPrompt] = useState(
    !tableNumber
  );

  useEffect(() => {
    const requestTableNumber = async () => {
      if (showTableNumberPrompt) {
        const { value: number } = await Swal.fire({
          title: "Número de Mesa",
          text: "Por favor, selecciona tu número de mesa para continuar. Si prefieres, puedes cerrar sesión.",
          input: "select",
          inputOptions: mesas || {
            1: "Mesa 1",
            2: "Mesa 2",
            3: "Mesa 3",
            4: "Mesa 4",
            5: "Mesa 5",
            6: "Mesa 6",
            7: "Mesa 7",
            8: "Mesa 8",
            9: "Mesa 9",
            10: "Mesa 10",
            11: "Mesa 11",
            12: "Mesa 12",
            13: "Mesa 13",
            14: "Mesa 14",
            15: "Mesa 15",
            16: "Mesa 16",
            17: "Mesa 17",
            18: "Mesa 18",
            19: "Mesa 19",
            20: "Mesa 20",
          },
          inputValue: tableNumber || "",
          inputPlaceholder: "Selecciona un número",
          showCancelButton: false,
          confirmButtonText: "Guardar",
          customClass: {
            confirmButton: "swal-button",
          },
          showDenyButton: true,
          denyButtonText: "Cerrar sesión",
          allowOutsideClick: false,
          allowEscapeKey: false,
          preConfirm: (number) => {
            if (!number && number !== false) {
              Swal.showValidationMessage(
                "Por favor, selecciona un número de mesa."
              );
            }
            return number;
          },
        });

        if (number === false) {
          const confirmLogout = await Swal.fire({
            title: "Confirmar Cierre de Sesión",
            text: "¿Estás seguro de que quieres cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            customClass: {
              confirmButton: "swal-button",
              cancelButton: "swal-button-cancel",
            },
          });

          if (confirmLogout.isConfirmed) {
            logout();
          }
        } else if (number) {
          setTableNumber(number);
          setShowTableNumberPrompt(false);
        }
      }
    };

    requestTableNumber();
  }, [
    showTableNumberPrompt,
    mesas,
    tableNumber,
    logout,
    setTableNumber,
    setShowTableNumberPrompt,
  ]);

  useEffect(() => {
    if (isSuccess) {
      products.data.forEach((product) => {
        const updatedStock = product.stock;
        sessionStorage.setItem(`stock_${product.id}`, updatedStock);
        updateItemStock(product.id, product.stock);
      });
    }
  }, [products]);

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

  const availableProducts = products.data.filter(
    (product) => product.isAvailable
  );

  const comidas = availableProducts.filter(
    (product) => product.category === "comidas"
  );
  const bebidas = availableProducts.filter(
    (product) => product.category === "bebidas"
  );

  const renderCards = (items) => {
    return items.length > 0 ? (
      items.map((product) => (
        <div
          className="product-card-wrapper d-flex justify-content-center h-100"
          key={product.id}
        >
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
        <p>Por favor, seleccioná `Añadir` en la opción que desees.</p>
      </section>
      <section className="text-center mb-4">
        <button
          className="order-button"
          onClick={() => setShowTableNumberPrompt(true)}
        >
          Editar número de mesa
        </button>
      </section>
      <section className="container mt-3 category">
        {tableNumber ? (
          <>
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
          </>
        ) : (
          <article className="text-center">
            <p>Necesitamos saber tu número de mesa para continuar.</p>
            <Link to="/menu">
              <button className="btn-order">Conocé más...</button>
            </Link>
            <button className="btn btn-danger" onClick={logout}>
              Cerrar sesión
            </button>
          </article>
        )}
      </section>
      <section className="container d-flex flex-column g-3 mt-5">
        <LocationMap />
      </section>
    </>
  );
};

export default MenuView;
