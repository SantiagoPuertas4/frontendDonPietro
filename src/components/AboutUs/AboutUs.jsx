// AboutUs.jsx
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <section>
        <h1 className="about-header">Acerca de nosotros</h1>
      </section>
      <section className="container text-center mt-3">
        <h2 className="title">Somos Don Pietro</h2>
        <p className="description ">
          Somos cuatro amigos con una pasión en común: crear la mejor página
          para Don Pietro, donde la tecnología se fusiona con la tradición para
          ofrecer una experiencia única.
        </p>
      </section>
      <section className="about-us">
        <div className="row m-4">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card">
              <img
                src="./benja-img.jpg.jpeg"
                className="card-img-top"
                alt="Member 1"
              />
              <div className="card-body">
                <h5 className="card-title">Benjamin Gimenez</h5>
                <p className="card-text">
                  Mi pasión por el mundo de la tecnología, el diseño y la
                  informática no solo es una parte integral de mi vida, sino
                  también una fuerza impulsora en mi carrera profesional. A lo
                  largo de los años, he demostrado mi habilidad para absorber
                  rápidamente nuevas tecnologías y conceptos.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card">
              <img
                src="./anabela-img.jpg.jpeg"
                className="card-img-top"
                alt="Member 2"
              />
              <div className="card-body">
                <h5 className="card-title">Anabela Guillermo</h5>
                <p className="card-text">
                  Soy una apasionada del aprendizaje con un máster en Marketing
                  Digital, certificada como Fotógrafa, con formación en Tester
                  QA Manual y Programación Full Stack. La música es una parte
                  esencial de mi vida; canto y toco guitarra, piano, y
                  violonchelo. Siempre busco nuevas oportunidades para expandir
                  mis conocimientos y habilidades.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card">
              <img
                src="./santi-img.jpg.jpeg"
                className="card-img-top"
                alt="Member 3"
              />
              <div className="card-body">
                <h5 className="card-title">Santiago Puertas</h5>
                <p className="card-text">
                  Apasionado por el conocimiento y los misterios del cosmos, me
                  considero un eterno estudiante del universo y sus leyes. La
                  física no es solo una ciencia para mí, sino una ventana a los
                  secretos más profundos de la realidad. Además, la programación
                  y la resolución de problemas lógicos son el terreno donde
                  ejercito mi mente, enfrentándome a desafíos que afinan mi
                  ingenio.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card">
              <img src="/member4.jpg" className="card-img-top" alt="Member 4" />
              <div className="card-body">
                <h5 className="card-title">Ignacio sal paz</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique vero, officia dolores soluta excepturi non in illum
                  error impedit iure pariatur eos ipsum voluptate tenetur
                  recusandae quae, deleniti rerum et accusantium dolorem
                  molestias aut? Reiciendis, nam itaque vitae quasi dolorum
                  culpa quibusdam et dolores explicabo facilis cum velit beatae
                  enim?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
