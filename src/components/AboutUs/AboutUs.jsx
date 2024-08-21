// AboutUs.jsx
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us">
      <h1 className="title">Somos Don Pietro</h1>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
      </p>
      <div className="row m-4">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card">
            <img src="./benja-img.jpg" className="card-img-top" alt="Member 1" />
            <div className="card-body">
              <h5 className="card-title">Benjamin Gimenez</h5>
              <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sequi delectus deserunt, soluta animi tempore!</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card">
            <img src="/member2.jpg" className="card-img-top" alt="Member 2" />
            <div className="card-body">
              <h5 className="card-title">Anabela Guillermo</h5>
              <p className="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi nisi magni recusandae eos aliquam. Voluptate!</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card">
            <img src="/member3.jpg" className="card-img-top" alt="Member 3" />
            <div className="card-body">
              <h5 className="card-title">Santiago Puertas</h5>
              <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloremque quidem quasi, vero cum delectus.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card">
            <img src="/member4.jpg" className="card-img-top" alt="Member 4" />
            <div className="card-body">
              <h5 className="card-title">Ignacio sal paz</h5>
              <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt laudantium inventore, dicta obcaecati vero id?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;