import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./FormC.css";

const FormC = ({ idPage }) => {
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});

  const [registro, setRegistro] = useState({
    usuario: "",
    email: "",
    contrasenia: "",
    repContrasenia: "",
    check: false,
  });
  const [inicioSesion, setInicioSesion] = useState({
    usuario: "",
    contrasenia: "",
  });

  const handleChangeFormRegister = (ev) => {
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setRegistro({ ...registro, [ev.target.name]: value });
  };

  const registroUsuario = (ev) => {
    ev.preventDefault();
    const { usuario, email, contrasenia, repContrasenia, check } = registro;
    let nuevoError = {};

    if (!usuario.trim()) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Tenés que ingresar un nombre de usuario",
      });
      return;
    }

    const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuariosLs.find(
      (user) => user.nombreUsuario === usuario || user.emailUsuario === email
    );

    if (usuarioExistente) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "El nombre de usuario o correo ya están en uso.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Tenés que ingresar un correo",
      });
      return;
    } else if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "El formato de correo no es válido",
      });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!contrasenia.trim()) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Tenés que ingresar una contraseña",
      });
      return;
    } else if (!passwordRegex.test(contrasenia)) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "La contraseña debe tener al menos 8 carácteres, una mayúscula y un número",
      });
      return;
    }

    if (!check) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Tenés que aceptar los términos y condiciones",
      });
      return;
    }

    if (usuario && email && contrasenia && repContrasenia && check) {
      if (contrasenia === repContrasenia) {
        const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];

        const nuevoUsuario = {
          id: usuariosLs[usuariosLs.length - 1]?.id + 1 || 1,
          nombreUsuario: usuario,
          emailUsuario: email,
          contrasenia,
          tyc: check,
          rol: "administrador",
          login: false,
          status: "enable",
        };

        usuariosLs.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosLs));

        Swal.fire({
          title: "Registro exitoso!",
          icon: "success",
        });

        setRegistro({
          usuario: "",
          email: "",
          contrasenia: "",
          repContrasenia: "",
          check: false,
        });

        setTimeout(() => {
          navigate("/IniciarSesion");
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Las contraseñas no son iguales!",
        });
      }
    }
    setErrores(nuevoError);
  };

  const handleChangeFormLogin = (ev) => {
    setInicioSesion({ ...inicioSesion, [ev.target.name]: ev.target.value });
  };

  const iniciarSesionUsuario = (ev) => {
    ev.preventDefault();
    const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];
    const { usuario, contrasenia } = inicioSesion;

    const usuarioExiste = usuariosLs.find(
      (user) => user.nombreUsuario === usuario
    );

    if (!usuario || !contrasenia) {
      return Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Los campos usuario y contraseña no pueden estar vacíos.",
      });
    }

    if (!usuarioExiste) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "El usuario y/o contraseña son incorrectos.",
      });
    }

    if (usuarioExiste.contrasenia === contrasenia) {
      usuarioExiste.login = true;
      localStorage.setItem("usuarios", JSON.stringify(usuariosLs));
      sessionStorage.setItem("usuarioLogeado", JSON.stringify(usuarioExiste));

      if (usuarioExiste.rol === "usuario") {
        navigate("/user");
      } else {
        navigate("/admin");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "El usuario y/o contraseña son incorrectos.",
      });
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center my-5">
      <Row className="w-100 d-flex justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form className="w-100 text-center letras-config">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={
                  idPage === "Registrarse"
                    ? registro.usuario
                    : inicioSesion.usuario
                }
                onChange={
                  idPage === "Registrarse"
                    ? handleChangeFormRegister
                    : handleChangeFormLogin
                }
                name="usuario"
                className={
                  errores.usuario ? "form-control is-invalid" : "form-control"
                }
              />
              {errores.usuario && (
                <Form.Text className="text-danger">
                  Campo USUARIO vacio
                </Form.Text>
              )}
            </Form.Group>

            {idPage === "Registrarse" && (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email del Usuario</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="usuario@gmail.com"
                  value={registro.email}
                  onChange={handleChangeFormRegister}
                />
                <Form.Text className="text-muted">
                  Nunca compartiremos tu e-mail con nadie
                </Form.Text>
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                name="contrasenia"
                value={
                  idPage === "Registrarse"
                    ? registro.contrasenia
                    : inicioSesion.contrasenia
                }
                onChange={
                  idPage === "Registrarse"
                    ? handleChangeFormRegister
                    : handleChangeFormLogin
                }
              />
            </Form.Group>

            {idPage === "Registrarse" && (
              <>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Repetir Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    name="repContrasenia"
                    value={registro.repContrasenia}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Aceptar terminos y condiciones"
                    name="check"
                    value={registro.check}
                    onChange={handleChangeFormRegister}
                  />
                </Form.Group>
              </>
            )}
            <Button
              className="botones boton-config"
              variant="botones boton-config"
              type="submit"
              onClick={
                idPage === "Registrarse"
                  ? registroUsuario
                  : iniciarSesionUsuario
              }
            >
              {idPage === "Registrarse" ? "Registrarse" : "Iniciar Sesión"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormC;
