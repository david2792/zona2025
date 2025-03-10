import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import CategoriaForm from './CategoriaForm';
import ListaCategoria from './ListaCategoria';
import axiosInstance from '../../../API/apiConfig';

const Categoria=()=> {
    const [categoria, setCategoria] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [editarCategoria, setEdidarCategoria] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axiosInstance.get('categoria'); // Ajusta la URL según tu API
                setCategoria(response.data);
            } catch (error) {
                console.error('Error fetching categoria:', error);
            }
        };

        if (activeIndex === 1) {
            obtenerCategorias();
           
        }
    }, [activeIndex]);
    const GuardarCategoria = async (categoriaData) => {
        console.log(categoriaData)
        if (editarCategoria) {
        
            await actualizarCategoria(editarCategoria.idcategoria, categoriaData);
        } else {
            await crearCategoria(categoriaData);
        }
        limpiar(); // Limpiar los campos después de guardar
    };
    const actualizarCategoria = async (idcategoria, categorialData) => {
        try {
            const response = await axiosInstance.put(`categoria/${idcategoria}`, categorialData); // Ajusta la URL según tu API
            setCategoria(prev => prev.map(p => p.idcategoria === idcategoria ? response.data : p));
            setEdidarCategoria(null);
            setActiveIndex(1);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoria actualizada correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al actualizar el categoria:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la categoria', life: 3000 });
        }
    };

    const crearCategoria = async (categoriaData) => {
        try {
            const response = await axiosInstance.post('/categoria', categoriaData); // Ajusta la URL según tu API
            setCategoria(prev => [...prev, response.data]);
            setActiveIndex(1); // Cambia a la lista después de guardar
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoria guardada correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al guardar el categoria:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar el categoria', life: 3000 });
        }
    };
    const botonEditarCategoria = (categoria) => {
        setEdidarCategoria(categoria);
        setDescripcion(categoria.descripcion || '');
        setActiveIndex(0); // Cambia a la pestaña de formulario
    };

    const limpiar = () => {
        setEdidarCategoria(null);
        setDescripcion('');
        console.log("Limpieza completa");
    };
  return (
    <div className="register-container">
        <Toast ref={toast} />
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
             <TabPanel header="Registro de Categorias">
             <CategoriaForm
                        onSave={GuardarCategoria}
                        onCancel={limpiar}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                    />
             </TabPanel>
             <TabPanel header="Lista de Categorias">
                    <ListaCategoria
                        categoria={categoria}
                        onEdit={botonEditarCategoria}
                       
                    />
                </TabPanel>
        </TabView>
    </div>
  )
}
export default Categoria