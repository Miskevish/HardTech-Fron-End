import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "./FormC.css";

const FormularioRegistro = () => {
  const navigate = useNavigate();
  const [registro, setRegistro] = useState({
    usuario: "",
    email: "",
    contrasenia: "",
    repContrasenia: "",
    check: false,
  });

  const handleChange = (ev) => {
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setRegistro({ ...registro, [ev.target.name]: value });
  };

  const validarRegistro = (ev) => {
    ev.preventDefault();
    const { usuario, email, contrasenia, repContrasenia, check } = registro;
    const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!usuario.trim() || !email.trim() || !contrasenia || !repContrasenia) {
      return Swal.fire("Error", "Todos los campos son obligatorios", "error");
    }

    if (!emailRegex.test(email)) {
      return Swal.fire("Error", "Formato de email inválido", "error");
    }

    if (!passwordRegex.test(contrasenia)) {
      return Swal.fire(
        "Error",
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.",
        "error"
      );
    }

    if (contrasenia !== repContrasenia) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    if (!check) {
      return Swal.fire(
        "Error",
        "Debes aceptar los términos y condiciones",
        "error"
      );
    }

    const usuarioExistente = usuariosLs.find(
      (u) => u.nombreUsuario === usuario || u.emailUsuario === email
    );

    if (usuarioExistente) {
      return Swal.fire(
        "Error",
        "El usuario o email ya están registrados",
        "error"
      );
    }

    const nuevoUsuario = {
      id: usuariosLs[usuariosLs.length - 1]?.id + 1 || 1,
      nombreUsuario: usuario,
      emailUsuario: email,
      contrasenia,
      tyc: check,
      rol: "usuario",
      login: false,
      status: "enable",
    };

    usuariosLs.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosLs));

    Swal.fire("Registro exitoso!", "Ya podés iniciar sesión", "success");
    setTimeout(() => navigate("/IniciarSesion"), 1500);
  };

  return (
    <div className="formulario-page">
      <Container className="d-flex justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form className="form-personalizado" onSubmit={validarRegistro}>
              <h2 className="form-titulo">Crear Cuenta</h2>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Usuario"
                  name="usuario"
                  value={registro.usuario}
                  onChange={handleChange}
                  minLength={5}
                  maxLength={30}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com"
                  name="email"
                  value={registro.email}
                  onChange={handleChange}
                  minLength={5}
                  maxLength={30}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  name="contrasenia"
                  value={registro.contrasenia}
                  onChange={handleChange}
                  required
                  minLength={8}
                  maxLength={30}
                />
                <Form.Text className="text-muted">
                  Mínimo 8 caracteres, una mayúscula y un número
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  name="repContrasenia"
                  value={registro.repContrasenia}
                  onChange={handleChange}
                  required
                  minLength={8}
                  maxLength={30}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="check"
                  label="Acepto los términos y condiciones"
                  checked={registro.check}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <button type="submit" className="btn-agregar w-100">
                Registrarse
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormularioRegistro;
