import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPendingDeliveryOrderFn } from "../../api/order";
import { toast } from "sonner";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const PendingDeliveryCard = (props) => {
  const { order, setDetails, setModal } = props;
  const QueryClient = useQueryClient();
  const { mutate: patchPendingDeliveryOrder } = useMutation({
    mutationFn: patchPendingDeliveryOrderFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Orden guardada");

      QueryClient.invalidateQueries({
        queryKey: ["pendingOrders"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
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
        patchPendingDeliveryOrder(order.id);
      }
    });
  };

  const handleDetails = () => {
    setDetails(order);
    setModal(true);
  };

  return (
    <article className="col-12 col-md-5 col-xl-3 m-1 pendingCard">
      <div className="m-1 p-2 d-flex flex-column justify-content-between gap-2 m-2">
        <h2 className="pendingTitle text-center">{order.userName}</h2>
        <section className="d-flex flex-column align-items-center gap-2 ">
          <p>
            TOTAL: <b>${order.total}</b>
          </p>
        </section>
        <section className="row gap-2">
          <button onClick={handleDetails} className="confirm-button-class">
            Detalles
          </button>
          <button onClick={handleDelivered} className="success-button-class">
            Entregado
          </button>
        </section>
      </div>
    </article>
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
