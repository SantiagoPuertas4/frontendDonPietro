import Swal from "sweetalert2";
import { toast } from "sonner";
import PropTypes from "prop-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchOrderFn } from "../../api/order";

const PendingDeliveryCard = (props) => {
  const { order, setDetails, setModal } = props;
  const QueryClient = useQueryClient();
  const { mutate: patchOrder } = useMutation({
    mutationFn: patchOrderFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Orden guardada");

      QueryClient.invalidateQueries({
        queryKey: ["deliveryOrders"],
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

  const handleDelivered = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto guardara la orden en el historial. Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar orden",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: {
        confirmButton: "swal-success",
        cancelButton: "swal-button-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        patchOrder({
          orderId: order.id,
          status: "PendingDelivery",
          newStatus: "Completed",
        });
      }
    });
  };

  const handleDetails = () => {
    setDetails(order);
    setModal(true);
  };

  return (
    <section className="col-12 col-md-5 col-xl-3 m-1 pendingCard">
      <article className="m-1 p-2 d-flex flex-column justify-content-between gap-2 m-2  w-100">
        <h2 className="pendingTitle text-center">{order.userName}</h2>
        <div className="d-flex flex-column align-items-center gap-2 ">
          <p>
            TOTAL: <b>${order.total}</b>
          </p>
        </div>
        <div className="row gap-2 p-2">
          <button onClick={handleDetails} className="confirm-button-class">
            Detalles
          </button>
          <button onClick={handleDelivered} className="success-button-class">
            Entregado
          </button>
        </div>
      </article>
    </section>
  );
};
export default PendingDeliveryCard;
const productPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  isGlutenFree: PropTypes.bool.isRequired,
  isVegan: PropTypes.bool.isRequired,
  isVegetarian: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
});

PendingDeliveryCard.propTypes = {
  order: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    comments: PropTypes.string,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        product: productPropType.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
  }),
  setModal: PropTypes.func.isRequired,
  setDetails: PropTypes.func.isRequired,
};
