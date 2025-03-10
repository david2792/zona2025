import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../../API/apiConfig';
import { Toast } from 'primereact/toast';

import { TabView, TabPanel } from 'primereact/tabview';

import TratamientoForm from './TratamientoForm';

const Tratamiento = () => {
    const [tratamientos, setTratamientos] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [editarTratamiento, setEditarTratamiento] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [precio_costo, setPrecioCosto] = useState('');
    const [precio_cliente, setPrecioCliente] = useState('');
    const [categoria, setCategoria] = useState({ descripcion: '', idcategoria: 0 });
    const toast = useRef(null);

    useEffect(() => {
        const obtenerTratamiento = async () => {
            try {
                const response = await axiosInstance.get('/tratamiento');
                setPacientes(response.data);
            } catch (error) {
                console.error('Error fetching tratamiento:', error);
            }
        };

        if (activeIndex === 1) {
            obtenerTratamiento();
        }
    }, [activeIndex]);

    const handleSaveTratamiento = async (tratamientoData) => {
        if (editarTratamiento) {
            await actualizarTratamiento(editarTratamiento.idtratamientos, tratamientoData);
        } else {
            await crearTratamientor(tratamientoData);

        }
        limpiar(); // Limpiar los campos después de guardar
    };

    const actualizarTratamiento = async (idtratamientos, tratamientoData) => {
        try {
            const response = await axiosInstance.put(`/tratamiento/${idtratamientos}`, tratamientoData);
            setTratamientos(prev => prev.map(p => p.idtratamientos === idtratamientos ? response.data : p));
            setEditarTratamiento(null);
            setActiveIndex(1);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Tratamiento actualizado correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al actualizar el tratamiento:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el tratamiento', life: 3000 });
        }
    };

    const crearTratamientor = async (tratamientoData) => {
        try {
            const response = await axiosInstance.post('/tratamiento', tratamientoData);
            setTratamientos(prev => [...prev, response.data]);
            setActiveIndex(0);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Tratamiento guardado correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al guardar el trataniento:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar el Tratamiento', life: 3000 });
        }
    };

    const handleEditTratamiento = (tratamiento) => {
        setEditarTratamiento(tratamiento);
        setDescripcion(tratamiento.descripcion || '');
        setPrecioCosto(tratamiento.precio_costo || '');
        setPrecioCliente(tratamiento.precio_cliente || '' );
        setCategoria({ descripcion: tratamiento.descripcion || '', idcategoria: tratamiento.idcategoria || 0 });
        setActiveIndex(0);
    };

    const limpiar = () => {
      setEditarTratamiento(null);
      setDescripcion('');
      setPrecioCosto('');
      setPrecioCliente('');
      setCategoria({ descripcion: '', idcategoria: 0 });
    };
    return (
        <div className="register-container">
            <Toast ref={toast} />
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Registro de Pacientes">
                    <TratamientoForm
                        onSave={handleSaveTratamiento}
                        onCancel={limpiar}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                        precio_costo={precio_costo}
                        setPrecioCosto={setPrecioCosto}
                        precio_cliente={precio_cliente}
                        setPrecioCliente={setPrecioCliente}
                        categoria={categoria}
                        setCategoria={setCategoria}
                    />
                </TabPanel>
                <TabPanel header="Lista de Tratamientos">
                  
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Tratamiento;
