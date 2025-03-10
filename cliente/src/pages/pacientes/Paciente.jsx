import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../API/apiConfig';
import { Toast } from 'primereact/toast';
import PacienteForm from './PacienteForm';
import PacienteList from './PacienteList';
import { TabView, TabPanel } from 'primereact/tabview';
import HistoriaMedicaForm from './HistoriaMedicaForm';

const Paciente = () => {
    const [pacientes, setPacientes] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [editingPaciente, setEditingPaciente] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState(null);
    const [genero, setGenero] = useState(null);
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [ciudad, setCiudad] = useState({ descripcion: '', idciudad: 0 });
    const [cedula, setCedula] = useState('');
    const  [observacion, setObservacion] = useState('');
    const [selectedPacienteFicha, setSelectedPacienteFicha] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const response = await axiosInstance.get('/paciente');
                setPacientes(response.data);
            } catch (error) {
                console.error('Error fetching pacientes:', error);
            }
        };

        if (activeIndex === 1) {
            obtenerPacientes();
        }
    }, [activeIndex]);

    const handleSavePaciente = async (pacienteData) => {
        if (editingPaciente) {
            await actualizarPaciente(editingPaciente.idpaciente, pacienteData);
        } else {
            await crearPaciente(pacienteData);

        }
        limpiar(); // Limpiar los campos después de guardar
    };

    const actualizarPaciente = async (idpaciente, pacienteData) => {
        try {
            const response = await axiosInstance.put(`/paciente/${idpaciente}`, pacienteData);
            setPacientes(prev => prev.map(p => p.idpaciente === idpaciente ? response.data : p));
            setEditingPaciente(null);
            setActiveIndex(1);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Paciente actualizado correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al actualizar el paciente:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el paciente', life: 3000 });
        }
    };

    const crearPaciente = async (pacienteData) => {
        try {
            const response = await axiosInstance.post('/paciente', pacienteData);
            setPacientes(prev => [...prev, response.data]);
            setActiveIndex(0);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Paciente guardado correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al guardar el paciente:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar el paciente', life: 3000 });
        }
    };

    const handleEditPaciente = (paciente) => {
        setEditingPaciente(paciente);
        setNombre(paciente.nombre || '');
        setApellido(paciente.apellido || '');
        setFechaNacimiento(paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento) : null);
        setGenero(paciente.genero || null);
        setTelefono(paciente.telefono || '');
        setEmail(paciente.email || '');
        setCiudad({ descripcion: paciente.descripcion || '', idciudad: paciente.idciudad || 0 });
        setCedula(paciente.cedula || '');
        setObservacion(paciente.observacion || '' )
        setActiveIndex(0);
    };

    const handleDeletePaciente = async (paciente) => {
        try {
            await axiosInstance.delete(`/referencial/paciente/${paciente.idpaciente}`);
            setPacientes(prev => prev.filter(p => p.idpaciente !== paciente.idpaciente));
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Paciente eliminado correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al eliminar el paciente:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el paciente', life: 3000 });
        }
    };

    const limpiar = () => {
        setEditingPaciente(null);
        setNombre('');
        setApellido('');
        setFechaNacimiento(null);
        setGenero(null);
        setTelefono('');
        setEmail('');
        setCiudad({ descripcion: '', idciudad: 0 });
        setCedula('');
        setObservacion('')
    };
    const handleSaveHistoriaMedica = (historiaMedicaData) => {
        // Aquí puedes manejar el guardado del historial médico
        console.log('Historia médica guardada:', historiaMedicaData);
    };
    const handleFichaPaciente = (paciente) => {
        setSelectedPacienteFicha(paciente);
        setActiveIndex(2); // Cambia a la pestaña del historial médico
    };
    return (
        <div className="register-container">
            <Toast ref={toast} />
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Registro de Pacientes">
                    <PacienteForm
                        onSave={handleSavePaciente}
                        onCancel={limpiar}
                        nombre={nombre}
                        setNombre={setNombre}
                        apellido={apellido}
                        setApellido={setApellido}
                        fecha_nacimiento={fecha_nacimiento}
                        setFechaNacimiento={setFechaNacimiento}
                        genero={genero}
                        setGenero={setGenero}
                        telefono={telefono}
                        setTelefono={setTelefono}
                        email={email}
                        setEmail={setEmail}
                        ciudad={ciudad}
                        setCiudad={setCiudad}
                        cedula={cedula}
                        setCedula={setCedula}
                        observacion={observacion}
                        setObservacion={setObservacion}
                    />
                </TabPanel>
                <TabPanel header="Lista de Pacientes">
                    <PacienteList
                        pacientes={pacientes}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        onEdit={handleEditPaciente}
                        onDelete={handleDeletePaciente}
                        onficha={handleFichaPaciente}  // <--- Aquí
                    />
                </TabPanel>
                <TabPanel header="Historial Médico">
                    <HistoriaMedicaForm 
                        pacienteSeleccionado={selectedPacienteFicha} 
                        onSave={handleSaveHistoriaMedica} 
                    />
                </TabPanel>

            </TabView>
        </div>
    );
};

export default Paciente;
