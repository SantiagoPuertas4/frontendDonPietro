import Swal from "sweetalert2";
import { useSession } from "../stores/useSession";
import { useOrders } from "../stores/useOrders";
import { useCart } from "../stores/useCart";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { postOrderFn } from "../api/order";
import { getProductsFn } from "../api/products";

import { decodeJWT } from "../utilities/decodeJWT";

import Input from "../components/ui/input/Input";
import { CartTable } from "../components/CartView/CartTable";
import LocationMap from "../components/ui/Map/LocationMap";

import "../components/CartView/CartView.css";

const CartView = () => {
  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const { data: products, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsFn,
  });
  const QueryClient = useQueryClient();

  const { items, updateItemQuantity, removeItem, clearCart } = useCart();
  const { tableNumber } = useSession();
  const { addOrder } = useOrders();
  const { getCartTotal, updateItemStock } = useCart();
  const total = getCartTotal();

  const { mutate: postOrder } = useMutation({
    mutationFn: postOrderFn,
    onSuccess: () => {
      Swal.fire({
        title: "¡Éxito!",
        text: "Pedido realizado con éxito. Aparecera tu historial una vez completado el pedido ",
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
      let msg = "Los siguientes productos tienen un stock menor a lo pedido:\n";
      let hasLowStock = false;
      if (isSuccess) {
        products.data.forEach((product) => {
          const storedStock = product.stock;
          const requestedQuantity =
            items.find((item) => item.id === product.id)?.quantity || 0;

          if (storedStock < requestedQuantity) {
            msg += `- ${product.name}: Disponible (${storedStock}), Solicitado (${requestedQuantity})\n`;
            hasLowStock = true;
          }

          sessionStorage.setItem(`stock_${product.id}`, storedStock);
          updateItemStock(product.id, product.stock);
          msg = msg.replace(/\n/g, "<br>");
        });
      }

      if (hasLowStock) {
        Swal.fire({
          title: "Stock insuficiente",
          html: msg,
          icon: "warning",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "swal-button",
          },
        });
      } else {
        Swal.fire({
          title: "Stock insuficiente",
          html: "Hubo un problema al realizar el pedido: " + e.message,
          icon: "warning",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "swal-button",
          },
        });
      }
    },
  });

  const handleOrder = async (comments) => {
    QueryClient.invalidateQueries({
      queryKey: ["productos"],
    });
    const token = sessionStorage.getItem("token");
    const datos = decodeJWT(token);

    const order = {
      userName: datos.user.fullname,
      products: items.map((item) => ({
        product: item,
      })),
      comments: comments,
      total: total,
      table: tableNumber,
    };

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
            const restoredStock = storedStock;
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
      <section className="container">
        <h2 className="text-white mt-4 text-center">Comentarios</h2>
        <form className="row" onSubmit={onSubmitRHF(handleSubmit)}>
          <Input
            register={register}
            name="comments"
            label="Escribe tus preferencias"
            errors={errors.comments}
            maxLength={300}
            options={{
              maxLength: {
                value: 300,
                message: "El campo no puede tener más de 300 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ,\s]+$/,
                message:
                  "El campo solo permite letras, numeros, coma y espacio",
              },
            }}
            labelClassName="mainContactLabel"
            inputClassName="mainContactInput"
            ClassName="p-0"
            textarea={true}
          />
          <article className="text-center">
            <button type="submit" className="btn-order">
              Realizar Pedido
            </button>
            <button
              type="button"
              onClick={handleClearCart}
              className="btn-clear"
            >
              Vaciar Carrito
            </button>
          </article>
        </form>
      </section>
      <section className="container d-flex flex-column g-3 mt-5">
        <LocationMap />
      </section>
    </>
  );
};

export default CartView;
