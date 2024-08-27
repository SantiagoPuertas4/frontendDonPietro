export const Wines = () => {
  return (
    <>
      <section className="container mt-4 presentation">
        <h2 className="title-pietro">Nuestra bodega</h2>
        <p className="m-4 mb-5">
          Nos enorgullece ofrecer una selección excepcional de vinos que
          complementan a la perfección nuestra gastronomía italiana.
          <br />
          Desde vinos robustos y añejos hasta opciones frescas y vibrantes, cada
          botella ha sido cuidadosamente elegida para realzar la experiencia
          culinaria de nuestros huéspedes.
          <br />
          Nuestro sommelier está disponible para guiarte a través de nuestra
          carta y ayudarte a encontrar el vino ideal para tu comida.
        </p>
      </section>

      <section className="img-store">
        <img className="img-fluid img-wine" src="/wine.jpg" alt="Vinos" />
      </section>
    </>
  );
};

export default Wines;
