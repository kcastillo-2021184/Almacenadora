import { useNavigate } from "react-router-dom";
import inventarioImg from './img/inventario.png';
import movimientosImg from './img/movimientos.png';
import alertasImg from './img/alertas.png';
import estadisticasImg from './img/estadisticas.png';
import gestionImg from './img/gestion.png';
import "./vistaDashboard.css";

export const VistaAdmin = () => {
  const navigate = useNavigate();

  const secciones = [
    { titulo: "Resumen de Inventario", imagen: inventarioImg, ruta: "/resumen-inventario" },
    { titulo: "Movimientos Recientes", imagen: movimientosImg, ruta: "/movimientos-recientes" },
    { titulo: "Alertas y Notificaciones", imagen: alertasImg, ruta: "/alertas" },
    { titulo: "Gestión General", imagen: gestionImg, ruta: "/gestion" },
    { titulo: "Estadísticas", imagen: estadisticasImg, ruta: "/estadisticas" },
  ];

  return (
    <div className="vista-admin">
      <h1>Panel de Administrador</h1>
      <div className="vista-grid">
        {secciones.map((sec, idx) => (
          <div key={idx} className="vista-card" onClick={() => navigate(sec.ruta)}>
            <img src={sec.imagen} alt={sec.titulo} />
            <div className="titulo">{sec.titulo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VistaAdmin;
