import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Paciente from './pacientes/Paciente';
import { Card } from 'primereact/card';
import Bienvenida from '../components/Bienvenida';
import Odontogram from './odontograma/Odontogram';
import Profesional from './profesionales/Profesional';
import ListaCitas from './citas/ListaCitas';
import Categoria from './tratamiento/categoria/Categoria';
import Tratamiento from './tratamiento/insumos/Tratamiento';

const Dashboard = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40],
            }
        ]
    };

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12 p-md-2">
                <Sidebar />
            </div>
            <div className="p-col-12 p-md-10">
                <div className="dashboard-content">
                <Routes>
                    <Route path="paciente" element={<Paciente />} />
                    <Route path="inicio" element={<Bienvenida/>}/>
                    <Route path="odontograma" element={<Odontogram/>}/>
                    <Route path="profesional" element={<Profesional/>}/>
                    <Route path="cita" element={<ListaCitas/>}/>
                    <Route path="categoria" element={<Categoria/>}/>
                    <Route path="tratamiento" element={<Tratamiento/>}/>
                    {/* Agrega más rutas internas aquí */}
                </Routes>
                </div>
           
            </div>
           
        </div>
    );
}

export default Dashboard;
