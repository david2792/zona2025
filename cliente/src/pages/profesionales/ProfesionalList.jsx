import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const ProfesionalList = ({ profesionales, globalFilter, setGlobalFilter, onEdit, onDelete }) => {
    const actionBodyTemplate = (rowData) => {
        console.log(rowData);
        return (
            <div className="field grid" id='accion'>
                <div className="field col-12 md:col-6">
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => onEdit(rowData)} />
                </div>
                <div className="field col-12 md:col-6">
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete(rowData)} />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="p-inputgroup" style={{ marginBottom: '10px' }}>
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search"></i>
                </span>
                <InputText placeholder="Buscar" onInput={(e) => setGlobalFilter(e.target.value)} />
            </div>
            <DataTable
                value={profesionales}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
                globalFilter={globalFilter}
                responsiveLayout="scroll"
                emptyMessage="No se encontraron profesionales"
                rowClassName="custom-row"
            >
                <Column field="nombre" header="Nombre" />
                <Column field="apellido" header="Apellido" />
                <Column field="telefono" header="Teléfono" />
                <Column field="especialidad" header="Especialidad" />
                <Column body={actionBodyTemplate} header="Acciones" />
            </DataTable>
        </div>
    );
};

export default ProfesionalList;
