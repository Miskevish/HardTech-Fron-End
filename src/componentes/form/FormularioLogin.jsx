import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "./FormC.css";

const FormularioLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ usuario: "", contrasenia: "" });

  const handleChange = (ev) => {
    setLogin({ ...login, [ev.target.name]: ev.target.value });
  };

  const iniciarSesion = (ev) => {
    ev.preventDefault();
    const { usuario, contrasenia } = login;
    const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!usuario || !contrasenia) {
      return Swal.fire("Error", "Completa todos los campos", "error");
    }

    const usuarioExiste = usuariosLs.find(
      (u) => u.nombreUsuario === usuario && u.status === "enable"
    );

    if (!usuarioExiste) {
      return Swal.fire(
        "Error",
        "Usuario no registrado o deshabilitado",
        "error"
      );
    }

    if (usuarioExiste.contrasenia !== contrasenia) {
      return Swal.fire("Error", "Contraseña incorrecta", "error");
    }

    usuarioExiste.login = true;
    localStorage.setItem("usuarios", JSON.stringify(usuariosLs));
    sessionStorage.setItem("usuarioLogeado", JSON.stringify(usuarioExiste));

    Swal.fire("Bienvenido", `Hola ${usuarioExiste.nombreUsuario}`, "success");

    setTimeout(() => {
      if (usuarioExiste.rol === "administrador") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }, 1000);
  };

  return (
    <div fluid className="formulario-page">
      <Container className="d-flex justify-content-center my-5">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form className="form-personalizado" onSubmit={iniciarSesion}>
              <h2 className="form-titulo">Iniciar Sesión</h2>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Usuario"
                  name="usuario"
                  value={login.usuario}
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={30}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  name="contrasenia"
                  value={login.contrasenia}
                  onChange={handleChange}
                  required
                  minLength={8}
                  maxLength={30}
                />
              </Form.Group>

              <button type="submit" className="btn-agregar w-100">
                Iniciar Sesión
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormularioLogin;
