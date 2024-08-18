import { useNavigate } from "react-router-dom";
import { useSession } from "../../stores/useSession.js";
import logo from "/DonPietroBlanco.png";

export const PageCover = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSession();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/menu");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="container-fluid home-container">
      <article className="overlay">
        <img src={logo} alt="Logo Don Pietro Blanco" className="home-logo" />
        <button onClick={handleButtonClick} className="order-button">
          Hacé tu pedido
        </button>
      </article>
    </section>
  );
};

export default PageCover;
