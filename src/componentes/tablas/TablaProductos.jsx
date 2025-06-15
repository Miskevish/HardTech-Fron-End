import { Table, Button, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import "./TablaProductos.css";
import Swal from "sweetalert2";

const TablaProductos = ({ data, onEditar, onEliminar, actualizarLista }) => {
  const toggleEstado = (id) => {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const index = productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      const nuevoEstado =
        productos[index].status === "enable" ? "disabled" : "enable";
      productos[index].status = nuevoEstado;
      localStorage.setItem("productos", JSON.stringify(productos));
      Swal.fire({
        icon: "success",
        title: `Producto ${
          nuevoEstado === "enable" ? "habilitado" : "deshabilitado"
        }`,
        showConfirmButton: false,
        timer: 1500,
      });
      actualizarLista(); 
    }
  };

  return (
    <div className="tabla-admin-wrapper">
      <Table bordered hover responsive className="tabla-admin">
        <thead>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No hay productos disponibles.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={item.imagen}
                    alt={item.titulo}
                    thumbnail
                    className="admin-img"
                  />
                </td>
                <td>{item.titulo}</td>
                <td>{item.descripcion}</td>
                <td>${item.precio}</td>
                <td>{item.categoria}</td>
                <td
                  className={
                    item.status === "enable" ? "text-success" : "text-danger"
                  }
                >
                  {item.status === "enable" ? "Habilitado" : "Deshabilitado"}
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                    <Button
                      variant={item.status === "enable" ? "warning" : "success"}
                      onClick={() => toggleEstado(item.id)}
                    >
                      {item.status === "enable" ? "Deshabilitar" : "Habilitar"}
                    </Button>
                    <Button variant="info" onClick={() => onEditar(item.id)}>
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onEliminar(item.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

TablaProductos.propTypes = {
  data: PropTypes.array.isRequired,
  onEditar: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
  actualizarLista: PropTypes.func.isRequired,
};

export default TablaProductos;
