import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import VistaAdmin from './components/VistaAdmin';
import VistaEmployee from './components/VistaEmployee';

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<VistaAdmin />} />
      <Route path="/employee" element={<VistaEmployee />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
