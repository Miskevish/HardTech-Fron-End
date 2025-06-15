import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./PaginaPrincipal.css";

import Carousell from "../componentes/carousell/Carousell";
import Buscador from "../componentes/buscador/Buscador";
import Cards from "../componentes/cards/Cards";

import sillaImg from "../assets/silla.jpg";
import ramImg from "../assets/ram.jpg";
import joystickImg from "../assets/jostik.png";

const STORAGE_KEY = "productos";
const DATA_VERSION = 3; 

function getStored() {
  const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!raw) return null;
  return Array.isArray(raw)
    ? raw
    : raw.version === DATA_VERSION
    ? raw.items
    : null;
}

function save(items) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: DATA_VERSION, items })
  );
}

const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const productosLS = getStored();

    if (productosLS) {
      const habilitados = productosLS
        .map((p) => ({ ...p, status: p.status || "enable" }))
        .filter((p) => p.status === "enable");

      setProductos(habilitados);
      setFilteredProductos(habilitados);
    } else {

      const productosIniciales = [
        {
          id: 1,
          titulo: "Procesador Intel Core i9 14900K",
          descripcion: "Procesador Intel Core i9 14900K",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38615_Procesador_Intel_Core_i9_14900K_6.0GHz_Turbo_Socket_1700_Raptor_Lake_82539926-grn.jpg",
          precio: 450000,
          categoria: "procesadores",
          status: "enable",
        },
        {
          id: 2,
          titulo: 'Monitor Gamer ASUS 27"',
          descripcion: "144 Hz, 1 ms, FHD",
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_727419-MLU72965182576_112023-O.webp",
          precio: 350000,
          categoria: "monitores",
          status: "enable",
        },
        {
          id: 3,
          titulo: "Teclado Mecánico Redragon",
          descripcion: "Switch Red, RGB",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_44144_Teclado_Mecanico_Asus_ROG_Strix_XA12_Scope_II_Switch_RX_Red_RGB_1d86f117-grn.jpg",
          precio: 25000,
          categoria: "perifericos",
          status: "enable",
        },
        {
          id: 4,
          titulo: "Mouse Logitech G502",
          descripcion: "HERO 25K, 11 botones",
          imagen:
            "https://mla-s1-p.mlstatic.com/738372-MLA40024494003_122019-F.jpg",
          precio: 30000,
          categoria: "perifericos",
          status: "enable",
        },
        {
          id: 5,
          titulo: "Procesador AMD Ryzen 7 5800X",
          descripcion: "8 núcleos / 16 hilos / 4.7 GHz",
          imagen:
            "https://fullh4rd.com.ar/img/productos/1/micro-amd-ryzen-5-5500-svideo-ccooler-0.jpg",
          precio: 149999,
          categoria: "procesadores",
          status: "enable",
        },
        {
          id: 6,
          titulo: "Silla Gamer Vertagear SL5800",
          descripcion: "Ergonómica, reposabrazos 4D",
          imagen: sillaImg,
          precio: 523999,
          categoria: "sillas",
          status: "enable",
        },
        {
          id: 7,
          titulo: 'Monitor Acer Nitro 27" 180 Hz',
          descripcion: "IPS, AMD FreeSync",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_40512_Monitor_Gamer_Acer_Nitro_27__KG271_M3biip_Widescreen_IPS_1080p_180Hz_AMD_FreeSync_bb277898-grn.jpg",
          precio: 314999,
          categoria: "monitores",
          status: "enable",
        },
        {
          id: 8,
          titulo: "Gabinete ASUS ROG Hyperion",
          descripcion: "E-ATX, vidrio templado, ARGB",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39661_Gabinete_ASUS_ROG_Hyperion_GR701_E-ATX_Vidrio_Templado_4x_140mm_ARGB_Fan_USB-C_Fast_Charge_Black_070795af-grn.jpg",
          precio: 69455,
          categoria: "gabinetes",
          status: "enable",
        },
        {
          id: 9,
          titulo: "Mother MSI PRO B760M-E DDR4",
          descripcion: "LGA1700, micro-ATX",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39800_Mother_MSI_PRO_B760M-E_DDR4_S1700_f8942f85-grn.jpg",
          precio: 152999,
          categoria: "mothers",
          status: "enable",
        },
        {
          id: 10,
          titulo: "Auriculares Logitech G435 Wireless",
          descripcion: "Lightspeed + Bluetooth",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39691_Auriculares_Logitech_G435_Lightspeed_Wireless_Bluetooth_White___2351d4a8-grn.jpg",
          precio: 124379,
          categoria: "perifericos",
          status: "enable",
        },
        {
          id: 11,
          titulo: "Micrófono Asus ROG STRIX Carnyx RGB",
          descripcion: "USB-C · Aura Sync",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_41443_Microfono_Asus_ROG_STRIX_Carnyx_RGB_AuraSync_USB-C_Black_ace5d37f-grn.jpg",
          precio: 288999,
          categoria: "perifericos",
          status: "enable",
        },
        {
          id: 12,
          titulo: "Laptop HP Pavilion 15",
          descripcion: "i7 · 16 GB · 512 GB SSD · 15.6″",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_44049_Notebook_HP_Victus_15-FA0033_15.6__i5-12450H_8GB_SSD_512GB_RTX3050_FHD_144Hz_Win11_5782adea-grn.jpg",
          precio: 899999,
          categoria: "laptops",
          status: "enable",
        },
        {
          id: 13,
          titulo: "RAM Patriot DDR5 64 GB Viper RGB",
          descripcion: "2×32 GB 6000 MHz CL30",
          imagen: ramImg,
          precio: 240955,
          categoria: "memorias",
          status: "enable",
        },
        {
          id: 14,
          titulo: "Joystick ASUS ROG Raikiri Pro OLED",
          descripcion: "Wireless 2.4 GHz / BT",
          imagen: joystickImg,
          precio: 231955,
          categoria: "joystick",
          status: "enable",
        },
        {
          id: 15,
          titulo: "Placa de Video ASUS RTX 4060 OC",
          descripcion: "8 GB GDDR6 · DLSS 3",
          imagen:
            "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_42576_Placa_de_Video_ASUS_Dual_GeForce_RTX_4060_8GB_GDDR6_OC_V2_a7b6bed1-grn.jpg",
          precio: 480000,
          categoria: "placa de video",
          status: "enable",
        },
      ];

      setProductos(productosIniciales);
      setFilteredProductos(productosIniciales);
      save(productosIniciales);
    }
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    filterProducts(searchTerm, cat);
  };

  const filterProducts = (term, category) => {
    let res = productos.filter((p) =>
      p.titulo.toLowerCase().includes(term.toLowerCase())
    );
    if (category) res = res.filter((p) => p.categoria === category);
    setFilteredProductos(res);
  };

  return (
    <>
      <Carousell />
      <Buscador
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />

      <Container fluid className="home-container">
        <Row className="px-4 my-5 gx-3 gy-4">
          {filteredProductos.map((p) => (
            <Col sm="12" md="6" lg="4" key={p.id} className="my-3">
              <Cards producto={p} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
