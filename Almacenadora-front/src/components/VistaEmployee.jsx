import { useNavigate } from "react-router-dom";
import registroImg from './img/registro.png';
import historialImg from './img/historial.png';
import stockImg from './img/stock.png';
import filtrosImg from './img/filtros.png';
import "./vistaDashboard.css";

export const VistaEmployee = () => {
  const navigate = useNavigate();

  const secciones = [
    { titulo: "Registro de productos", imagen: registroImg, ruta: "/registro" },
    { titulo: "Historial personal", imagen: historialImg, ruta: "/historial" },
    { titulo: "Stock bajos", imagen: stockImg, ruta: "/stock" },
    { titulo: "Filtros de búsqueda", imagen: filtrosImg, ruta: "/filtros" },
  ];

  return (
    <div className="vista-admin">
      <h1>Panel de Empleado</h1>
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

export default VistaEmployee;
