import { Table, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const TablaUsuarios = ({ usuarios, onEditar, onEliminar, actualizarLista }) => {
  const toggleEstado = (id) => {
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuariosGuardados.findIndex((u) => u.id === id);

    if (index !== -1) {
      const nuevoEstado =
        usuariosGuardados[index].estado === "activo" ? "inactivo" : "activo";
      usuariosGuardados[index].estado = nuevoEstado;
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

      Swal.fire({
        icon: "success",
        title: `Usuario ${
          nuevoEstado === "activo" ? "habilitado" : "deshabilitado"
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
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No hay usuarios disponibles.
              </td>
            </tr>
          ) : (
            usuarios.map((usuario, index) => (
              <tr key={usuario.id}>
                <td>{index + 1}</td>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.emailUsuario}</td>
                <td>{usuario.rol}</td>
                <td
                  className={
                    usuario.estado === "activo" ? "text-success" : "text-danger"
                  }
                >
                  {usuario.estado === "activo" ? "Activo" : "Inactivo"}
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                    <Button
                      variant={
                        usuario.estado === "activo" ? "warning" : "success"
                      }
                      onClick={() => toggleEstado(usuario.id)}
                    >
                      {usuario.estado === "activo"
                        ? "Deshabilitar"
                        : "Habilitar"}
                    </Button>
                    <Button variant="info" onClick={() => onEditar(usuario.id)}>
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onEliminar(usuario.id)}
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

TablaUsuarios.propTypes = {
  usuarios: PropTypes.array.isRequired,
  onEditar: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
  actualizarLista: PropTypes.func.isRequired,
};

export default TablaUsuarios;
