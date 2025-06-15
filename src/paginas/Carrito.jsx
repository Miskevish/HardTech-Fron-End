import { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "./Carrito.css";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const obtenerProductos = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const conCantidad = carrito.map((prod) => ({
      ...prod,
      cantidad: prod.cantidad || 1,
    }));
    setProductos(conCantidad);
  };

  const calcularTotales = () => {
    const totalFinal = productos.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
    const itemsFinal = productos.reduce((acc, prod) => acc + prod.cantidad, 0);
    setTotal(totalFinal);
    setTotalItems(itemsFinal);
  };

  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((res) => {
      if (res.isConfirmed) {
        const actualizado = productos.filter((p) => p.id !== id);
        setProductos(actualizado);
        localStorage.setItem("carrito", JSON.stringify(actualizado));
        Swal.fire("Eliminado", "El producto fue eliminado", "success");
      }
    });
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    const actualizado = productos.map((p) =>
      p.id === id ? { ...p, cantidad: parseInt(nuevaCantidad) } : p
    );
    setProductos(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
  };

  const vaciarCarrito = () => {
    Swal.fire({
      title: "¿Vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("carrito");
        setProductos([]);
        setTotal(0);
        setTotalItems(0);
        Swal.fire("Listo", "Tu carrito fue vaciado", "success");
      }
    });
  };

  const confirmarCompra = () => {
    Swal.fire("¡Gracias!", "Tu compra ha sido realizada con éxito", "success");
    localStorage.removeItem("carrito");
    setProductos([]);
    setTotal(0);
    setTotalItems(0);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    calcularTotales();
  }, [productos]);

  return (
    <div className="carrito-page">
      <Container className="my-5 carrito-container">
        {productos.length === 0 ? (
          <div className="carrito-vacio">
            <h2>Tu carrito está vacío 🛒</h2>
            <p>Agregá productos para comenzar tu compra</p>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-center text-config">Carrito de Compras</h2>
            <Table
              bordered
              hover
              responsive
              className="text-center tabla-con-radius"
            >
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <img
                        src={prod.imagen}
                        alt={prod.titulo}
                        style={{ width: "100px", borderRadius: "10px" }}
                      />
                    </td>
                    <td>{prod.titulo}</td>
                    <td>${prod.precio}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min={1}
                        value={prod.cantidad}
                        onChange={(e) =>
                          cambiarCantidad(prod.id, e.target.value)
                        }
                        style={{ width: "80px", margin: "auto" }}
                      />
                    </td>
                    <td>${(prod.precio * prod.cantidad).toFixed(2)}</td>
                    <td>
                      <Button
                        className="btn-eliminar"
                        variant="danger"
                        onClick={() => eliminarProducto(prod.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="resumen-carrito mt-4">
              <h4>Total de productos: {totalItems}</h4>
              <h4>Total a pagar: ${total.toFixed(2)}</h4>
              <div className="botones-resumen">
                <Button
                  className="btn-eliminar"
                  variant="warning"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </Button>
                <Button
                  className="btn-confirmar"
                  variant="success"
                  onClick={confirmarCompra}
                >
                  Confirmar compra
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Carrito;
