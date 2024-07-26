import React from "react";
import { Link } from "react-router-dom";

const Redirector = () => {
  return (
    <section className="redirector">
      <Link to="/candidatos" className="redirector-button">
        <button>Ver Candidatos</button>
      </Link>
      <Link to="/insights" className="redirector-button">
        <button>Ver Análisis</button>
      </Link>
    </section>
  );
};

export default Redirector;