import React from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Pagina404.css";

const Pagina404 = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-left">
        <DotLottieReact
          src="https://lottie.host/844a6a42-14de-4972-9336-e03ceb8ed993/9vmyUpAj2x.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="not-found-right">
        <h1 className="not-found-title">404 - Página no encontrada</h1>
        <p className="not-found-text">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <button className="btn-agregar" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Pagina404;
