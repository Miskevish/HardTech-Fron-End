
import { useNavigate } from "react-router";

const PrivateRouteC = ({children, rol}) => {

  const navigate = useNavigate();
  const usuarioLog = JSON.parse(sessionStorage.getItem("usuarioLogeado")) || null
  const rutasAdminProtegidas = ["/admin", "/admin/producto", "/admin/usuarios"]

  if (!usuarioLog) {
    setTimeout(() => {
      navigate("/")
    }, 100);

  } else if (rol === usuarioLog.rol) {
    return children

  } else if (usuarioLog.rol === "usuario" && rutasAdminProtegidas.includes(location.pathname)) {
    setTimeout(() => {
      navigate("/user")
    }, 100);
  } else {
    return children
  }
  
}

export default PrivateRouteC
