import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import PaginaPrincipal from "./paginas/PaginaPrincipal";
import DetalleProducto from "./paginas/DetalleProducto";
import NavbarC from "./componentes/navbar/NavbarC";
import SobreNosotros from "./paginas/SobreNosotros";
import Carrito from "./paginas/Carrito";
import Footer from "./componentes/footer/Footer";
import Registrarse from "./paginas/Registrarse";
import IniciarSesion from "./paginas/IniciarSesion";
import Pagina404 from "./paginas/Pagina404";
import AdminProductos from "./paginas/AdminProductos";
import FormAdmin from "./paginas/FormAdmin";
import Favoritos from "./paginas/Favoritos";
import PrivateRouteC from "./componentes/privateroute/PrivateRouteC";
import "./App.css";
import "./index.css";
import AdminUsuarios from "./paginas/AdminUsuarios";
import FormUsuario from "./paginas/FormUsuario";

const useDynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "HardTech";

    if (path.includes("/admin/productos")) {
      title = "Administrar Productos";
    } else if (path.includes("/admin")) {
      title = "Panel Admin";
    } else if (path.includes("/user/Carrito")) {
      title = "Carrito";
    } else if (path.includes("/user/Favoritos")) {
      title = "Favoritos";
    } else if (path.includes("/SobreNosotros")) {
      title = "Sobre Nosotros";
    } else if (path.includes("/Registrarse")) {
      title = "Registrarse";
    } else if (path.includes("/IniciarSesion")) {
      title = "Iniciar Sesión";
    } else if (path.includes("/producto/")) {
      title = "Detalle del Producto";
    } else if (path === "/") {
      title = "HardTech";
    }

    document.title = title;
  }, [location]);
};

function AppContent() {
  useDynamicTitle();

  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/user" element={<PaginaPrincipal />} />
        <Route
          path="/user/Favoritos"
          element={
            <PrivateRouteC rol="user">
              <Favoritos />
            </PrivateRouteC>
          }
        />
        <Route path="/admin" element={<PaginaPrincipal />} />
        <Route
          path="/user/Carrito"
          element={
            <PrivateRouteC rol="user">
              <Carrito />
            </PrivateRouteC>
          }
        />
        <Route path="/SobreNosotros" element={<SobreNosotros />} />
        <Route path="/Registrarse" element={<Registrarse />} />
        <Route path="/IniciarSesion" element={<IniciarSesion />} />
        <Route
          path="/admin/usuarios/"
          element={
            <PrivateRouteC rol="admin">
              <AdminUsuarios />
            </PrivateRouteC>
          }
        />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/user/producto/:id" element={<DetalleProducto />} />
        <Route path="/admin/producto/:id" element={<DetalleProducto />} />
        <Route
          path="/admin/productos"
          element={
            <PrivateRouteC rol="admin">
              <AdminProductos />
            </PrivateRouteC>
          }
        />
        <Route
          path="/admin/usuarios/formulario"
          element={
            <PrivateRouteC rol="admin">
              <FormUsuario />
            </PrivateRouteC>
          }
        />
        <Route
          path="/admin/usuarios/formulario/:id"
          element={
            <PrivateRouteC rol="admin">
              <FormUsuario />
            </PrivateRouteC>
          }
        />
        <Route
          path="/admin/productos/formulario"
          element={
            <PrivateRouteC rol="admin">
              <FormAdmin />
            </PrivateRouteC>
          }
        />
        <Route
          path="/admin/productos/formulario/:id"
          element={
            <PrivateRouteC rol="admin">
              <FormAdmin />
            </PrivateRouteC>
          }
        />
        <Route
          path="/admin/editar/:id"
          element={
            <PrivateRouteC rol="admin">
              <FormAdmin />
            </PrivateRouteC>
          }
        />
        <Route path="*" element={<Pagina404 />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
