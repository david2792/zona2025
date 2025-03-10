import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Toast } from 'primereact/toast';
import { format } from 'date-fns';
import axiosInstance from '../../API/apiConfig';
import CiudadForm from './CiudadForm';

const PacienteForm = ({
    onSave,
    onCancel,
    nombre, setNombre,
    apellido, setApellido,
    fecha_nacimiento, setFechaNacimiento,
    genero, setGenero,
    telefono, setTelefono,
    email, setEmail,
    ciudad, setCiudad,
    cedula, setCedula,
    observacion, setObservacion
}) => {
    const [ciudades, setCiudades] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [filteredCiudades, setFilteredCiudades] = useState([]);
    const toast = useRef(null);

    const generos = [
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Femenino', value: 'Femenino' },
        { label: 'Otro', value: 'Otro' }
    ];

    const obtenerCiudades = async () => {
        try {
            const response = await axiosInstance.get('/ciudad');
            if (Array.isArray(response.data)) {
                setCiudades(response.data);
            } else {
                console.error('La respuesta no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching ciudades:', error);
        }
    };

    useEffect(() => {
        obtenerCiudades();
    }, []);

    const handleCitySearch = (event) => {
        const query = event.query.toLowerCase();
        const filtered = ciudades.filter(ciudad => ciudad.descripcion.toLowerCase().includes(query));
        setFilteredCiudades(filtered.length ? filtered : [{ descripcion: 'NO DEFINIDO' }]);
    };

    const handleCityChange = (e) => {
        setCiudad(e.value?.descripcion !== 'NO DEFINIDO' ? e.value : { descripcion: 'NO DEFINIDO', idciudad: 0 });
    };

    const handleCitySave = async (newCity) => {
        try {
            const response = await axiosInstance.post('/ciudad', newCity);
            setCiudades([...ciudades, response.data]);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Ciudad creada correctamente', life: 3000 });
            obtenerCiudades(); // Llamar a obtenerCiudades para actualizar la lista
        } catch (error) {
            console.error('Error saving ciudad:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear la ciudad', life: 3000 });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedFechaNacimiento = fecha_nacimiento ? format(fecha_nacimiento, 'yyyy-MM-dd') : null;
        const pacienteData = {
            nombre: nombre.toUpperCase(),
            apellido: apellido.toUpperCase(),
            fecha_nacimiento: formattedFechaNacimiento,
            genero,
            telefono,
            email,
            idciudad: ciudad.idciudad,
            cedula,
            observacion: observacion.toUpperCase()
        };
        onSave(pacienteData);
    };

    return (
        <Card title="Registrar Paciente" className="register-card">
            <Toast ref={toast} />
            <form onSubmit={handleSubmit}>
                <div className="field grid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText autoComplete='off' id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="apellido">Apellido</label>
                        <InputText autoComplete="off" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="cedula">Cédula</label>
                        <InputText autoComplete="off" id="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                        <Calendar id="fechaNacimiento" value={fecha_nacimiento} onChange={(e) => setFechaNacimiento(e.value)} dateFormat="yy/mm/dd" />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="genero">Género</label>
                        <Dropdown id="genero" value={genero} options={generos} onChange={(e) => setGenero(e.value)} placeholder="Seleccione un género" required />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="telefono">Teléfono</label>
                        <InputText autoComplete="off" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="email">Email</label>
                        <InputText autoComplete="off" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="ciudad">Ciudad</label>
                        <AutoComplete
                            id='ciudad'
                            value={ciudad}
                            suggestions={filteredCiudades}
                            completeMethod={handleCitySearch}
                            field="descripcion"
                            emptyMessage="NO DEFINIDO"
                            onChange={handleCityChange}
                            forceSelection
                            required
                        />
                       
                    </div>
                    <div className="field col-12 md:col-4">
                    <label htmlFor="ciudad">Agregar una nueva ciudad</label>
                          <Button label="Nueva Ciudad" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />
                    </div>
                    <div className="field col-12 md:col-12">
                        <label htmlFor="observacion">Observacion</label>
                        <InputText autoComplete="off" id="observacion" value={observacion} onChange={(e) => setObservacion(e.target.value)} />
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
            <CiudadForm visible={dialogVisible} onHide={() => setDialogVisible(false)} onSave={handleCitySave} />
        </Card>
    );
};

export default PacienteForm;
