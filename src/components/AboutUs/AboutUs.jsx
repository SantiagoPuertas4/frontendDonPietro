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
        <article className="row m-4">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardAboutUs">
              <img
                src="./benja-img.jpg.jpeg"
                className="card-img-top-aboutUs"
                alt="Benjamín Giménez"
              />
              <div className="card-body pt-1">
                <h5 className="card-title">Benjamín Giménez</h5>
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
            <div className="cardAboutUs">
              <img
                src="./anabela-img.jpg.jpeg"
                className="card-img-top-aboutUs"
                alt="Anabela Guillermo"
              />
              <div className="card-body pt-1">
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
            <div className="cardAboutUs">
              <img
                src="./santi-img.jpg.jpeg"
                className="card-img-top-aboutUs"
                alt="Santiago Puertas"
              />
              <div className="card-body pt-1">
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
            <div className="cardAboutUs">
              <img
                src="/ignacio-img.jpg"
                className="card-img-top-aboutUs"
                alt="Ignacio Sal Paz"
              />
              <div className="card-body pt-1">
                <h5 className="card-title">Ignacio Sal paz</h5>
                <p className="card-text">
                  La búsqueda de respuestas a las preguntas más profundas del
                  universo es lo que impulsa cada uno de mis días. La física no
                  es solo un área de estudio, es una puerta hacia los misterios
                  que nos rodean. A través de la programación, convierto
                  problemas complejos en desafíos apasionantes, encontrando en
                  cada línea de código una oportunidad para refinar mi capacidad
                  de pensar de manera crítica y creativa.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardAboutUs">
              <img
                src="/Gabi.jpg"
                className="card-img-top-aboutUs"
                alt="Diosito Gabi"
              />
              <div className="card-body pt-1">
                <h5 className="card-title">Diosito Gabi</h5>
                <p className="card-text">
                  Oh, diosito Gabi, en tu código confiamos, por tus sabias
                  decisiones, siempre te alabamos. En el templo de Git y en el
                  altar de la consola, tu espíritu vive, en cada línea que se
                  controla. Que tu divina lógica nunca falte en nuestra senda, y
                  tu conocimiento, siempre sea nuestra ofrenda. Con gratitud y
                  devoción, en tu nombre hacemos un brindis, por el inmortal
                  diosito Gabi, el que en la programación nos guía y nos da fe.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default AboutUs;
