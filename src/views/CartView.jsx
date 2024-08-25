import Swal from "sweetalert2";
import { useCart } from "../stores/useCart";
import { useSession } from "../stores/useSession";
import { useOrders } from "../stores/useOrders";
import "../components/CartView/CartView.css";
import { CartTable } from "../components/CartView/CartTable";
import Input from "../components/ui/input/Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postOrderFn } from "../api/order";
import { decodeJWT } from "../utilities/decodeJWT";
import LocationMap from "../components/ui/Map/LocationMap";

const CartView = () => {
  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();
  const { items, updateItemQuantity, removeItem, clearCart } = useCart();
  const { tableNumber } = useSession();
  const { addOrder } = useOrders();
  const { getCartTotal } = useCart();
  const total = getCartTotal();

  const { mutate: postOrder } = useMutation({
    mutationFn: postOrderFn,
    onSuccess: () => {
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
    },
    onError: (e) => {
      console.error("Error en handleOrder:", e);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al realizar el pedido: " + e.message,
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "swal-button",
        },
      });
    },
  });

  const handleOrder = async (comments) => {
    const token = sessionStorage.getItem("token");
    const datos = decodeJWT(token);

    const order = {
      userName: datos.user.fullname,
      products: items.map((item) => ({
        product: item,
      })),
      comments: comments,
      total: total,
    };

    console.log(order);

    postOrder(order);
    addOrder(order);
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
    const { comments } = data;
    console.log(comments);
    handleOrder(comments);
  };

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
      <section className="container text-center">
        <h2 className="text-white mt-4">Comentarios</h2>
        <form className="row" onSubmit={onSubmitRHF(handleSubmit)}>
          <Input
            register={register}
            name="comments"
            label="Escribe tus preferencias"
            errors={errors.comments}
            options={{
              maxLength: {
                value: 300,
                message: "El campo no puede tener mas de 300 caracteres",
              },
            }}
            labelClassName="productEditLabel"
            inputClassName="productEditInput"
            ClassName="col-12 p-0"
            textarea={true}
          />
          <article className="text-center">
            <button type="submit" className="btn-order">
              Realizar Pedido
            </button>
            <button onClick={handleClearCart} className="btn-clear">
              Vaciar Carrito
            </button>
          </article>
        </form>
      </section>
      <div className="container d-flex flex-column g-3 mt-5">
          <LocationMap />
        </div>
    </>
  );
};

export default CartView;
