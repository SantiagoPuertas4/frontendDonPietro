// CartView.jsx
import React from "react";
import Swal from "sweetalert2";
import { useCart } from "../stores/useCart";
import { useSession } from "../stores/useSession";
import { useOrders } from "../stores/useOrders";
import "../components/CartView/CartView.css";
import { CartTable } from "../components/CartView/CartTable";
import Input from "../components/ui/input/Input";
import { useForm } from "react-hook-form";

const CartView = () => {
  const {
    register,
    reset,
    handleSubmit: onSubmitRHF,
    formState: {errors},
  } = useForm()
  const { items, updateItemQuantity, removeItem, clearCart } = useCart();
  const { tableNumber } = useSession();
  const { addOrder } = useOrders();

  const handleOrder = async (comments) => {
    const order = {
      products: items,
      tableNumber,
      date: new Date().toLocaleString(),
      Total: items.reduce((acc, item) => acc + item.quantity * item.price, 0),
      comments: comments
    };

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = sessionStorage.getItem('token');

      if (!token) {
        throw new Error('Token de autenticación no disponible');
      }

      const response = await fetch(`${BACKEND_URL}/order/hand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al realizar el pedido');
      }

      const result = await response.json();
      console.log('Resultado del backend:', result);

      addOrder(order);

      Swal.fire({
        title: "¡Éxito!",
        text: "Pedido realizado con éxito",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "swal-button",
        },
      }).then(() => {
        items.forEach((item) => {
          const storedStock = parseInt(
            sessionStorage.getItem(`stock_${item.id}`),
            10
          );
          if (!isNaN(storedStock)) {
            const newStock = storedStock - item.quantity;
            sessionStorage.setItem(`stock_${item.id}`, newStock);
          }
        });
        clearCart();
      });

    } catch (error) {
      console.error('Error en handleOrder:', error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al realizar el pedido: " + error.message,
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "swal-button",
        },
      });
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto vaciará todo el carrito. Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar carrito",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "swal-button",
        cancelButton: "swal-button-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        items.forEach((item) => {
          const storedStock = parseInt(
            sessionStorage.getItem(`stock_${item.id}`),
            10
          );
          if (!isNaN(storedStock)) {
            const restoredStock = storedStock + item.quantity;
            sessionStorage.setItem(`stock_${item.id}`, restoredStock);
          }
        });
        clearCart();
        Swal.fire({
          title: "¡Carrito vacío!",
          text: "El carrito ha sido vaciado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "swal-button",
          },
        });
      }
    });
  };

  if (items.length === 0) {
    return (
      <>
        <section className="h1-cart">
          <h1>CARRITO</h1>
        </section>
        <p className="text-center text-white mt-5">
          No hay productos en el carrito.
        </p>
      </>
    );
  }

  const handleSubmit = (data) => {
    const {comments} = data;
    console.log(data.comments);
    handleOrder(comments)
  }

  return (
    <>
      <section className="h1-cart">
        <h1>CARRITO</h1>
      </section>
      <section>
        <h2 className="mt-3 text-center text-white">Gestioná tu pedido</h2>
        {tableNumber && (
          <h5 className="text-center text-white mt-3">
            Número de mesa: {tableNumber}
          </h5>
        )}
      </section>
      <CartTable
        items={items}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={removeItem}
      />
      <section className="text-center mt-4">
        <p className="status">
          Estado del pedido: <span className="waiting">En espera</span>
        </p>
      </section>
      <section>
        <h2>Comentario</h2>
        <form className="row" onSubmit={onSubmitRHF(handleSubmit)}>
        <Input
            register={register}
            name="comments"
            label="Comentarios"
            errors={errors.comments}
            options={{
              required: "El campo es requerido",
              maxLength: {
                value: 300,
                message: "El campo no puede tener mas de 300 caracteres",
              },
              minLength: {
                value: 15,
                message: "El campo no puede tener menos de 15 caracteres",
              },
            }}
            labelClassName="productEditLabel"
            inputClassName="productEditInput"
            ClassName="col-12 p-0"
            textarea={true}
          />
                <section className="text-center">
        <button onClick={handleSubmit} className="btn-order">
          Realizar Pedido
        </button>
        <button onClick={handleClearCart} className="btn-clear">
          Vaciar Carrito
        </button>
      </section>
          </form>
      </section>

    </>
  );
};

export default CartView;
