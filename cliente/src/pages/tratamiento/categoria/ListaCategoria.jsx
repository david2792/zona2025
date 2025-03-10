import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ListaCategoria = ({ categoria, onEdit }) => {
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="field grid" id='accion'>
                <div className="field col-12 md:col-6">
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => onEdit(rowData)} />
                </div>
            </div>
        );
    };

    return (
        <div>
          
            <DataTable
                value={categoria}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
                responsiveLayout="scroll"
                emptyMessage="No se encontraron Categorias"
                rowClassName="custom-row"
            >
                <Column field="idcategoria" header="Codigo" />
                <Column field="descripcion" header="Descripcion" />
                <Column body={actionBodyTemplate} header="Acciones" />
            </DataTable>
        </div>
    );
};

export default ListaCategoria;
