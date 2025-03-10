import React from 'react';
import { Card } from 'primereact/card';
import "../assets/styles/Inicio.css";
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
export default function Bienvenida() {
  
  return (
    <div className='contenedor'>
      <div className='grid'>
        <div className="sm:col-12 md:col-4 col-12">
          <Link to="/paciente" style={{ textDecoration: 'none' }}>
          <Card className="card-custom blue">
            <i className="pi pi-user" style={{ fontSize: '2.5rem' }}></i>
            <p className="card-title">Registros de Pacientes</p>
          </Card>
          </Link>
         
         
        </div>
        <div className="sm:col-12 md:col-4 col-12">
        <Link to="/cita" style={{ textDecoration: 'none' }}>
          <Card className="card-custom yellow">
            <i className="pi pi-book" style={{ fontSize: '2.5rem' }}></i>
            <p className="card-title">Agenda</p>
            {/* <p className="card-value">532</p> */}
          </Card>
          </Link>
        </div>
       
        <div className="sm:col-12 md:col-4 col-12">
        <Link to="/odontograma" style={{ textDecoration: 'none' }}>
          <Card className="card-custom green">
            <i className="pi pi-sitemap" style={{ fontSize: '2.5rem' }}></i>
            <p className="card-title" >Odontograma</p>
          </Card>
        </Link>
        </div>
      </div>
    </div>
  );
}
