import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-bootstrap";
import "./DetalleProducto.css";

const STORAGE_KEY = "productos";
const getAllProducts = () => {
  const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!raw) return [];
  return Array.isArray(raw) ? raw : raw.items || [];
};

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cache = JSON.parse(
      localStorage.getItem("productoSeleccionado") || "null"
    );
    if (cache && cache.id === Number(id)) {
      setProducto(cache);
      return;
    }

    const lista = getAllProducts();
    const found = lista.find((p) => p.id === Number(id));

    if (found) {
      setProducto(found);
      localStorage.setItem("productoSeleccionado", JSON.stringify(found));
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Producto no encontrado",
      text: "No pudimos cargar el producto. Serás redirigido al inicio.",
    });
    navigate("/");
  }, [id, navigate]);

  const agregarAlCarrito = () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogeado"));
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!usuario) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión",
        text: "Serás redirigido al login.",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/IniciarSesion"), 2000);
      return;
    }

    if (usuario.rol === "administrador") {
      Swal.fire({
        icon: "info",
        title: "Función no disponible",
        text: "Los administradores no pueden agregar productos al carrito.",
      });
      return;
    }

    if (carrito.some((p) => p.id === producto.id)) {
      Swal.fire({
        icon: "info",
        title: "Ya está en el carrito",
        text: "Podés modificar la cantidad desde el carrito.",
      });
      return;
    }

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: "Se cargó correctamente al carrito.",
    });
  };

  const comprarAhora = () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogeado"));

    if (!usuario) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión",
        text: "Serás redirigido al login.",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/IniciarSesion"), 2000);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Función en desarrollo",
      text: "Próximamente vas a poder pagar con MercadoPago 💳",
    });
  };

  if (!producto) {
    return <div className="text-center my-5">Cargando producto...</div>;
  }

  return (
    <div className="detalle-producto-page">
      <Container className="my-5">
        <Row>
          <Col md={6} className="text-center">
            <img
              src={producto.imagen}
              alt={producto.titulo}
              className="product-detail-image"
            />
          </Col>

          <Col md={6}>
            <h2 className="product-detail-title">{producto.titulo}</h2>
            <p className="product-detail-price">Precio: ${producto.precio}</p>
            <p className="product-description">{producto.descripcion}</p>
            <p className="product-detail-category">
              Categoría: {producto.categoria || "Sin categoría"}
            </p>
            <p className="product-detail-id">ID: {producto.id}</p>

            <div className="d-flex gap-3 flex-wrap">
              <button className="btn-agregar" onClick={agregarAlCarrito}>
                Agregar al carrito
              </button>
              <button className="btn-agregar" onClick={comprarAhora}>
                Comprar ahora
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetalleProducto;
