import Carousel from "react-bootstrap/Carousel";

const Carousell = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={10000}>
          <img
            src="http://imgfz.com/i/8dvLZqX.jpeg"
            alt="Banner Promociones HardTech"
            className="w-100"
          />
        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <img
            src="http://imgfz.com/i/bMk2wc3.png"
            alt="Banner HardTech"
            className="w-100"
          />
        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <img
            src="http://imgfz.com/i/HlbYdi3.jpeg"
            alt="Banner Envios Gratis HardTech"
            className="w-100"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Carousell;
