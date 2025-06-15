import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import "./FormAdmin.css";

const FormAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [producto, setProducto] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
  });

  useEffect(() => {
    if (id) {
      const productos = JSON.parse(localStorage.getItem("productos")) || [];
      const prodEncontrado = productos.find((p) => p.id === parseInt(id));
      if (prodEncontrado) {
        setProducto(prodEncontrado);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (id) {
      const index = productos.findIndex((p) => p.id === parseInt(id));
      productos[index] = { ...producto };
      Swal.fire("Éxito", "Producto editado correctamente", "success");
    } else {
      const nuevoProducto = {
        ...producto,
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        status: "enable",
      };
      productos.push(nuevoProducto);
      Swal.fire("Éxito", "Producto creado correctamente", "success");
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    navigate("/admin/productos");
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Form className="form-personalizado w-100" onSubmit={handleSubmit}>
        <h2 className="form-titulo">
          {id ? "Editar producto" : "Agregar producto"}
        </h2>

        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            value={producto.titulo}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={100}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            rows={3}
            required
            minLength={5}
            maxLength={200}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={15}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={500}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={100}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn-agregar mt-3">
            {id ? "Guardar cambios" : "Agregar producto"}
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default FormAdmin;
