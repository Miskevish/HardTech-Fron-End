import { Container, Row, Col, Image } from "react-bootstrap";
import "./SobreNosotros.css";
import franciscoImg from "../assets/francisco.png";
import tobiasImg from "../assets/tobias.png";
import anaImg from "../assets/ana.png";
import nicoImg from "../assets/nico.png";

const SobreNosotros = () => {
  const integrantesCol1 = [
    { nombre: "Nicolas", img: nicoImg },
    { nombre: "Tobias", img: tobiasImg },
  ];

  const integrantesCol2 = [
    { nombre: "Ana Paula", img: anaImg },
    { nombre: "Francisco", img: franciscoImg },
  ];

  return (
    <div className="sobre-nosotros-page">
      <Container className="sobre-nosotros my-5">
        <Row>
          <Col>
            <h2>Sobre Nosotros</h2>
            <p className="texto-nosotros">
              Somos un equipo apasionado por la tecnología, el gaming y el
              hardware. Trabajamos día a día para ofrecerte la mejor experiencia
              y los mejores productos del mercado.
            </p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6} className="integrantes-columna">
            {integrantesCol1.map((integrante, index) => (
              <div key={index} className="integrante">
                <Image src={integrante.img} roundedCircle className="avatar" />
                <p>{integrante.nombre}</p>
              </div>
            ))}
          </Col>

          <Col md={6} className="integrantes-columna">
            {integrantesCol2.map((integrante, index) => (
              <div key={index} className="integrante">
                <Image src={integrante.img} roundedCircle className="avatar" />
                <p>{integrante.nombre}</p>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SobreNosotros;
