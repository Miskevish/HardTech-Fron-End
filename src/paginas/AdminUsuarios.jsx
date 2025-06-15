
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TablaUsuarios from "../componentes/tablas/TablaUsuarios";
import Swal from "sweetalert2";
import "./AdminUsuarios.css";

const AdminUsuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
  const usuarioLogeado = JSON.parse(sessionStorage.getItem("usuarioLogeado"));

  if (!usuarioLogeado || usuarioLogeado.rol !== "administrador") {
    Swal.fire(
      "Acceso denegado",
      "Solo administradores pueden acceder",
      "error"
    );
    navigate("/");
  }

  let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Asegurar que todos los usuarios estén activos
  usuariosGuardados = usuariosGuardados.map((usuario) => ({
    ...usuario,
    estado: "activo",
  }));

  setUsuarios(usuariosGuardados);
  localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
}, [navigate]);



  const eliminarUsuario = (id) => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem("usuarioLogeado"));

    if (usuarioLogeado && usuarioLogeado.id === id) {
      Swal.fire("Error", "No podés eliminar tu propio usuario", "error");
      return;
    }

    Swal.fire({
      title: "¿Eliminar usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        const actualizados = usuarios.filter((u) => u.id !== id);
        setUsuarios(actualizados);
        localStorage.setItem("usuarios", JSON.stringify(actualizados));
        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
      }
    });
  };


  const editarUsuario = (id) => {
    navigate(`/admin/usuarios/formulario/${id}`);
  };

  return (
    <div className="admin-usuarios-page">
      <Container className="py-5">
        <div className="mb-4 text-center text-md-start">
          <h2 className="titulo-admin">Administrar Usuarios</h2>
         
        </div>

        <TablaUsuarios
          usuarios={usuarios}
          onEliminar={eliminarUsuario}
          onEditar={editarUsuario}
          actualizarLista={() => {
            const usuariosGuardados =
              JSON.parse(localStorage.getItem("usuarios")) || [];
            setUsuarios(usuariosGuardados);
          }}
        />
      </Container>
    </div>
  );
};

export default AdminUsuarios;
