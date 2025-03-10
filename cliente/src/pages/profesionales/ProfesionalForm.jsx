import React, { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


const ProfesionalForm = ({
    onSave,
    onCancel,
    nombre, setNombre,
    apellido, setApellido,
    telefono, setTelefono,
    especialidad, setEspecialidad,
    
}) => {
    const toast = useRef(null);

    const especialidades = [
        { label: 'Odontología General', value: 'Odontología General' },
        { label: 'Ortodoncia', value: 'Ortodoncia' },
        { label: 'Periodoncia', value: 'Periodoncia' },
        { label: 'Endodoncia', value: 'Endodoncia' },
        // Añade más especialidades según sea necesario
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const profesionalData = {
            nombre: nombre.toUpperCase(),
            apellido: apellido.toUpperCase(),
            telefono,
            especialidad
        };
        onSave(profesionalData);
    };

    return (
        <Card title="Registrar Profesional" className="register-card">
            <Toast ref={toast} />
            <form onSubmit={handleSubmit}>
                <div className="field grid">
                    <div className="field col-12 md:col-6">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText autoComplete='off' id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="apellido">Apellido</label>
                        <InputText autoComplete="off" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="telefono">Teléfono</label>
                        <InputText autoComplete="off" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="especialidad">Especialidad</label>
                        <Dropdown id="especialidad" value={especialidad} options={especialidades} onChange={(e) => setEspecialidad(e.value)} placeholder="Seleccione una especialidad" required />
                    </div>
                </div>
                <div className='field grid'>
                    <div className="field col-2 md:col-6">
                        <Button label="Guardar" icon="pi pi-save" type="submit" className="p-button-success" />
                    </div>
                    <div className="field col-2 md:col-6">
                        <Button label="Cancelar" icon="pi pi-exclamation-circle" type="button" className="p-button-warning" onClick={onCancel} />
                    </div>
                </div>
            </form>
        </Card>
    );
};

export default ProfesionalForm;
