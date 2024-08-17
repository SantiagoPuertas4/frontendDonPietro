import React from "react";

export const Presentation = () => {
  return (
    <>
      <section className="container mt-4 presentation">
        <h2 className="title-pietro">Somos Don Pietro</h2>
        <p className="m-4 mb-5">
          Combinamos la auténtica cocina italiana con un ambiente acogedor y
          familiar.
          <br />
          Inspirado en las recetas tradicionales de Italia, nuestro menú ofrece
          una variedad de platos elaborados con ingredientes frescos y de alta
          calidad.
          <br />
          Desde pastas artesanales hasta pizzas al horno de leña, cada plato es
          una celebración de los sabores y la cultura italiana.
          <br />
          Ya sea para una cena romántica, una reunión familiar o un almuerzo
          casual, Don Pietro es el lugar perfecto para disfrutar de una
          experiencia culinaria única y deliciosa.
        </p>
      </section>

      <section className="img-presentation">
        <article className="row m-4">
          <div className="col-12 col-md-4 mt-4">
            <img src="/pizza.jpg" className="img-fluid" alt="Pizza" />
          </div>
          <div className="col-12 col-md-4 mt-4">
            <img src="/paella.jpg" className="img-fluid" alt="Paella" />
          </div>
          <div className="col-12 col-md-4 mt-4 mb-4">
            <img src="/lasagna.jpg" className="img-fluid" alt="Lasagna" />
          </div>
        </article>
      </section>
    </>
  );
};

export default Presentation;
