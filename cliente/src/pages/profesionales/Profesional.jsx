import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../API/apiConfig';
import { Toast } from 'primereact/toast';
import ProfesionalForm from './ProfesionalForm';
import ProfesionalList from './ProfesionalList';
import { TabView, TabPanel } from 'primereact/tabview';

const Profesional = () => {
    const [profesionales, setProfesionales] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [editingProfesional, setEditingProfesional] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        const obtenerProfesionales = async () => {
            try {
                const response = await axiosInstance.get('profesional'); // Ajusta la URL según tu API
                setProfesionales(response.data);
            } catch (error) {
                console.error('Error fetching profesionales:', error);
            }
        };

        if (activeIndex === 1) {
            obtenerProfesionales();
        }
    }, [activeIndex]);

    const handleSaveProfesional = async (profesionalData) => {
        if (editingProfesional) {
            await actualizarProfesional(editingProfesional.idprofesional, profesionalData);
        } else {
            await crearProfesional(profesionalData);
        }
        limpiar(); // Limpiar los campos después de guardar
    };

    const actualizarProfesional = async (idprofesional, profesionalData) => {
        try {
            const response = await axiosInstance.put(`profesional/${idprofesional}`, profesionalData); // Ajusta la URL según tu API
            setProfesionales(prev => prev.map(p => p.idprofesional === idprofesional ? response.data : p));
            setEditingProfesional(null);
            setActiveIndex(1);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Profesional actualizado correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al actualizar el profesional:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el profesional', life: 3000 });
        }
    };

    const crearProfesional = async (profesionalData) => {
        try {
            const response = await axiosInstance.post('profesional', profesionalData); // Ajusta la URL según tu API
            setProfesionales(prev => [...prev, response.data]);
            setActiveIndex(1); // Cambia a la lista después de guardar
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Profesional guardado correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al guardar el profesional:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar el profesional', life: 3000 });
        }
    };

    const handleEditProfesional = (profesional) => {
        setEditingProfesional(profesional);
        setNombre(profesional.nombre || '');
        setApellido(profesional.apellido || '');
        setTelefono(profesional.telefono || '');
        setEspecialidad(profesional.especialidad || '');
        setActiveIndex(0); // Cambia a la pestaña de formulario
    };

    const handleDeleteProfesional = async (profesional) => {
        try {
            await axiosInstance.delete(`profesional/${profesional.idprofesional}`); // Ajusta la URL según tu API
            setProfesionales(prev => prev.filter(p => p.idprofesional !== profesional.idprofesional));
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Profesional eliminado correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al eliminar el profesional:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el profesional', life: 3000 });
        }
    };

    const limpiar = () => {
        setEditingProfesional(null);
        setNombre('');
        setApellido('');
        setTelefono('');
        setEspecialidad('');
        console.log("Limpieza completa");
    };

    return (
        <div className="register-container">
            <Toast ref={toast} />
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Registro de Profesionales">
                    <ProfesionalForm
                        onSave={handleSaveProfesional}
                        onCancel={limpiar}
                        nombre={nombre}
                        setNombre={setNombre}
                        apellido={apellido}
                        setApellido={setApellido}
                        telefono={telefono}
                        setTelefono={setTelefono}
                        especialidad={especialidad}
                        setEspecialidad={setEspecialidad}
                    />
                </TabPanel>
                <TabPanel header="Lista de Profesionales">
                    <ProfesionalList
                        profesionales={profesionales}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        onEdit={handleEditProfesional}
                        onDelete={handleDeleteProfesional}
                    />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Profesional;
