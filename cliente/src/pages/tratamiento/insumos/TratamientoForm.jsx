import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { AutoComplete } from 'primereact/autocomplete';
import axiosInstance from '../../../API/apiConfig';


const TratamientoForm = ({
    onSave,
    onCancel,
    descripcion, setDescripcion,
    precio_costo, setPrecioCosto,
    precio_cliente, setPrecioCliente,
    categoria, setCategoria,
    idimpuesto,setIdimpuesto
    
}) => {
    
    const [categorias, setCategorias] = useState([]);
    const [filterCategoria, setFilterCategoria] = useState([]);
    const toast = useRef(null);
    useEffect(() => {
        obtenerCategorias();
    }, []);
    const GuardarTratamiento = (e) => {
        e.preventDefault();
        const profesionalData = {
            descripcion: descripcion.toUpperCase(),
            precio_costo,
            precio_cliente,
            idcategoria,
            idimpuesto
        };
        onSave(tratamientoData);
    };
    const obtenerCategorias = async () => {
        try {
            const response = await axiosInstance.get('/categoria');
            if (Array.isArray(response.data)) {
                setCategorias(response.data);
               
            } else {
                console.error('La respuesta no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching ciudades:', error);
        }
    };
    
    const handleCitySearch = (event) => {
        const query = event.query.toLowerCase();
        const filtered = categorias.filter(categoria => categoria.descripcion.toLowerCase().includes(query));
        setFilterCategoria(filtered.length ? filtered : [{ descripcion: 'NO DEFINIDO' }]);
    };

    const handleCityChange = (e) => {
        setCategoria(e.value?.descripcion !== 'NO DEFINIDO' ? e.value : { descripcion: 'NO DEFINIDO', idcategoria: 0 });
    };
    return (
        <Card title="Registrar Tratamientos" className="register-card">
            <Toast ref={toast} />
            <form onSubmit={GuardarTratamiento}>
                <div className="field grid">
                    <div className="field col-12 md:col-6">
                        <label htmlFor="descripcion">Descripcion</label>
                        <InputText autoComplete='off' id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="precio_costo">Precio de Costo</label>
                        <InputText autoComplete="off" id="precio_costo" value={precio_costo} onChange={(e) => setPrecioCosto(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="precio_cliente">Precio Paciente</label>
                        <InputText autoComplete="off" id="precio_cliente" value={precio_cliente} onChange={(e) => setPrecioCliente(e.target.value)} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="ciudad">Categoria</label>
                        <AutoComplete
                            id='categoria'
                            value={categoria}
                            suggestions={filterCategoria}
                            completeMethod={handleCitySearch}
                            field="descripcion"
                            emptyMessage="NO DEFINIDO"
                            onChange={handleCityChange}
                            forceSelection
                            required
                        />
                       
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

export default TratamientoForm;
