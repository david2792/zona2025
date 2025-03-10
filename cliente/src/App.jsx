import { useState } from 'react'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import PrivateRoute from './router/PrivateRoute';
import Paciente from './pages/pacientes/Paciente';
import Bienvenida from './components/Bienvenida';

import Odontogram from './pages/odontograma/Odontogram';
import Profesional from './pages/profesionales/Profesional';
import ListaCitas from './pages/citas/ListaCitas';
import Categoria from './pages/tratamiento/categoria/Categoria'
import Tratamiento from './pages/tratamiento/insumos/Tratamiento';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
              
                {/* Rutas protegidas dentro del Dashboard */}
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="paciente" element={<Paciente/>} />
                    <Route path="inicio" element={<Bienvenida/>}/>
                    <Route path="odontograma" element={<Odontogram />} />
                    <Route path="profesional" element={<Profesional />} />
                    <Route path="cita" element={< ListaCitas/>} />
                    <Route path="categoria" element={< Categoria/>} />
                    <Route path="tratamiento" element={< Tratamiento/>} />
                    
                    {/* Agrega más rutas internas aquí */}
                </Route>
              
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    </div>
</Router>
  )
}

export default App
