import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const PacienteList = ({ pacientes, globalFilter, setGlobalFilter, onEdit, onDelete,onficha }) => {
    const actionBodyTemplate = (rowData) => {
        console.log(rowData)
        return (
            <div className="field grid" id='accion'>
                <div className="field col-12 md:col-2">
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => onEdit(rowData)} />
                </div>
                <div className="field col-12 md:col-2">
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete(rowData)} />
                </div>
                <div className="field col-12 md:col-2">
                    <Button icon="pi pi-file" className="p-button-rounded p-button-danger" onClick={() => onficha(rowData)} />
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
                value={pacientes}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
                globalFilter={globalFilter}
                responsiveLayout="scroll"
                emptyMessage="No se encontraron pacientes"
                rowClassName="custom-row"
            >
                <Column field="nombre" header="Nombre" />
                <Column field="apellido" header="Apellido" />
                <Column field="cedula" header="Cédula" />
                <Column field="fecha_nacimiento" header="Fecha de Nacimiento" />
                <Column field="genero" header="Género" />
                <Column field="telefono" header="Teléfono" />
                <Column field="email" header="Email" />
                <Column field="descripcion" header="Ciudad" />
                <Column field="observacion" header="Observacion" />
                <Column body={actionBodyTemplate} header="Acciones" />
            </DataTable>
        </div>
    );
};

export default PacienteList;
