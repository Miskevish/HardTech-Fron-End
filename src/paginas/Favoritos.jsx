import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../componentes/cards/Cards";
import "./Favoritos.css";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favs);
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 titulo-favoritos">Mis Favoritos ⭐</h2>
      {favoritos.length === 0 ? (
        <p className="text-center titulo-dos">
          Todavía no agregaste productos a favoritos.
        </p>
      ) : (
        <Row className="gx-3 gy-4">
          {favoritos.map((producto) => (
            <Col sm={12} md={6} lg={4} key={producto.id}>
              <Cards producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favoritos;
