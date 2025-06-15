import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import "./FormAdmin.css";

const FormUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    rol: "usuario",
    estado: "activo",
  });

  useEffect(() => {
    if (id) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuarioEncontrado = usuarios.find((u) => u.id === parseInt(id));
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (id) {
      const index = usuarios.findIndex((u) => u.id === parseInt(id));
      usuarios[index] = { ...usuario };
      Swal.fire("Éxito", "Usuario editado correctamente", "success");
    } else {
      const nuevoUsuario = {
        ...usuario,
        id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      };
      usuarios.push(nuevoUsuario);
      Swal.fire("Éxito", "Usuario creado correctamente", "success");
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    navigate("/admin/usuarios");
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Form className="form-personalizado w-100" onSubmit={handleSubmit}>
        <h2 className="form-titulo">
          {id ? "Editar usuario" : "Agregar usuario"}
        </h2>

        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={50}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rol</Form.Label>
          <Form.Select
            name="rol"
            value={usuario.rol}
            onChange={handleChange}
            required
          >
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            name="estado"
            value={usuario.estado}
            onChange={handleChange}
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn-agregar mt-3">
            {id ? "Guardar cambios" : "Agregar usuario"}
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default FormUsuario;
