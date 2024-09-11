import React from "react";

function Home() {
  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row gy-4">
          <div
            className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
            data-aos="zoom-out"
          >
            <div className="hero-content color-theme">
              <h1>
                <span>Le Meilleur du Cinéma</span>
              </h1>
              <p>
                Découvrez les contenus les plus populaires et les mieux notés en
                temps réel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Home;
